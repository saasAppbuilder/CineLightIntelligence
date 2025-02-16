import { useState } from "react";
import { useLocation } from "wouter";
import { ImageUpload } from "@/components/image-upload";
import { ReferenceGrid } from "@/components/reference-grid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or select an image to analyze",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await apiRequest("POST", "/api/analyze", {
        imageBase64: selectedImage,
        referenceImageUrl: referenceImage
      });
      const result = await response.json() as { id: number };
      setLocation(`/analysis/${result.id}`);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">CineLightAI</h1>
          <p className="text-muted-foreground">
            Upload an image or choose a reference to analyze lighting setup
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="reference">Reference Images</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <ImageUpload onImageSelect={setSelectedImage} />
            {selectedImage && (
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="Selected"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="reference">
            <ReferenceGrid onSelect={(url) => setReferenceImage(url)} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={!selectedImage}
          >
            Analyze Lighting
          </Button>
        </div>
      </div>
    </div>
  );
}