import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Layers, Tag, Eye } from 'lucide-react';
import { GalleryImage } from '../types';

export default function InteractiveGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'exterior' | 'interior' | 'wellness'>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images: GalleryImage[] = [
    {
      id: '1',
      title: 'Monolith Vulkanik',
      category: 'exterior',
      imageUrl: '/src/assets/images/hero_villa_1780773373939.png',
      description: "Struktur arsitektur utama Villa Eliana di Wailan, dirancang dengan paduan beton ekspos serta garis kaca minimalis tanpa sekat yang menghadap langsung ke arah Gunung Lokon.",
      details: ['Beton ekspos khusus', 'Dek panorama menghadap barat', 'Taman rumput dataran tinggi']
    },
    {
      id: '2',
      title: 'Lounge Utama Senggang',
      category: 'interior',
      imageUrl: '/src/assets/images/villa_interior_1780773392194.png',
      description: 'Ruang komunal utama yang memiliki panel kaca tinggi dari lantai ke langit-langit, menghadap ke jajaran perbukitan pinus Tomohon.',
      details: ['Panel dinding kayu solid', 'Kaca kedap suara Low-E', 'Sofa linen minimalis premium']
    },
    {
      id: '3',
      title: 'Master Suite Lokon',
      category: 'interior',
      imageUrl: '/src/assets/images/villa_bedroom_1780773407332.png',
      description: 'Kamar utama privat yang dilengkapi kain organik pilihan, partisi kayu jati geser, serta balkon pribadi menghadap kabut pegunungan Tomohon.',
      details: ['Linen alami 100% Belgian flax', 'Rangka ranjang kayu jati custom', 'Sistem penghangat lantai terintegrasi']
    },
    {
      id: '4',
      title: 'Bak Jacuzzi Geotermal',
      category: 'wellness',
      imageUrl: '/src/assets/images/villa_pool_1780773422607.png',
      description: 'Kolam rendam air panas alami outdoor yang diletakkan kokoh di atas dek batu basalt, menjaga kehangatan ideal bersuhu 39°C.',
      details: ['Paving basalt gelap lokal', 'Pompa hidro geothermal', 'Menghadap ke jurang lembah berkabut']
    },
    {
      id: '5',
      title: 'Taman Bunga Senja',
      category: 'exterior',
      imageUrl: '/src/assets/images/villa_garden_1780773525174.png',
      description: 'Teras bunga yang dikurasi cermat merepresentasikan kekayaan botani Tomohon, diterangi pencahayaan temaram sepanjang jalan setapak.',
      details: ['Taman anggrek lokal terpilih', 'Jalan setapak batu alam teratur', 'Pencahayaan atmosferik minimalis']
    },
    {
      id: '6',
      title: 'Bak Mandi Batu Kali',
      category: 'wellness',
      imageUrl: '/src/assets/images/villa_bathroom_1780773539840.png',
      description: 'Kamar mandi utama mewah yang memiliki bak berendam pahatan dari sebuah batu sungai vulkanik utuh, berlatar pemandangan hutan pakis murni.',
      details: ['Bak mandi batu sungai vulkanik', 'Kran kuningan antik', 'Panel kanopi anggrek privat']
    }
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight' && selectedImage !== null) handleNext();
      if (e.key === 'ArrowLeft' && selectedImage !== null) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentFilteredIndex = filteredImages.findIndex(img => img.id === images[selectedImage].id);
    const nextFilteredIndex = (currentFilteredIndex + 1) % filteredImages.length;
    const actualIndex = images.findIndex(img => img.id === filteredImages[nextFilteredIndex].id);
    setSelectedImage(actualIndex);
  };

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentFilteredIndex = filteredImages.findIndex(img => img.id === images[selectedImage].id);
    const prevFilteredIndex = (currentFilteredIndex - 1 + filteredImages.length) % filteredImages.length;
    const actualIndex = images.findIndex(img => img.id === filteredImages[prevFilteredIndex].id);
    setSelectedImage(actualIndex);
  };

  const categories = [
    { value: 'all', label: 'Semua Sudut Vila' },
    { value: 'exterior', label: 'Eksterior' },
    { value: 'interior', label: 'Kamar & Interior' },
    { value: 'wellness', label: 'Kolam Relaksasi' }
  ] as const;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-luxury-cream overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-luxury-gold tracking-[0.3em] uppercase block">
              Eksplorasi Ruang
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark font-light">
              Galeri Keindahan <span className="italic text-luxury-gold">Arsitektur</span> Kami
            </h2>
            <p className="font-sans text-sm text-gray-500 max-w-lg font-light leading-relaxed">
              Jelajahi detail arsitektur estetik Villa Eliana. Gunakan kategori pencarian untuk mengamati bagaimana volume tata ruang, material premium, dan keasrian alam Tomohon bersatu padu.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2.5 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-5 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 relative ${
                  activeFilter === cat.value
                    ? 'text-white'
                    : 'text-luxury-dark/60 hover:text-luxury-dark bg-luxury-sand/40 hover:bg-luxury-sand/80'
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {activeFilter === cat.value && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-luxury-dark"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Interactive Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => {
              const originalIndex = images.findIndex(item => item.id === img.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={img.id}
                  onClick={() => setSelectedImage(originalIndex)}
                  className="group relative h-[320px] md:h-[380px] overflow-hidden shadow-md cursor-pointer luxury-border bg-luxury-dark"
                >
                  {/* Image wrapper */}
                  <div className="absolute inset-0 z-0 bg-luxury-dark">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 via-luxury-dark/15 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-80" />
                  </div>

                  {/* Top category meta */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="font-mono text-[9px] text-[#fbfaf7]/80 tracking-[0.250em] uppercase py-1 px-3 bg-white/10 backdrop-blur-md rounded-none border border-white/10">
                      {img.category}
                    </span>
                  </div>

                  {/* Core detail overlay */}
                  <div className="absolute inset-x-6 bottom-6 z-10 flex flex-col justify-end text-white space-y-2">
                    <span className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase">
                      DETAIL PILIHAN
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-light text-[#fbfaf7] tracking-wide transition-colors duration-300 group-hover:text-luxury-gold-light">
                      {img.title}
                    </h3>
                    <p className="font-sans text-[11px] text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light leading-relaxed">
                      {img.description}
                    </p>
                    <div className="pt-2 flex items-center space-x-1 font-mono text-[9px] text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-widest">
                      <Eye size={10} className="mr-1" />
                      <span>KLIK UNTUK EKSPLORASI DETAIL</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Cinematic Fullscreen Lightbox Panel */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0f1214]/98 backdrop-blur-md overflow-y-auto flex items-start justify-center p-4 sm:p-6 md:p-12 text-left"
            >
              {/* Escape trigger background */}
              <div className="absolute inset-0 z-0" onClick={() => setSelectedImage(null)} />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 bg-[#161a1d] border border-luxury-gold/15 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 shadow-2xl rounded-none overflow-hidden my-auto"
              >
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2.5 bg-[#0f1214]/85 text-[#fbfaf7] hover:text-luxury-gold hover:bg-[#0f1214] z-30 transition-all border border-white/5 active:scale-95"
                >
                  <X size={18} />
                </button>

                {/* Left side: Immersive Image with Navigation sliders */}
                <div className="lg:col-span-8 relative h-[240px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-[#0c0d0f] flex items-center justify-center overflow-hidden">
                  <img
                    src={images[selectedImage].imageUrl}
                    alt={images[selectedImage].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Slider controls inside image */}
                  <div className="absolute inset-x-4 bottom-4 md:bottom-6 flex justify-between items-center z-10 pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="h-10 w-10 flex items-center justify-center bg-[#0f1214]/80 text-white hover:text-luxury-gold hover:bg-[#0f1214] border border-white/5 pointer-events-auto transition-all rounded-none active:scale-95"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    <span className="bg-[#0f1214]/80 font-mono text-[9px] sm:text-[10px] text-gray-300 px-3 py-1.5 md:px-4 md:py-2 border border-white/5 tracking-widest flex items-center">
                      {images.findIndex(img => img.id === images[selectedImage].id) + 1} / {images.length}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="h-10 w-10 flex items-center justify-center bg-[#0f1214]/80 text-white hover:text-luxury-gold hover:bg-[#0f1214] border border-white/5 pointer-events-auto transition-all rounded-none active:scale-95"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Right side: Luxurious Detail spec sheets */}
                <div className="lg:col-span-4 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#131618] border-t lg:border-t-0 lg:border-l border-white/5">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-2 text-luxury-gold font-mono text-[9px] tracking-widest uppercase">
                      <Tag size={10} />
                      <span>Modul {images[selectedImage].category}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-light tracking-wide leading-tight">
                      {images[selectedImage].title}
                    </h3>

                    <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                      {images[selectedImage].description}
                    </p>
                  </div>

                  <div className="space-y-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5">
                    <div className="space-y-3">
                      <p className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase">
                        MATERIAL & ARSITEKTUR
                      </p>
                      <div className="space-y-2">
                        {images[selectedImage].details.map((detail, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-[11px] text-[#fbfaf7]/90 font-sans font-light">
                            <span className="h-1 w-1 rounded-full bg-luxury-gold shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        const bookingSection = document.getElementById('booking');
                        bookingSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3.5 bg-luxury-gold hover:bg-luxury-gold-light text-luxury-dark font-sans text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 shadow-md text-center active:scale-95"
                    >
                      Reservasi Ruang dengan Fitur Ini
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
