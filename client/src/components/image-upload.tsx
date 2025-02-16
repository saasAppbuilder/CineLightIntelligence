import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
}

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        onImageSelect(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    },
    maxFiles: 1
  });

  return (
    <Card
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed ${
        isDragActive ? "border-primary" : "border-muted"
      }`}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Upload className="h-12 w-12 mb-4 text-primary animate-bounce" />
        ) : (
          <ImageIcon className="h-12 w-12 mb-4 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the image here"
            : "Drag and drop an image here, or click to select"}
        </p>
      </CardContent>
    </Card>
  );
}
