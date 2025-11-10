import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold mb-6">
              <span className="text-foreground">HTIS</span>
              <div className="text-xs text-muted-foreground">INDIA</div>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Empowering India's digital future with cutting-edge technology solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-500 hover:text-background transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-500 hover:text-background transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-500 hover:text-background transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-500 hover:text-background transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-500 hover:text-background transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-500 hover:text-background transition">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">SERVICES</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-green-400 transition">5G Network Infrastructure</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Software Development</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-green-400 transition">IoT Integration</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Consulting</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-green-400 transition">Privacy & Cookies</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Investors</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">MAIN LINKS</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><a href="#" className="hover:text-green-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Solutions</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Portfolio</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
            <p>&copy; 2024 HTIS India. All rights reserved.</p>
            {/* <p>Designed & Developed with care</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
