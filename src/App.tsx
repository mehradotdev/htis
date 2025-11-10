import './App.css'
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Solutions from './components/Solutions';
import Timeline from './components/Timeline';
import Team from './components/Team';
import GlobalExpansion from './components/GlobalExpansion';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <TrustedBy />
        <Solutions />
        <Timeline />
        <Team />
        <GlobalExpansion />
        <CTA />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
