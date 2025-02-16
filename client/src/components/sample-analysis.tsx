import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ColorPalette } from "./color-palette";
import { Lightbulb, Thermometer, Scale } from "lucide-react";

export function SampleAnalysis() {
  const sampleColors = [
    "#1a1a1a",
    "#2c2c2c",
    "#3d3d3d",
    "#4f4f4f",
    "#614c3c",
    "#6b5b4c",
    "#7d6e5f",
    "#8f8272",
    "#a19485",
    "#b3a698",
    "#c5b8ab"
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Sample Lighting Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <img
            src="/sample-analysis.jpg"
            alt="Sample scene analysis"
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="space-y-2">
          <ColorPalette colors={sampleColors} className="rounded-lg overflow-hidden" />
          <p className="text-sm text-muted-foreground">
            The color palette uses muted and warm tones that create a sense of nostalgia and warmth,
            suggesting intimacy and quiet reflection. The use of light brown and beige evokes a timeless,
            serene atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Lightbulb className="h-4 w-4" />
              <h3 className="font-medium">Key Light</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              60 IRE intensity
              <br />
              Soft diffused quality
              <br />
              4500K color temperature
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Scale className="h-4 w-4" />
              <h3 className="font-medium">Ratios</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Key to Fill: 2:1
              <br />
              Key to Background: 2.4:1
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Thermometer className="h-4 w-4" />
              <h3 className="font-medium">Color Balance</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Overall: Warm
              <br />
              Natural, nostalgic tone
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
