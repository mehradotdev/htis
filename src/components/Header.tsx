import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">
            <span className="text-foreground">HTIS</span>
            <div className="text-xs text-muted-foreground">INDIA</div>
          </div>
        </div>
        <div className="hidden md:flex space-x-8 text-sm">
          <a href="#home" className="text-foreground hover:text-green-400 transition">Home</a>
          <a href="#about" className="text-muted-foreground hover:text-green-400 transition">About us</a>
          <a href="#services" className="text-muted-foreground hover:text-green-400 transition">Services</a>
          <a href="#clients" className="text-muted-foreground hover:text-green-400 transition">Clients</a>
          <a href="#solutions" className="text-muted-foreground hover:text-green-400 transition">Solutions</a>
          <a href="#portfolio" className="text-muted-foreground hover:text-green-400 transition">Portfolio</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
