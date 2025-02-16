import OpenAI from "openai";
import { type AnalysisResponse, type AnalysisPreferences } from "@shared/schema";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function generateSystemPrompt(preferences?: AnalysisPreferences): string {
  let prompt = `You are an advanced cinematography AI specializing in lighting analysis for film and video. Analyze the image focusing on lighting setup, providing detailed measurements and characteristics. Also extract a color palette that represents the key colors in the scene and provide insights about their visual impact and meaning. `;

  if (preferences?.focusAreas?.includes('technical')) {
    prompt += `Focus on technical aspects like IRE values, color temperatures, and precise ratios. `;
  }
  if (preferences?.focusAreas?.includes('emotional')) {
    prompt += `Analyze the emotional impact and psychological effects of the lighting choices. `;
  }
  if (preferences?.focusAreas?.includes('style')) {
    prompt += `Compare to established cinematographic techniques and styles. `;
  }
  if (preferences?.genre) {
    prompt += `Analyze this from a ${preferences.genre.replace('_', ' ')} perspective. `;
  }
  if (preferences?.style) {
    prompt += `Consider how this matches or differs from ${preferences.style.replace('_', ' ')} lighting approaches. `;
  }

  prompt += `Provide detailed analysis in the following JSON format:
{
  "keyLight": {
    "position": "detailed position description",
    "intensity": number from 0-100 representing IRE value,
    "quality": "detailed description of softness/hardness",
    "colorTemperature": number representing Kelvin value,
    "height": "vertical position description",
    "angle": "detailed angle and direction"
  },
  "fillLight": {
    "presence": boolean,
    "intensity": number from 0-100 representing IRE value,
    "quality": "detailed description of light characteristics",
    "colorTemperature": number representing Kelvin value,
    "position": "position relative to key light"
  },
  "backgroundLight": {
    "intensity": number from 0-100 representing IRE value,
    "colorTemperature": number representing Kelvin value,
    "characteristics": "detailed description of background lighting effect"
  },
  "ratios": {
    "keyToFill": "ratio expressed as string (e.g., '4:1')",
    "keyToBackground": "ratio expressed as string"
  },
  "colorBalance": {
    "overall": "warm/cool/neutral/mixed",
    "description": "detailed color harmony analysis"
  },
  "mood": "description of emotional impact",
  "cinematicReferences": ["array of relevant film lighting style references"],
  "suggestions": ["array of technical improvement suggestions"],
  "colorPalette": ["array of 11 hex color codes representing the scene's color distribution, from darkest to lightest"],
  "colorAnalysis": "detailed analysis of the color palette's visual impact, including color relationships, symbolism, and emotional resonance"
}`;

  return prompt;
}

export async function analyzeLighting(
  base64Image: string,
  preferences?: AnalysisPreferences
): Promise<AnalysisResponse> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: generateSystemPrompt(preferences)
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this image's lighting setup with precise technical measurements and artistic interpretation. Include IRE values, color temperatures, ratios, and specific cinematic references. Ensure the response matches the exact JSON format specified."
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ],
      },
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("Failed to get analysis from OpenAI");
  }

  return JSON.parse(content);
}