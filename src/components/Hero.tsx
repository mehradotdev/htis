import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative bg-background">

      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground mb-6">
              India-based, future-first technology leader
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Empowering India's Digital Future
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              With Indian government efforts to providing 120+ district's cutting-edge technology for public distribution system, digital connectivity, agriculture support, rural connectivity projects, systems, and possibilities.
            </p>
            <div className="flex items-center space-x-4">
              <Button size="lg" variant="default" className="px-6 py-3 font-semibold rounded-lg transition">
                Explore Solutions
              </Button>
              <Button size="lg" variant="outline" className="px-6 py-3 font-semibold rounded-lg transition">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-green-900/20 to-transparent border border-green-900/30 rounded-3xl p-8 backdrop-blur">
              <div className="absolute top-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-background" />
              </div>
              <div className="h-64 flex items-end">
                <div className="text-foreground">
                  <div className="text-2xl font-bold mb-2">Telecom</div>
                  <div className="text-sm text-muted-foreground">Leading India's connectivity revolution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
