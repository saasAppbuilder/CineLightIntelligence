import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import type { AnalysisPreferences } from "@shared/schema";

interface AnalysisPreferencesProps {
  onPreferencesChange: (preferences: AnalysisPreferences) => void;
}

export function AnalysisPreferences({ onPreferencesChange }: AnalysisPreferencesProps) {
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [genre, setGenre] = useState<string>();
  const [style, setStyle] = useState<string>();

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFocusAreas(prev => {
      const newAreas = checked
        ? [...prev, area]
        : prev.filter(a => a !== area);
      
      onPreferencesChange({
        focusAreas: newAreas as AnalysisPreferences["focusAreas"],
        genre: genre as AnalysisPreferences["genre"],
        style: style as AnalysisPreferences["style"]
      });
      
      return newAreas;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Focus Areas</Label>
          <div className="grid grid-cols-2 gap-4">
            {["technical", "emotional", "style", "composition", "genre"].map((area) => (
              <div key={area} className="flex items-center space-x-2">
                <Checkbox
                  id={area}
                  checked={focusAreas.includes(area)}
                  onCheckedChange={(checked) => 
                    handleFocusAreaChange(area, checked as boolean)
                  }
                />
                <Label htmlFor={area} className="capitalize">
                  {area}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Genre Style</Label>
          <RadioGroup
            value={genre}
            onValueChange={(value) => {
              setGenre(value);
              onPreferencesChange({
                focusAreas: focusAreas as AnalysisPreferences["focusAreas"],
                genre: value as AnalysisPreferences["genre"],
                style: style as AnalysisPreferences["style"]
              });
            }}
          >
            {["drama", "horror", "documentary", "commercial", "music_video"].map((g) => (
              <div key={g} className="flex items-center space-x-2">
                <RadioGroupItem value={g} id={`genre-${g}`} />
                <Label htmlFor={`genre-${g}`} className="capitalize">
                  {g.replace('_', ' ')}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Lighting Style</Label>
          <RadioGroup
            value={style}
            onValueChange={(value) => {
              setStyle(value);
              onPreferencesChange({
                focusAreas: focusAreas as AnalysisPreferences["focusAreas"],
                genre: genre as AnalysisPreferences["genre"],
                style: value as AnalysisPreferences["style"]
              });
            }}
          >
            {["naturalistic", "high_contrast", "soft_light", "dramatic"].map((s) => (
              <div key={s} className="flex items-center space-x-2">
                <RadioGroupItem value={s} id={`style-${s}`} />
                <Label htmlFor={`style-${s}`} className="capitalize">
                  {s.replace('_', ' ')}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
