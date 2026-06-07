import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Amenities from './components/Amenities';
import InteractiveGallery from './components/InteractiveGallery';
import BookingInquiry from './components/BookingInquiry';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Section intersection observer to update active nav state based on scroll coordinates
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focused center viewport
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ['hero', 'about', 'amenities', 'gallery', 'booking', 'reviews'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-luxury-dark selection:bg-luxury-gold selection:text-white">
      {/* Fixed Navigation bar */}
      <Navbar onNavigate={handleScrollToSection} activeSection={activeSection} />

      {/* Hero Welcome lobbies */}
      <Hero onScrollTo={handleScrollToSection} />

      {/* Heritage / Storyboard */}
      <main>
        <About />

        {/* Curated amenities grids */}
        <Amenities />

        {/* Dynamic craftsmanship filters & Lightboxes */}
        <InteractiveGallery />

        {/* Dynamic reserve managers & ledger logs */}
        <BookingInquiry />

        {/* Guest comments ledger */}
        <Reviews />
      </main>

      {/* Map coords, contact linkages & Trademarking details */}
      <Footer onScrollTo={handleScrollToSection} />
    </div>
  );
}
