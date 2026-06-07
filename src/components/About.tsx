import { motion } from 'motion/react';

export default function About() {
  const specs = [
    { label: 'Luas Bangunan', value: '450 m² Area Dalam' },
    { label: 'Kapasitas', value: 'Hingga 6 tamu' },
    { label: 'Lingkungan', value: 'Hutan pinus privat' },
    { label: 'Tema Desain', value: 'Kehangatan modern minimalis' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-luxury-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Architectural Left Column Story */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-luxury-gold tracking-[0.3em] uppercase block">
                Filosofi & Desain
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark font-light leading-tight">
                Kala beton, kaca, <br />
                dan <span className="italic text-luxury-gold">pegunungan</span> berpadu mesra.
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-sm md:text-base">
              <p>
                Tersembunyi di kawasan Wailan, Tomohon yang damai—asri sebagai Kota Bunga Indonesia—Villa Eliana menghadirkan peristirahatan syahdu di sela kesibukan perkotaan. Kompleks suaka ini dirancang khusus untuk mewadahi hidup lambat (slow living) serta integrasi iklim pegunungan yang menyejukkan.
              </p>
              <p>
                Arsitekturnya memadukan pilar basalt vulkanik mewah beratap tinggi dengan rangkaian kaca panoramik seamless tanpa batas, membingkai pemandangan awan berarak serta kabut dingin yang turun dari puncak megah Gunung Lokon. Setiap elemen tekstil, ornamen kayu, dan tekstur batu dikurasi secara lokal melalui keahlian seni pengrajin setempat.
              </p>
              <p className="italic font-serif text-luxury-gold font-normal">
                "Kami tidak membangun untuk menyaingi keagungan alam Tomohon, melainkan menyajikan ruang terdepan yang elegan untuk menikmati belaian kabut pegunungan dan harum taman ribuan bunga."
              </p>
            </div>

            {/* Speclist Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-luxury-gold/20">
              {specs.map((spec, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">{spec.label}</p>
                  <p className="font-serif text-base text-luxury-dark font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Image Composition */}
          <div className="lg:col-span-6 relative">
            {/* Visual Frame Decorator */}
            <div className="absolute inset-4 border border-luxury-gold/30 -m-4 z-0 pointer-events-none rounded-sm transition-transform duration-700 hover:scale-[1.02]" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden shadow-2xl h-[400px] md:h-[550px]"
            >
              <img
                src="/src/assets/images/villa_interior_1780773392194.png"
                alt="Villa Eliana Living Spaces"
                className="w-full h-full object-cover transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Glass Accent Indicator */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-light p-6 rounded-none flex items-center justify-between">
                <div>
                  <p className="font-serif text-sm font-medium text-luxury-dark">Ruang Makan & Lounge Utama</p>
                  <p className="font-sans text-[10px] text-gray-500 tracking-wider">Latar pemandangan ikonik Gunung Lokon</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
