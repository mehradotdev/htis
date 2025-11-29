import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarComponent } from "./components/Header";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Solutions from "./components/Solutions";
import Timeline from "./components/Timeline";
import Team from "./components/Team";
import GlobalExpansion from "./components/GlobalExpansion";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import TrustedByBanner from "./components/TrustedByBanner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavbarComponent />
      <Hero />
      <TrustedByBanner />
      <TrustedBy />
      <Solutions />
      <Timeline />
      <Team />
      <GlobalExpansion />
      <CTA />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
