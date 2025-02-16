import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { AnalysisCard } from "@/components/analysis-card";
import { LoadingAnalysis } from "@/components/loading-analysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { type Analysis } from "@shared/schema";

export default function Analysis() {
  const [, params] = useRoute("/analysis/:id");
  const id = params?.id;

  const { data: analysis, isLoading } = useQuery<Analysis>({
    queryKey: [`/api/analysis/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Analyzing Lighting...</h1>
        </div>
        <LoadingAnalysis />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Analysis not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Lighting Analysis Results</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={analysis.imageUrl}
              alt="Analyzed image"
              className="object-cover w-full h-full"
            />
          </div>
          {analysis.referenceImageUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={analysis.referenceImageUrl}
                alt="Reference image"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <AnalysisCard analysis={analysis} />
      </div>
    </div>
  );
}