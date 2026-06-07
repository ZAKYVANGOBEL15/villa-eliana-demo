import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Quote, UserPlus, Trash2 } from 'lucide-react';
import { Testimonial } from '../types';

export default function Reviews() {
  const [reviews, setReviews] = useState<Testimonial[]>([
    {
      id: 'rev-1',
      name: 'Aditya Wardhana',
      city: 'Jakarta Selatan',
      rating: 5,
      comment: "Benar-benar menakjubkan. Duduk di teras batu basal Villa Eliana pada jam 5 pagi dengan embun hangat mengepul dari jacuzzi geotermal pribadi, memandang langsung ke arah Gunung Lokon, adalah pengalaman suci yang magis. Butler lokal menyajikan kopi roasting Mahawu yang luar biasa.",
      date: 'May 12, 2026'
    },
    {
      id: 'rev-2',
      name: 'Marcus & Elena Keller',
      city: 'Zürich, Swiss',
      rating: 5,
      comment: "Kami sering mengunjungi suaka butik ramah lingkungan di berbagai penjuru dunia, dan Eliana adalah sebuah karya arsitektur luar biasa di atas dataran tinggi Tomohon. Keheningan mutlak, kekedapan suara sempurna pada kamar tidur kaca, serta keramahtamahan khas Minahasa yang luar biasa.",
      date: 'April 28, 2026'
    },
    {
      id: 'rev-3',
      name: 'Sarah Lim',
      city: 'Singapura',
      rating: 4,
      comment: "Pelarian megah dari hiruk-pikuk perkotaan. Kebun botani di sekitarnya sangat subur dan hijau, semerbak bunga melati dan aroma tanah vulkanik yang segar. Kecepatan internet Starlink sangat stabil. Musim gugur depan kami pasti akan memesan seluruh area vila.",
      date: 'March 15, 2026'
    }
  ]);

  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load reviews from local storage
  useEffect(() => {
    const saved = localStorage.getItem('villa_eliana_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error("Failed loading local reviews", e);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formComment) {
      alert("Silakan masukkan setidaknya Nama dan Catatan Pengalaman Anda.");
      return;
    }

    const newReview: Testimonial = {
      id: `rev-local-${Date.now()}`,
      name: formName,
      city: formCity || 'Valued Guest',
      rating: formRating,
      comment: formComment,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('villa_eliana_reviews', JSON.stringify(updated));

    // Reset Form fields
    setFormName('');
    setFormCity('');
    setFormComment('');
    setFormRating(5);
    setIsFormVisible(false);
  };

  const deleteReview = (id: string) => {
    const filtered = reviews.filter(rev => rev.id !== id);
    setReviews(filtered);
    localStorage.setItem('villa_eliana_reviews', JSON.stringify(filtered));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <section id="reviews" className="py-24 bg-luxury-sand relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Headings */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-luxury-gold tracking-[0.3em] uppercase block">
              Bisikan Suaka
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark font-light">
              Testimoni <span className="italic text-luxury-gold">Keheningan</span>
            </h2>
            <p className="font-sans text-sm text-gray-500 font-light max-w-lg leading-relaxed">
              Simak kisah para tamu yang telah merasakan damainya perbukitan Wailan Tomohon, atau bagikan pengalaman menginap otentik Anda sendiri.
            </p>
          </div>

          <div className="flex items-center space-x-6 shrink-0 bg-white/70 backdrop-blur-md p-6 border border-luxury-gold/10">
            <div className="text-center">
              <p className="font-serif text-3xl font-semibold text-luxury-dark">{calculateAverageRating()}</p>
              <p className="font-sans text-[9px] text-gray-400 uppercase tracking-widest mt-1">KEPUASAN TAMU</p>
            </div>
            <div className="h-10 w-[1px] bg-luxury-gold/25" />
            <div>
              <div className="flex text-luxury-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(Number(calculateAverageRating())) ? '#B59F84' : 'none'} />
                ))}
              </div>
              <p className="font-mono text-[9px] text-gray-500 mt-1 uppercase tracking-wider">BERDASARKAN {reviews.length} KUNJUNGAN</p>
            </div>
          </div>
        </div>

        {/* Reviews dynamic grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main reviews display feed (Left aspects) */}
          <div className={`space-y-8 ${isFormVisible ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {reviews.map((rev) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={rev.id}
                    className="p-8 bg-luxury-cream luxury-border shadow-sm flex flex-col justify-between h-[280px]"
                  >
                    <div className="space-y-4">
                      {/* Quote layout and Stars */}
                      <div className="flex justify-between items-start">
                        <div className="flex text-luxury-gold">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} fill={i < rev.rating ? '#B59F84' : 'none'} className={i < rev.rating ? 'fill-luxury-gold' : ''} />
                          ))}
                        </div>
                        <Quote size={20} className="text-luxury-gold/15" />
                      </div>

                      <p className="font-sans text-xs text-gray-500 font-light leading-relaxed line-clamp-5 italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex justify-between items-end pt-4 border-t border-luxury-gold/10">
                      <div>
                        <h4 className="font-serif text-sm font-medium text-luxury-dark">{rev.name}</h4>
                        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">{rev.city}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-gray-400">
                        <span className="font-mono text-[8px] tracking-wider uppercase">{rev.date}</span>
                        {rev.id.startsWith('rev-local') && (
                          <button
                            onClick={() => deleteReview(rev.id)}
                            className="text-rose-400 hover:text-rose-600 transition-colors"
                            title="Remove review"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Toggle show Form button */}
            {!isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="mx-auto flex items-center space-x-3 px-8 py-3.5 border border-luxury-dark/15 hover:border-luxury-gold hover:text-luxury-gold text-luxury-dark font-sans text-xs tracking-widest uppercase transition-colors bg-white/40"
              >
                <UserPlus size={14} />
                <span>Bagikan Pengalaman Anda</span>
              </button>
            )}
          </div>

          {/* Review write form (Right aspects) */}
          <AnimatePresence>
            {isFormVisible && (
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                className="lg:col-span-5 bg-luxury-cream p-8 border border-luxury-gold/20 shadow-md luxury-border"
              >
                <div className="flex justify-between items-center pb-4 border-b border-luxury-gold/10 mb-6">
                  <h3 className="font-serif text-xl font-light text-luxury-dark">Kirim Ulasan Anda</h3>
                  <button 
                    onClick={() => setIsFormVisible(false)}
                    className="font-mono text-[10px] text-gray-400 hover:text-luxury-dark tracking-widest uppercase"
                  >
                    TUTUP
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-2">
                        Nama Tamu
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pb-2 font-sans text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-2">
                        Kota / Negara
                      </label>
                      <input
                        type="text"
                        placeholder="Jakarta / Zurich"
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pb-2 font-sans text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-1">
                      Skala Penilaian
                    </label>
                    <div className="flex space-x-2 py-2">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setFormRating(stars)}
                          className="text-luxury-gold focus:outline-none"
                        >
                          <Star size={18} fill={stars <= formRating ? '#B59F84' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-2">
                      Catatan Pengalaman Otentik
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tuliskan kesan Anda mengenai indahnya fajar Lokon, kenyamanan jacuzzi air hangat geotermal, keramahtamahan butler..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="w-full bg-transparent border border-luxury-gold/15 focus:border-luxury-gold p-3 font-sans text-xs focus:outline-none resize-none placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-luxury-dark hover:bg-luxury-gold text-white font-sans text-xs tracking-widest uppercase transition-colors"
                  >
                    Simpan Ulasan Saya
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
