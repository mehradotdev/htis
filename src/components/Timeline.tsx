export default function Timeline() {
  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-green-500 to-border"></div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 md:order-1 text-right">
              <div className="text-8xl font-bold mb-4">2003</div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-6 md:-left-12 top-8 w-4 h-4 bg-green-500 rounded-full border-4 border-background"></div>
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team collaboration"
                  className="rounded-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-1">
              <div className="relative">
                <div className="absolute -right-6 md:-right-12 top-8 w-4 h-4 bg-green-500 rounded-full border-4 border-background"></div>
                <div className="text-6xl font-bold mb-4 text-green-400 transform -rotate-90 origin-left ml-12">
                  Our Journey
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-bold mb-4">Kickstarted</div>
                  <p className="text-muted-foreground">
                    A story driven by vision, innovation, and an unwavering commitment to excellence in the IT industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-2">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">2004</div>
                  <div className="flex-1 h-px bg-border"></div>
                  <div className="text-sm text-muted-foreground">First expansion</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">2010</div>
                  <div className="flex-1 h-px bg-border"></div>
                  <div className="text-sm text-muted-foreground">Major milestone</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">2015</div>
                  <div className="flex-1 h-px bg-border"></div>
                  <div className="text-sm text-muted-foreground">Going global</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">2020</div>
                  <div className="flex-1 h-px bg-border"></div>
                  <div className="text-sm text-muted-foreground">Digital transformation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
