import React from 'react';
import { Slider } from '@/components/ui/slider';

interface RefinementSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
}

export function RefinementSlider({ value, onValueChange }: RefinementSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Refinement Level
        </label>
        <span className="text-sm text-muted-foreground font-mono">
          {value[0]}%
        </span>
      </div>
      
      <Slider
        value={value}
        onValueChange={onValueChange}
        max={100}
        min={0}
        step={5}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Light Touch</span>
        <span>Fully Rendered</span>
      </div>
    </div>
  );
}