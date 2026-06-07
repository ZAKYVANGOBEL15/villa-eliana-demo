import { motion } from 'motion/react';
import { Flame, Coffee, Wifi, Sparkles, Tv, HelpCircle, Eye, Waves } from 'lucide-react';

interface AmenityItem {
  icon: any;
  title: string;
  sub: string;
  desc: string;
  spec: string;
}

export default function Amenities() {
  const items: AmenityItem[] = [
    {
      icon: Waves,
      title: "Geothermal Jacuzzi",
      sub: "Kehangatan Alami Bumi",
      desc: "Plunge pool batu outdoor hangat mengepul bersuhu 39°C yang relaks, menghadap langsung ke arah siluet keindahan Gunung Lokon.",
      spec: "Pemanas Geotermal · Batu Alam · 40m³"
    },
    {
      icon: Coffee,
      title: "Bespoke Brew Pavilion",
      sub: "Cita Rasa Kopi Minahasa",
      desc: "Coffee bar eksklusif yang menyajikan biji kopi Arabika single-origin pilihan asal Tomohon & Toraja, lengkap dengan peralatan espresso manual premium.",
      spec: "La Marzocco Linea · Roasting Lokal · Self Bar"
    },
    {
      icon: Eye,
      title: "Kaca Arsitektural",
      sub: "Vistas Vulkanik 360°",
      desc: "Dinding kaca triple-glazed tanpa sekat dengan teknologi low-E kedap suara, menyajikan indahnya kabut pagi tanpa mereduksi kehangatan suhu dalam vila.",
      spec: "Double Cavity Glass · Smart Frosting"
    },
    {
      icon: Wifi,
      title: "Koneksi Fiber Kecepatan Tinggi",
      sub: "Tetap Terhubung Syahdu",
      desc: "Akses internet berkecepatan tinggi dengan latensi ultra-rendah melalui jaringan satelit Starlink, sangat ideal untuk eksekutif yang bekerja secara remote.",
      spec: "300 Mbps · Cakupan Mesh WiFi 6"
    },
    {
      icon: Flame,
      title: "Perapian Minimalis",
      sub: "Kehangatan Senja Hari",
      desc: "Area duduk melingkar (sunken seat) basalt outdoor yang dilengkapi cincin api gas industrial demi menghalau hembusan angin malam Tomohon yang dingin.",
      spec: "Dek Basalt Vulkanik · Central Burner"
    },
    {
      icon: Sparkles,
      title: "Layanan Butler 24 Jam",
      sub: "Pengalaman yang Dikurasi",
      desc: "Host personal lokal yang berdedikasi merekomendasikan tur agrowisata, pendakian Gunung Mahawu, bersantai di Danau Linow, atau koki privat.",
      spec: "Multilingual Butler · Layanan On-Demand"
    }
  ];

  return (
    <section id="amenities" className="py-24 bg-luxury-sand relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-[10px] text-luxury-gold tracking-[0.3em] uppercase block">
            Kenyamanan Klasik
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark font-light">
            Definisi kemewahan yang <span className="italic text-luxury-gold">terencana</span>, bukan kemakmuran berlebihan
          </h2>
          <p className="font-sans text-sm text-gray-500 font-light max-w-lg mx-auto leading-relaxed">
            Setiap fasilitas di Villa Eliana dirancang selaras dengan alam pegunungan, menghadirkan kenyamanan murni tanpa merusak pesona asri dataran tinggi Tomohon.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-luxury-cream p-8 luxury-border shadow-sm flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1"
              >
                <div className="space-y-6">
                  {/* Icon Panel */}
                  <div className="h-12 w-12 bg-luxury-sand text-luxury-gold flex items-center justify-center transition-colors duration-500 group-hover:bg-luxury-dark group-hover:text-white rounded-none">
                    <Icon size={20} />
                  </div>

                  {/* Text Header */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-[0.2em] block">
                      {item.sub}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-luxury-dark">
                      {item.title}
                    </h3>
                  </div>

                  {/* Narrative Body */}
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* technical spec overlay */}
                <div className="mt-8 pt-4 border-t border-luxury-gold/10 flex items-center justify-between text-gray-400 font-mono text-[9px] tracking-wider uppercase">
                  <span>SPECIFICATION</span>
                  <span className="text-luxury-dark/70 font-medium">{item.spec}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
