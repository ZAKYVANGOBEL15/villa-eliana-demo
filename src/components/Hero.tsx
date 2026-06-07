import { motion } from 'motion/react';
import { Compass, Thermometer, Wind, ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <div id="hero" className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-luxury-dark select-none flex items-center pt-28 pb-16 lg:py-0">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/images/hero_villa_1780773373939.png')`,
          }}
        />
        {/* Soft, custom gradient mask and blurs */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-luxury-dark/60" />
      </div>

      {/* Hero Core Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Main Typography Titles */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-3 text-luxury-gold tracking-[0.3em] font-mono text-[10px] md:text-xs uppercase"
            >
              <div className="h-[1px] w-8 bg-luxury-gold" />
              <span>Suaka Damai di Dataran Tinggi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-luxury-cream font-light leading-[1.1] tracking-wide"
            >
              Menembus <br />
              <span className="italic font-normal text-luxury-gold-light">Kabut Vulkanik</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="font-sans text-sm md:text-base text-gray-300 max-w-md md:max-w-xl font-light leading-relaxed tracking-wide"
            >
              Dirancang dalam balutan kaca, batu, dan keheningan. Villa Eliana Wailan berdiri megah di dataran tinggi Tomohon yang asri, berlatar Gunung Lokon untuk menghadirkan arsitektur kemewahan yang teduh dan tenang.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="pt-2 flex flex-wrap gap-4"
            >
              <button
                onClick={() => onScrollTo('booking')}
                className="px-8 py-3.5 bg-luxury-gold hover:bg-luxury-gold-light text-luxury-dark font-sans text-xs tracking-widest uppercase transition-all duration-300 shadow-md font-medium"
              >
                Reservasi Vila
              </button>
              <button
                onClick={() => onScrollTo('gallery')}
                className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-sans text-xs tracking-widest uppercase transition-all duration-300 bg-white/5 backdrop-blur-sm"
              >
                Jelajahi Galeri
              </button>
            </motion.div>
          </div>

          {/* Right-Side Atmospheric Stats / Micro-Telemetry Data */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 pb-2 lg:pb-0"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 border border-white/10 text-luxury-gold rounded-full shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">Ketinggian & Lokasi</p>
                <p className="font-mono text-xs text-white">750m dpl · S 1.3213° E 124.8197°</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 border border-white/10 text-luxury-gold rounded-full shrink-0">
                <Thermometer size={18} />
              </div>
              <div>
                <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">Iklim Dataran Tinggi</p>
                <p className="font-mono text-xs text-white">18°C – 23°C (Dingin Menyegarkan)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 border border-white/10 text-luxury-gold rounded-full shrink-0">
                <Wind size={18} />
              </div>
              <div>
                <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">Panorama Gunung Lokon</p>
                <p className="font-mono text-xs text-white">Pemandangan Gunung Api Aktif · Menghadap Barat</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-6 md:left-12 hidden md:flex items-center space-x-4 cursor-pointer hover:opacity-100 transition-opacity duration-300"
          onClick={() => onScrollTo('about')}
        >
          <span className="font-mono text-[9px] text-luxury-cream tracking-[0.3em] uppercase">Gulir untuk eksplorasi</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-luxury-gold"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
