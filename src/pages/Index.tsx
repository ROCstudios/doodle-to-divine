import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SketchUpload } from '@/components/SketchUpload';
import { StyleSelector } from '@/components/StyleSelector';
import { RefinementSlider } from '@/components/RefinementSlider';
import { ResultsGrid } from '@/components/ResultsGrid';
import { useToast } from '@/hooks/use-toast';
import heroBackground from '@/assets/hero-bg.jpg';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('anime');
  const [refinementLevel, setRefinementLevel] = useState<number[]>([70]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [processingTime, setProcessingTime] = useState<number | undefined>();
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setGeneratedImages([]); // Clear previous results
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setGeneratedImages([]);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload a sketch first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const startTime = Date.now();

    try {
      // Simulate API call for demo purposes
      // In a real app, you'd call your backend API here
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated images (in real app, these would come from your AI service)
      const mockImages = [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&sat=-100',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=180',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=90'
      ];

      setGeneratedImages(mockImages);
      setProcessingTime(Math.round((Date.now() - startTime) / 1000));
      
      toast({
        title: "Success!",
        description: "Your character variations have been generated.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <div 
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-in fade-in-50 duration-700">
            Sketch to Character
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-in fade-in-50 duration-700 delay-150">
            Transform rough sketches into fully rendered characters with AI
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Card className="shadow-card border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Create Your Character
            </CardTitle>
            <CardDescription className="text-base">
              Upload your sketch and watch AI bring it to life in multiple styles
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Upload Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">1. Upload Your Sketch</h3>
              <SketchUpload
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                onRemoveImage={handleRemoveImage}
              />
            </div>

            {/* Style and Refinement Controls */}
            {uploadedImage && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in-50 duration-500">
                <div>
                  <h3 className="text-lg font-medium mb-4">2. Choose Style</h3>
                  <StyleSelector
                    value={selectedStyle}
                    onValueChange={setSelectedStyle}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">3. Set Refinement</h3>
                  <RefinementSlider
                    value={refinementLevel}
                    onValueChange={setRefinementLevel}
                  />
                </div>
              </div>
            )}

            {/* Generate Button */}
            {uploadedImage && (
              <div className="text-center animate-in fade-in-50 duration-500 delay-200">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-12 py-6 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Flesh It Out
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="mt-12">
          <ResultsGrid
            originalImage={uploadedImage}
            generatedImages={generatedImages}
            processingTime={processingTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
