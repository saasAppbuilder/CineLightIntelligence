import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const analysisPreferencesSchema = z.object({
  focusAreas: z.array(z.enum([
    'composition',
    'technical',
    'emotional',
    'style',
    'genre'
  ])).optional(),
  genre: z.enum([
    'drama',
    'horror',
    'documentary',
    'commercial',
    'music_video'
  ]).optional(),
  style: z.enum([
    'naturalistic',
    'high_contrast',
    'soft_light',
    'dramatic'
  ]).optional()
});

export type AnalysisPreferences = z.infer<typeof analysisPreferencesSchema>;

export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  analysis: jsonb("analysis").notNull(),
  referenceImageUrl: text("reference_image_url"),
  createdAt: text("created_at").notNull(),
  preferences: jsonb("preferences")
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({
  id: true
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

export const analysisResponseSchema = z.object({
  keyLight: z.object({
    position: z.string(),
    intensity: z.number(), // IRE value 0-100
    quality: z.string(), // soft/hard description
    colorTemperature: z.number(), // Kelvin value
    height: z.string(), // vertical position
    angle: z.string() // directional information
  }),
  fillLight: z.object({
    presence: z.boolean(),
    intensity: z.number(), // IRE value 0-100
    quality: z.string(),
    colorTemperature: z.number(),
    position: z.string()
  }),
  backgroundLight: z.object({
    intensity: z.number(), // IRE value 0-100
    colorTemperature: z.number(),
    characteristics: z.string()
  }),
  ratios: z.object({
    keyToFill: z.string(), // e.g., "4:1"
    keyToBackground: z.string()
  }),
  colorBalance: z.object({
    overall: z.string(), // warm/cool/neutral/mixed
    description: z.string()
  }),
  mood: z.string(),
  cinematicReferences: z.array(z.string()),
  suggestions: z.array(z.string()),
  colorPalette: z.array(z.string()) // Array of hex colors representing the scene's color distribution
});

export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;