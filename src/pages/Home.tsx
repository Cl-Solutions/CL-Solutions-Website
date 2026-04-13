import { CustomCursor } from '../components/CustomCursor';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { ProblemSection } from '../components/ProblemSection';
import { Services } from '../components/Services';
import { HowItWorks } from '../components/HowItWorks';
import { Numbers } from '../components/Numbers';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-dark">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <Services />
        <HowItWorks />
        <Numbers />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
