import { analyses, type Analysis, type InsertAnalysis } from "@shared/schema";

export interface IStorage {
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysis(id: number): Promise<Analysis | undefined>;
  getRecentAnalyses(): Promise<Analysis[]>;
}

export class MemStorage implements IStorage {
  private analyses: Map<number, Analysis>;
  private currentId: number;

  constructor() {
    this.analyses = new Map();
    this.currentId = 1;
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = this.currentId++;
    const analysis: Analysis = { 
      id, 
      imageUrl: insertAnalysis.imageUrl,
      analysis: insertAnalysis.analysis,
      createdAt: insertAnalysis.createdAt,
      referenceImageUrl: insertAnalysis.referenceImageUrl ?? null
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysis(id: number): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getRecentAnalyses(): Promise<Analysis[]> {
    return Array.from(this.analyses.values())
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 10);
  }
}

export const storage = new MemStorage();