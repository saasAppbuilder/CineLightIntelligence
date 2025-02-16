import { Card, CardContent } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { referenceImages } from "@/lib/reference-images";

interface ReferenceGridProps {
  onSelect: (imageUrl: string) => void;
}

export function ReferenceGrid({ onSelect }: ReferenceGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(referenceImages).map(([category, images]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">
            {category.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <div className="grid gap-4">
            {images.map((image) => (
              <Card
                key={image.url}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => onSelect(image.url)}
              >
                <CardContent className="p-2">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={image.url}
                      alt={image.title}
                      className="object-cover rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image.url);
                      }}
                    />
                  </AspectRatio>
                  <p className="mt-2 text-sm font-medium">{image.title}</p>
                  <p className="text-xs text-muted-foreground">
                    by {image.photographer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Reference Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected reference"
              className="w-full rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
