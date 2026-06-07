import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Home, ShieldCheck, Mail, Phone, User, Receipt, History, Trash2, CheckCircle2 } from 'lucide-react';
import { BookingInquiry as BookingType } from '../types';

export default function BookingInquiry() {
  const [suiteType, setSuiteType] = useState<'lokon' | 'steam' | 'full'>('lokon');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [notes, setNotes] = useState('');
  
  const [activeReservation, setActiveReservation] = useState<BookingType | null>(null);
  const [allReservations, setAllReservations] = useState<BookingType[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const suiteDetails = {
    lokon: { name: 'Suite Pemandangan Gunung Lokon', price: 220, capacity: 2 },
    steam: { name: 'Suite Jacuzzi Geotermal', price: 260, capacity: 2 },
    full: { name: 'Vila Eksklusif Villa Eliana (Seluruh Area)', price: 550, capacity: 6 }
  };

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('villa_eliana_bookings');
    if (saved) {
      try {
        const parsed: BookingType[] = JSON.parse(saved);
        setAllReservations(parsed);
        if (parsed.length > 0) {
          // default to showing the latest one as active
          setActiveReservation(parsed[parsed.length - 1]);
        }
      } catch (e) {
        console.error("Failed parsing bookings", e);
      }
    }
  }, []);

  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return 0;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const basePrice = nights * suiteDetails[suiteType].price;
  const tax = Math.round(basePrice * 0.1); // 10% Local service & tourist tax
  const totalPrice = basePrice + tax;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || nights <= 0) {
      alert("Silakan pilih tanggal check-in dan check-out kronologis yang valid.");
      return;
    }
    if (!guestName || !email || !phone) {
      alert("Silakan lengkapi semua data diri sebelum mengirimkan.");
      return;
    }

    const newInquiry: BookingType = {
      id: `EL-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      guestsCount,
      villaSuite: suiteDetails[suiteType].name,
      status: 'pending',
      totalPrice,
      createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updated = [...allReservations, newInquiry];
    setAllReservations(updated);
    localStorage.setItem('villa_eliana_bookings', JSON.stringify(updated));
    setActiveReservation(newInquiry);
    
    // Reset Form fields
    setGuestName('');
    setEmail('');
    setPhone('');
    setCheckIn('');
    setCheckOut('');
    setGuestsCount(2);
    setNotes('');
  };

  const handleDeleteBooking = (id: string) => {
    const filtered = allReservations.filter(res => res.id !== id);
    setAllReservations(filtered);
    localStorage.setItem('villa_eliana_bookings', JSON.stringify(filtered));
    if (activeReservation?.id === id) {
      setActiveReservation(filtered.length > 0 ? filtered[filtered.length - 1] : null);
    }
  };

  return (
    <section id="booking" className="py-24 bg-luxury-sand relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header titles */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-[10px] text-luxury-gold tracking-[0.3em] uppercase block">
            Ketenangan Abadi
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark font-light">
            Formulir <span className="italic text-luxury-gold">Reservasi Suaka Anda</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 font-light max-w-lg mx-auto leading-relaxed">
            Kirimkan permohonan reservasi Anda. Layanan butler personal kami akan menghubungi Anda dalam waktu 2 jam untuk menyesuaikan detail kenyamanan, kebutuhan diet, serta penjemputan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reservation logs / Active receipts / History indicator (Left on desktop) */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              {activeReservation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-luxury-cream p-8 md:p-10 shadow-lg border border-luxury-gold/20 relative"
                >
                  {/* Decorative corner lines */}
                  <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-luxury-gold" />
                  <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-luxury-gold" />
                  <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-luxury-gold" />
                  <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-luxury-gold" />

                  <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-luxury-gold/10">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-light text-luxury-dark">Permohonan Terdaftar</h3>
                      <p className="font-sans text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
                        Menunggu konfirmasi butler
                      </p>
                    </div>
                  </div>

                  <div className="py-6 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-gray-400 uppercase tracking-wider">REF-RESERVASI:</span>
                      <span className="font-mono text-luxury-dark font-semibold">{activeReservation.id}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-gray-400 uppercase tracking-wider">PILIHAN KAMAR:</span>
                      <span className="font-medium text-luxury-dark text-right">{activeReservation.villaSuite}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-gray-400 uppercase tracking-wider">WAKTU MENGINAP:</span>
                      <span className="font-mono text-luxury-dark font-medium">
                        {activeReservation.checkIn} s/d {activeReservation.checkOut}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans text-gray-400 uppercase tracking-wider">JUMLAH TAMU:</span>
                      <span className="font-mono text-luxury-dark font-medium">{activeReservation.guestsCount} Tamu</span>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-4 border-t border-luxury-gold/10">
                      <span className="font-sans text-gray-500 uppercase tracking-wider font-semibold">ESTIMASI TOTAL:</span>
                      <span className="font-serif text-lg text-luxury-gold font-semibold">${activeReservation.totalPrice} USD</span>
                    </div>
                  </div>

                  <div className="bg-luxury-sand p-4 text-[11px] text-gray-500 space-y-2 leading-relaxed">
                    <div className="flex items-start">
                      <ShieldCheck size={14} className="text-luxury-gold mt-0.5 mr-2 shrink-0" />
                      <p>
                        Email konfirmasi reservasi sementara telah disiapkan untuk dikirim ke: <em>{activeReservation.email}</em>.
                      </p>
                    </div>
                    <p>
                      Tim butler kami di Tomohon akan segera menyusun dokumen konfirmasi perjalanan, penjemputan bandara Sam Ratulangi, dan aktivitas alam terdekat.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-between space-x-4">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex-1 py-2.5 border border-luxury-gold/20 text-luxury-dark hover:border-luxury-gold font-sans text-[10px] tracking-widest uppercase transition-colors"
                    >
                      {showHistory ? 'Sembunyikan' : 'Riwayat Pemesanan'}
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(activeReservation.id)}
                      className="p-2.5 text-rose-400 hover:text-rose-600 border border-transparent hover:border-rose-100 transition-colors"
                      title="Batalkan pengajuan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-luxury-dark p-8 md:p-10 text-luxury-cream space-y-6 flex flex-col justify-between h-full border border-white/5">
                  <div className="space-y-4">
                    <span className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase block">
                      BUTLER MANUAL
                    </span>
                    <h3 className="font-serif text-2xl font-light text-white leading-snug">
                      Perjalanan Anda menuju tenangnya Wailan dirancang istimewa.
                    </h3>
                    <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                      Lengkapi tanggal rencana menginap Anda, sistem kami akan menyajikan kalkulasi estimasi akomodasi secara otomatis dengan kontribusi pelestarian kawasan bunga Tomohon.
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex items-center space-x-3 text-xs text-gray-300">
                      <CheckCircle2 size={14} className="text-luxury-gold" />
                      <span>Antar-jemput bandara gratis dari bandara Sam Ratulangi Manado</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-300">
                      <CheckCircle2 size={14} className="text-luxury-gold" />
                      <span>Menu sarapan organik khas daerah & sajian air pegunungan alami</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-300">
                      <CheckCircle2 size={14} className="text-luxury-gold" />
                      <span>Tur pendakian berpemandu pribadi ke kawah Gunung Lokon saat fajar</span>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* List Drawer of previous submissions if history is turned on */}
            <AnimatePresence>
              {showHistory && allReservations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-luxury-cream p-6 border border-luxury-gold/15 space-y-4 shadow-md max-h-[300px] overflow-y-auto"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-luxury-gold/5">
                    <span className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">
                      YOUR LOGGED INQUIRIES ({allReservations.length})
                    </span>
                  </div>
                  <div className="space-y-3">
                    {allReservations.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => setActiveReservation(res)}
                        className={`p-3 border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                          activeReservation?.id === res.id 
                            ? 'border-luxury-gold bg-luxury-sand/30' 
                            : 'border-luxury-gold/10 hover:border-luxury-gold/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-[10px] font-semibold text-luxury-dark">{res.id}</span>
                            <span className="font-sans text-[10px] text-gray-400">· {res.createdAt}</span>
                          </div>
                          <p className="font-serif text-xs text-gray-700 mt-1">{res.villaSuite}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xs font-semibold text-luxury-gold">${res.totalPrice}</p>
                          <span className="inline-block font-mono text-[8px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-none uppercase tracking-widest mt-1">
                            {res.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Core Interactive Inquiry Form (Right on desktop) */}
          <div className="lg:col-span-7 bg-luxury-cream p-8 md:p-12 shadow-md luxury-border order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Suite Selection Segment */}
              <div className="space-y-4">
                <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block">
                  Langkah 1: Pilih Dimensi Ruang
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'lokon', title: 'Suite Lokon', price: '$220', meta: 'Latar Gunung Indah' },
                    { key: 'steam', title: 'Suite Steam Jacuzzi', price: '$260', meta: 'Langsung ke Kolam Air Panas' },
                    { key: 'full', title: 'Full Villa Takeover', price: '$550', meta: 'Eksklusif Seluruh Area 450m²' }
                  ].map((s) => (
                    <div
                      key={s.key}
                      onClick={() => setSuiteType(s.key as any)}
                      className={`p-4 border transition-all duration-300 cursor-pointer text-left relative flex flex-col justify-between h-28 ${
                        suiteType === s.key 
                          ? 'border-luxury-gold bg-luxury-sand/45 shadow-sm' 
                          : 'border-luxury-gold/10 hover:border-luxury-gold/30 bg-luxury-cream'
                      }`}
                    >
                      <div>
                        <h4 className="font-serif text-base font-medium text-luxury-dark">{s.title}</h4>
                        <p className="font-mono text-[9.5px] text-gray-400 mt-1 uppercase tracking-wider">{s.meta}</p>
                      </div>
                      <div className="flex justify-between items-baseline mt-4">
                        <span className="font-serif text-sm font-semibold text-luxury-gold">{s.price}</span>
                        <span className="font-sans text-[10px] text-gray-400">/ malam</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkin / Checkout date parameters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-2.5">
                    Tanggal Check In
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pb-2 font-mono text-xs focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-2.5">
                    Tanggal Check Out
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pb-2 font-mono text-xs focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block mb-2.5">
                    Jumlah Tamu
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pb-2 font-sans text-xs focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option 
                        key={num} 
                        value={num} 
                        disabled={suiteType !== 'full' && num > 2}
                        className="bg-luxury-cream text-luxury-dark"
                      >
                        {num} Tamu {suiteType !== 'full' && num > 2 ? '(butuh Seluruh Vila)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal details */}
              <div className="space-y-6 pt-4 border-t border-luxury-gold/10">
                <label className="font-mono text-[10px] text-luxury-gold tracking-widest uppercase block">
                  Langkah 2: Data Diri Tamu
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <span className="absolute left-0 bottom-2 text-luxury-gold">
                      <User size={14} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap Anda"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pl-6 pb-2 font-sans text-xs focus:outline-none placeholder-gray-400"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute left-0 bottom-2 text-luxury-gold">
                      <Mail size={14} />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Alamat Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pl-6 pb-2 font-sans text-xs focus:outline-none placeholder-gray-400"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute left-0 bottom-2 text-luxury-gold">
                      <Phone size={14} />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="No. Handphone / WhatsApp"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-luxury-gold/25 focus:border-luxury-gold pl-6 pb-2 font-sans text-xs focus:outline-none placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-gray-400 tracking-wider uppercase">
                    Instruksi Khusus untuk Butler / Menu Makanan / Penjemputan
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Butuh penjemputan bandara, penyediaan makanan gluten-free, matras yoga khusus..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent border border-luxury-gold/15 focus:border-luxury-gold/60 p-3 font-sans text-xs focus:outline-none placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              {/* Estimate Breakdown Sheet */}
              <div className="bg-luxury-sand/50 p-6 md:p-8 space-y-4">
                <h4 className="font-mono text-[9.5px] text-luxury-gold tracking-[0.15em] uppercase border-b border-luxury-gold/10 pb-2">
                  Estimasi Ringkasan Finansial
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Tarif Dasar ({nights} malam):</span>
                    <span>${basePrice} USD</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>10% Pajak Pariwisata Lokal & Kontribusi Butler:</span>
                    <span>${tax} USD</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Layanan Antar-Jemput Bandara Sam Ratulangi Manado:</span>
                    <span className="text-emerald-700 font-medium">GRATIS</span>
                  </div>
                  <div className="flex justify-between text-luxury-dark font-medium pt-3 border-t border-luxury-gold/10">
                    <span className="font-serif text-sm">Biaya yang Dibayar saat Check-in & Masuk Vila:</span>
                    <span className="font-serif text-base text-luxury-gold-dark font-semibold">
                      ${totalPrice} USD
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-luxury-dark hover:bg-luxury-gold text-white font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300 font-semibold text-center"
              >
                Kirim Permohonan Reservasi
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
