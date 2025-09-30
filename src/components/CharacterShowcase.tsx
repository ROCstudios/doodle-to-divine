import React from 'react';
import { Sparkles, Zap, Palette, Wand2 } from 'lucide-react';
import character1 from '@/assets/character-1.jpg';
import character2 from '@/assets/character-2.jpg';
import character3 from '@/assets/character-3.jpg';
import character4 from '@/assets/character-4.jpg';
import character5 from '@/assets/character-5.jpg';
import character6 from '@/assets/character-6.jpg';

const characters = [
  { src: character1, style: 'Anime', icon: Sparkles },
  { src: character2, style: 'Cartoon', icon: Zap },
  { src: character3, style: 'Realistic', icon: Palette },
  { src: character4, style: 'Concept Art', icon: Wand2 },
  { src: character5, style: 'Painterly', icon: Sparkles },
  { src: character6, style: 'Cartoon', icon: Zap },
];

export function CharacterShowcase() {
  return (
    <div className="py-16 px-4 bg-gradient-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Sketch to Character
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Transform rough sketches into fully rendered characters with AI
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {characters.map((character, index) => {
            const IconComponent = character.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-card shadow-card hover:shadow-lg transition-smooth hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square relative">
                  <img
                    src={character.src}
                    alt={`${character.style} character example`}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-smooth">
                    <div className="flex items-center gap-2 text-white">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{character.style}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Multiple Styles</h3>
            <p className="text-sm text-muted-foreground">
              Choose from anime, realistic, cartoon, and more artistic styles
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Generate professional character art in seconds, not hours
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Full Control</h3>
            <p className="text-sm text-muted-foreground">
              Adjust refinement levels from light touch to fully rendered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}