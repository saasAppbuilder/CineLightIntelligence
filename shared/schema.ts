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
    intensity: z.number(),
    color: z.string()
  }),
  fillLight: z.object({
    presence: z.boolean(),
    intensity: z.number()
  }),
  backgroundColor: z.string(),
  contrastRatio: z.number(),
  mood: z.string(),
  suggestions: z.array(z.string())
});

export type AnalysisResponse = z.infer<typeof analysisResponseSchema>;