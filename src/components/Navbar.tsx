import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'hero', label: 'Lobby' },
    { id: 'about', label: 'Filosofi' },
    { id: 'amenities', label: 'Fasilitas' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'reviews', label: 'Ulasan' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-cream/90 backdrop-blur-md py-4 border-b border-luxury-gold/10 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex flex-col items-start focus:outline-none group text-left"
          >
            <span className={`font-serif text-lg md:text-2xl tracking-[0.25em] font-medium transition-colors duration-300 ${
              isScrolled ? 'text-luxury-dark' : 'text-white'
            }`}>
              VILLA ELIANA
            </span>
            <span className={`font-mono text-[9px] tracking-[0.4em] uppercase transition-colors duration-300 mt-1 ${
              isScrolled ? 'text-luxury-gold' : 'text-luxury-gold-light'
            }`}>
              Wailan · Tomohon
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`font-sans text-xs tracking-widest uppercase relative py-2 transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-luxury-gold font-medium'
                      : isScrolled
                      ? 'text-luxury-dark hover:text-luxury-gold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-luxury-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleLinkClick('booking')}
              className={`flex items-center space-x-2 px-6 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                isScrolled
                  ? 'bg-luxury-dark text-luxury-cream hover:bg-luxury-gold'
                  : 'bg-white text-luxury-dark hover:bg-luxury-gold hover:text-white'
              }`}
            >
              <span>Reservasi</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] bg-luxury-cream z-40 lg:hidden flex flex-col justify-between p-8 border-t border-luxury-gold/10"
          >
            <div className="flex flex-col space-y-6 mt-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left font-serif text-2xl tracking-widest uppercase py-2 border-b border-luxury-gold/5 transition-colors duration-300 ${
                    activeSection === item.id ? 'text-luxury-gold' : 'text-luxury-dark/70'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => handleLinkClick('booking')}
              className="w-full flex items-center justify-center space-x-3 bg-luxury-dark text-white py-4 font-sans text-xs tracking-widest uppercase hover:bg-luxury-gold transition-colors duration-300"
            >
              <span>Reservasi Sekarang</span>
              <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
