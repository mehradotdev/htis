export default function GlobalExpansion() {
  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              What Begin As Just An Small Idea In A Small Office Space Grown Into A Global Company
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Starting with a vision to transform India's digital landscape, we've grown from a small team in a modest office to a nationwide technology leader serving over 120 districts.
              </p>
              <p>
                Our journey reflects our commitment to excellence, innovation, and empowering communities through cutting-edge technology solutions.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Global expansion"
                className="w-full h-96 object-cover rounded-2xl opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent rounded-2xl"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl"></div>
                  <div className="relative bg-background/50 backdrop-blur border border-green-500/30 rounded-2xl p-8">
                    <div className="text-5xl font-bold text-green-400 mb-2">120+</div>
                    <div className="text-foreground/80">Districts Served</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-12 left-12 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></div>
              <div className="absolute top-1/2 left-8 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
