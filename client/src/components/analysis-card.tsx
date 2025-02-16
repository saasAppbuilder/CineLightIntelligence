import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { type Analysis, type AnalysisResponse } from "@shared/schema";
import { Sun, Zap, PaintBucket, Scale, Thermometer, Camera, Film } from "lucide-react";

interface AnalysisCardProps {
  analysis: Analysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const {
    keyLight,
    fillLight,
    backgroundLight,
    ratios,
    colorBalance,
    mood,
    cinematicReferences,
    suggestions
  } = analysis.analysis as AnalysisResponse;

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
              Height: {keyLight.height}
              <br />
              Angle: {keyLight.angle}
              <br />
              Intensity: {keyLight.intensity} IRE
              <br />
              Quality: {keyLight.quality}
              <br />
              Color Temp: {keyLight.colorTemperature}K
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
              Position: {fillLight.position}
              <br />
              Intensity: {fillLight.intensity} IRE
              <br />
              Quality: {fillLight.quality}
              <br />
              Color Temp: {fillLight.colorTemperature}K
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PaintBucket className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Background</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Intensity: {backgroundLight.intensity} IRE
              <br />
              Color Temp: {backgroundLight.colorTemperature}K
              <br />
              Characteristics: {backgroundLight.characteristics}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Light Ratios</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Key to Fill: {ratios.keyToFill}
              <br />
              Key to Background: {ratios.keyToBackground}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Color Balance</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Overall: {colorBalance.overall}
            <br />
            {colorBalance.description}
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Cinematic References</h3>
          </div>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {cinematicReferences.map((reference: string, index: number) => (
              <li key={index}>{reference}</li>
            ))}
          </ul>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Suggestions</h3>
          </div>
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