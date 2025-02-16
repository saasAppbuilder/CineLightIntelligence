import OpenAI from "openai";
import { type AnalysisResponse, type AnalysisPreferences } from "@shared/schema";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function generateSystemPrompt(preferences?: AnalysisPreferences): string {
  let prompt = `You are a professional cinematographer analyzing lighting setups. `;

  if (preferences?.focusAreas?.includes('technical')) {
    prompt += `Focus on technical aspects like light placement, equipment choices, and exposure settings. `;
  }
  if (preferences?.focusAreas?.includes('emotional')) {
    prompt += `Analyze the emotional impact of the lighting and how it supports the scene's mood. `;
  }
  if (preferences?.focusAreas?.includes('style')) {
    prompt += `Compare the lighting style to established cinematographic techniques. `;
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
    "position": "string describing the position (e.g., 'upper left', 'center right')",
    "intensity": number from 1-10,
    "color": "string describing color temperature or color"
  },
  "fillLight": {
    "presence": boolean,
    "intensity": number from 1-10
  },
  "backgroundColor": "string describing the background color or tone",
  "contrastRatio": number representing the contrast ratio,
  "mood": "string describing the overall mood",
  "suggestions": ["array of strings with improvement suggestions"]
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
            text: "Analyze this image's lighting setup focusing on: key light position and intensity, fill light presence and intensity, background lighting, contrast ratio, overall mood, and specific suggestions for improvement. Ensure the response matches the exact JSON format specified."
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