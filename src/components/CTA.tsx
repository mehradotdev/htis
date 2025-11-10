export default function CTA() {
  return (
    <div className="bg-background py-20 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Like what we do?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you want to start a new project, or need help with an existing one, we can guide you through the strategy process, guide you through the strategy process, advise throughout development, or provide in between.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 border border-border text-foreground rounded-lg hover:border-green-500 hover:text-green-400 transition font-medium">
            Get in Touch
          </button>
          <button className="px-8 py-4 bg-green-500 text-background font-semibold rounded-lg hover:bg-green-400 transition">
            View Careers
          </button>
        </div>
      </div>
    </div>
  );
}
