import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, Compass, CheckSquare, Clock } from 'lucide-react';
import { ConciergeMessage } from '../types';

export default function ConciergeChat() {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: 'init',
      sender: 'concierge',
      text: "Sampurasun & Salam hangat dari Tomohon. Saya adalah virtual butler pribadi Anda di Villa Eliana. Saya siap membantu Anda merencanakan pendakian gunung, ekskursi danau vulkanik, tur taman bunga krisan, atau mengatur kenyamanan ekstra di dalam suite. Apa yang bisa saya bantu Anda persiapkan hari ini?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPills = [
    { label: '🏔️ Pendakian Gunung Lokon', question: 'Bagaimana persiapan pendakian Gunung Lokon?' },
    { label: '🍵 Danau Tiga Warna Linow', question: 'Kapan waktu terbaik berkunjung ke Danau Linow?' },
    { label: '☕ Seduhan Kopi Mahawu', question: 'Bagaimana penyajian kopi Arabika di Villa?' },
    { label: '🔑 Kebijakan Check-in Vila', question: 'Bagaimana jam check-in dan kebijakan kenyamanan vila?' }
  ];

  const scrollChat = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollChat();
  }, [messages, isTyping]);

  const respondButler = (question: string) => {
    setIsTyping(true);
    let reply = "";

    const cleanQuestion = question.toLowerCase();

    if (cleanQuestion.includes('lokon') || cleanQuestion.includes('trekking') || cleanQuestion.includes('gunung')) {
      reply = "Pendakian Gunung Lokon kami selenggarakan saat fajar menyingsing. Butler pribadi Anda akan memandu perjalanan melewati rute asri mulai pukul 04:30 WITA langsung dari belakang Wailan. Kami menyediakan jaket gunung hangat, tongkat pendakian, masker kawah vulkanik premium, serta seduhan espresso hangat Toraja-Minahasa tepat di bibir kawah sembari menikmati matahari terbit.";
    } else if (cleanQuestion.includes('linow') || cleanQuestion.includes('danau') || cleanQuestion.includes('lake')) {
      reply = "Danau Linow sangat terkenal karena airnya bisa berubah warna antara hijau giok, turquoise jernih, hingga kuning belerang seiring dengan perpindahan sinar matahari. Kami menyediakan paket bersantai minum teh sore hari di dek teras tebing Linow yang nyaman, lengkap dengan hidangan Pisang Goreng Gula Aren organik. Waktu kunjungan terbaik adalah antara pukul 11:00 hingga 15:00 WITA.";
    } else if (cleanQuestion.includes('coffee') || cleanQuestion.includes('brew') || cleanQuestion.includes('kopi')) {
      reply = "Di Villa Eliana, kami memiliki fasilitas pemanggangan kopi (coffee roasting) pribadi. Kami menyajikan biji kopi Arabika single-origin yang tumbuh subur di tanah vulkanik Mahawu dan Tomohon. Setiap suite dilengkapi dengan mesin espresso manual La Marzocco. Di pagi hari, butler Anda siap meracik double-shot espresso klasik atau manual-drip langsung di dek konservatori Anda.";
    } else if (cleanQuestion.includes('policy') || cleanQuestion.includes('check') || cleanQuestion.includes('kebijakan')) {
      reply = "Waktu check-in resmi di Villa Eliana dimulai pukul 14:00 WITA, disambut dengan handuk melati hangat dan minuman madu hutan alami. Waktu check-out adalah pukul 11:00 WITA, agar tim kami memiliki waktu maksimal untuk membersihkan setiap dek batu basal dan mengkalibrasi suhu kolam air panas geotermal pribadi Anda. Check-in awal dipersilakan gratis jika suite dalam keadaan kosong.";
    } else {
      reply = "Terima kasih atas permohonan informasi Anda. Hal itu adalah salah satu detail wisata yang sangat menarik di Tomohon. Host personal Villa Eliana siap mengatur hidangan makan malam khusus, tur taman bunga krisan Tomohon, atau rute penjemputan bandara. Kami akan mengoordinasikan seluruh kebutuhan eksklusif ini dengan Anda saat panggilan konfirmasi pemesanan.";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `reply-${Math.random()}`,
          sender: 'concierge',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Math.random()}`,
        sender: 'user',
        text: userMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    respondButler(userMsg);
  };

  const selectPill = (question: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `user-pill-${Math.random()}`,
        sender: 'user',
        text: question,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    respondButler(question);
  };

  return (
    <section id="concierge" className="py-24 bg-luxury-cream border-y border-luxury-gold/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Narrative Info (Left aspect) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-luxury-gold tracking-[0.3em] uppercase block">
                Virtual Lobby
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark font-light leading-tight">
                Layanan <br />
                <span className="italic text-luxury-gold">Butler Asisten</span>
              </h2>
              <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                Berinteraksi langsung dengan asisten digital kami di bawah. Tanyakan rute pendakian kawah gunung, kondisi udara sejuk, atau koordinasikan waktu check-in Anda secara instan.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-luxury-gold/20">
              <div className="flex items-start space-x-3 text-xs text-gray-600">
                <Compass className="text-luxury-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-luxury-dark">Kurasi Ekskursi Alam</p>
                  <p className="font-light mt-0.5">Petualangan alam bebas yang dipandu oleh pemandu tersertifikasi lokal.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs text-gray-600">
                <Clock className="text-luxury-gold shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-luxury-dark">Informasi Cepat & Responsif</p>
                  <p className="font-light mt-0.5">Dapatkan estimasi akurat, peraturan suite, dan rekomendasi transportasi dataran tinggi.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chat Console (Right aspect) */}
          <div className="lg:col-span-8 bg-luxury-sand/30 border border-luxury-gold/15 p-6 md:p-8 shadow-sm flex flex-col h-[520px]">
            
            {/* Console Header */}
            <div className="flex items-center justify-between pb-4 border-b border-luxury-gold/10 mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-luxury-dark">Butler Digital Villa Eliana</h4>
                  <p className="font-sans text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Aktif • Saluran Dataran Tinggi Tomohon</p>
                </div>
              </div>
              <Sparkles size={16} className="text-luxury-gold" />
            </div>

            {/* Message Feed Canvas */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] p-4 text-xs font-light leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-luxury-dark text-white rounded-none border-l border-luxury-gold/40'
                      : 'bg-white text-luxury-dark rounded-none border border-luxury-gold/10 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="font-mono text-[8px] text-gray-400 mt-1 uppercase tracking-wider">
                    {msg.timestamp} · {msg.sender === 'user' ? 'Tamu' : 'Tim Butler'}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-white p-4 text-xs text-gray-400 border border-luxury-gold/10 shadow-sm flex items-center space-x-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold animate-bounce delay-100" />
                    <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold animate-bounce delay-200" />
                  </div>
                  <span className="font-mono text-[8px] text-gray-400 mt-1 uppercase tracking-wider">
                    BUTLER SEDANG MENULIS...
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick-choice recommendations */}
            <div className="mt-4 pt-4 border-t border-luxury-gold/10">
              <p className="font-mono text-[9px] text-gray-400 uppercase tracking-wider mb-2">Rekomendasi Pertanyaan</p>
              <div className="flex flex-wrap gap-2">
                {quickPills.map((pill) => (
                  <button
                    key={pill.label}
                    onClick={() => selectPill(pill.question)}
                    className="px-3 py-1.5 bg-white hover:bg-luxury-sand text-luxury-dark border border-luxury-gold/10 hover:border-luxury-gold/45 text-[10.5px] font-sans tracking-wide transition-all"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs message panel */}
            <form onSubmit={handleSend} className="mt-4 pt-4 flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik pertanyaan atau kebutuhan petualangan Anda di sini..."
                className="flex-1 bg-white border border-luxury-gold/15 focus:border-luxury-gold p-3.5 focus:outline-none text-xs font-sans placeholder-gray-400"
              />
              <button
                type="submit"
                className="p-3.5 bg-luxury-dark hover:bg-luxury-gold text-luxury-cream hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0"
              >
                <Send size={15} />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
