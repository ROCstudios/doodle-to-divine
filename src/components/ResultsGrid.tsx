import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ResultsGridProps {
  originalImage: File | null;
  generatedImages: string[];
  processingTime?: number;
}

export function ResultsGrid({ originalImage, generatedImages, processingTime }: ResultsGridProps) {
  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `character-variation-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!originalImage || generatedImages.length === 0) {
    return null;
  }

  const originalImageUrl = URL.createObjectURL(originalImage);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Your Character Transformations
        </h3>
        {processingTime && (
          <p className="text-sm text-muted-foreground">
            Generated in {processingTime} seconds
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Original Sketch */}
        <Card className="shadow-card transition-smooth hover:shadow-lg">
          <CardContent className="p-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img 
                src={originalImageUrl} 
                alt="Original sketch" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center mt-3 font-medium text-foreground">
              Original Sketch
            </p>
          </CardContent>
        </Card>

        {/* Generated Variations */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.map((imageUrl, index) => (
              <Card key={index} className="group shadow-card transition-smooth hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <img 
                      src={imageUrl} 
                      alt={`Character variation ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-smooth transform scale-90 group-hover:scale-100"
                        onClick={() => handleDownload(imageUrl, index)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-center mt-3 text-sm text-muted-foreground">
                    Variation {index + 1}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}