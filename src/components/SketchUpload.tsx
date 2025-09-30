import React, { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SketchUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  onRemoveImage: () => void;
}

export function SketchUpload({ onImageUpload, uploadedImage, onRemoveImage }: SketchUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      onImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (uploadedImage) {
    const imageUrl = URL.createObjectURL(uploadedImage);
    
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg border-2 border-primary/20 bg-card shadow-card">
          <img 
            src={imageUrl} 
            alt="Uploaded sketch" 
            className="h-64 w-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={onRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {uploadedImage.name}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button
        variant="upload"
        size="lg"
        className={cn(
          "h-64 w-full flex-col gap-4 text-base transition-smooth",
          isDragOver && "border-primary bg-upload-hover scale-[1.02]"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {isDragOver ? (
          <Upload className="h-12 w-12 text-primary animate-bounce" />
        ) : (
          <Image className="h-12 w-12" />
        )}
        
        <div className="text-center">
          <p className="font-medium">
            {isDragOver ? "Drop your sketch here" : "Drop your sketch here or click to upload"}
          </p>
          <p className="text-sm opacity-75 mt-1">
            Supports JPG, PNG, WEBP
          </p>
        </div>
      </Button>
    </div>
  );
}