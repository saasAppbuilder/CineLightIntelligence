import OpenAI from "openai";
import { type AnalysisResponse } from "@shared/schema";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeLighting(base64Image: string): Promise<AnalysisResponse> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a professional cinematographer analyzing lighting setups. Provide detailed analysis focusing on key light, fill light, background lighting, and contrast ratios. Format response as JSON with suggestions for improvement."
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this image's lighting setup and provide details about: key light position and intensity, fill light presence and intensity, background lighting, contrast ratio, overall mood, and specific suggestions for improvement."
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