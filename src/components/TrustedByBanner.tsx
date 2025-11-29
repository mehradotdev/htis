import { Github } from "lucide-react";

// --- Icons / Logos (Inline SVGs to avoid external dependencies) ---

const NikeLogo = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Nike</title>
    <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" />
  </svg>
);

const LemonSqueezyLogo = ({ className }: { className?: string }) => (
  <div
    className={`flex items-center gap-1 font-bold ${className}`}
    style={{ fontFamily: "sans-serif" }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5l6.5 6.5-6.5 6.5-6.5-6.5L12 5.5z" />
    </svg>
    <span>lemon squeezy</span>
  </div>
);

const LillyLogo = ({ className }: { className?: string }) => (
  <span className={`${className} font-serif italic text-2xl tracking-wide`}>
    Lilly
  </span>
);

// --- Main Component ---

export default function TestimonialBanner() {
  return (
    <div className="relative min-h-screen w-full bg-[#E5F9E9] p-8 flex flex-col items-center justify-center font-sans">
      {/* This is the main banner component matching the screenshot.
        It uses a rounded-3xl container, flexbox layout, and a divider.
      */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white rounded-3xl shadow-sm border border-gray-100/50 p-3 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Left Text Section */}
        <div className="flex-shrink-0 px-4 md:pl-6 md:pr-4 text-center md:text-left">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            Powering the best
          </p>
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            teams
          </p>
        </div>

        {/* Vertical Divider (Hidden on mobile, visible on desktop) */}
        <div className="hidden md:block h-10 w-px bg-gray-200 mx-4" />

        {/* Logos Section */}
        <div className="flex-grow flex flex-wrap justify-center md:justify-around items-center gap-8 px-4 md:px-8 opacity-80">
          {/* GitHub */}
          <div className="group flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer">
            <Github className="h-7 w-auto text-gray-900" />
            <span className="ml-2 font-bold text-lg text-gray-900 tracking-tight">
              GitHub
            </span>
          </div>

          {/* Nike */}
          <div className="group flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer">
            <NikeLogo className="h-10 w-auto text-gray-900" />
          </div>

          {/* Lemon Squeezy */}
          <div className="group flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer">
            <LemonSqueezyLogo className="text-gray-900 text-lg" />
          </div>

          {/* Laravel */}
          <div className="group flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xl text-gray-900 tracking-tight">
                Laravel
              </span>
            </div>
          </div>

          {/* Lilly */}
          <div className="group flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer">
            <LillyLogo className="text-gray-900" />
          </div>
        </div>
      </div>

      {/* Contextual Mockup Area Below (To match screenshot vibes) 
         Just to show how it sits on the page
      */}
      <div className="mt-12 w-full max-w-5xl flex gap-8">
        {/* Placeholder for the illustration on the bottom left of your screenshot */}
        <div className="flex items-center justify-center">
          <img src="/cloudImage.png" alt="Mockup" />
        </div>
        {/* Placeholder for the white card on the bottom right */}
        <div className="w-2/3 h-64 bg-white rounded-xl shadow-sm"></div>
      </div>
    </div>
  );
}
