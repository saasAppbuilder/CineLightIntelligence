import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { type Analysis, type AnalysisResponse } from "@shared/schema";
import { Sun, Zap, PaintBucket, Scale } from "lucide-react";

interface AnalysisCardProps {
  analysis: Analysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const { keyLight, fillLight, backgroundColor, contrastRatio, mood, suggestions } =
    analysis.analysis as AnalysisResponse;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Lighting Analysis
          <Badge variant="secondary">{mood}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Key Light</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Position: {keyLight.position}
              <br />
              Intensity: {keyLight.intensity}/10
              <br />
              Color: {keyLight.color}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Fill Light</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Present: {fillLight.presence ? "Yes" : "No"}
              <br />
              Intensity: {fillLight.intensity}/10
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PaintBucket className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Background</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Color: {backgroundColor}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Contrast Ratio</h3>
            </div>
            <p className="text-sm text-muted-foreground">{contrastRatio}:1</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="font-medium">Suggestions</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {suggestions.map((suggestion: string, index: number) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}