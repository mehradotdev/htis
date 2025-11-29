import { Button } from "@/components/ui/button";
import CardSwapDemo from "./CardSwapDemo";

export default function Hero() {
  return (
    <div className="relative bg-background overflow-x-clip">
      <div className="container mx-auto px-6 pt-20 pb-0">
        <div className="grid h-full md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col justify-between">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Improving Digital Future
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              With Indian government efforts to providing 120+ district's
              cutting-edge technology for public distribution system, digital
              connectivity, agriculture support, rural connectivity projects,
              systems, and possibilities.
            </p>
            <div className="flex items-center space-x-4 mb-18">
              <Button
                size="lg"
                variant="default"
                className="py-3 font-semibold text-lg rounded-lg transition"
              >
                Learn More
              </Button>
              <Button size="lg" variant="outline" className="text-lg py-3 font-semibold rounded-lg transition">
                Get in Touch
              </Button>
            </div>
          </div>

          <div className="relative flex items-center w-full h-full">
            <CardSwapDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
