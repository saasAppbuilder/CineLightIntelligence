import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { analyzeLighting } from "./openai";
import { insertAnalysisSchema, analysisResponseSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageBase64, referenceImageUrl } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ message: "Image is required" });
      }

      const analysis = await analyzeLighting(imageBase64);
      const validatedAnalysis = analysisResponseSchema.parse(analysis);

      const result = await storage.createAnalysis({
        imageUrl: `data:image/jpeg;base64,${imageBase64}`,
        analysis: validatedAnalysis,
        referenceImageUrl,
        createdAt: new Date().toISOString()
      });

      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid analysis format", errors: error.errors });
      }
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error occurred" });
    }
  });

  app.get("/api/analyses/recent", async (req, res) => {
    try {
      const analyses = await storage.getRecentAnalyses();
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error occurred" });
    }
  });

  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const analysis = await storage.getAnalysis(Number(req.params.id));
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error occurred" });
    }
  });

  return httpServer;
}