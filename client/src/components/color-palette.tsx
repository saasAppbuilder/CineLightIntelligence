import { cn } from "@/lib/utils";

interface ColorPaletteProps {
  colors: string[];
  className?: string;
}

export function ColorPalette({ colors, className }: ColorPaletteProps) {
  return (
    <div className={cn("w-full h-8 flex", className)}>
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-1 h-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
