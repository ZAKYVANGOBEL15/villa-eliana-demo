import { Compass, Mail, Phone, Instagram, MapPin } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark text-luxury-cream py-16 md:py-20 border-t border-white/5 select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Brand aspect (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="text-left">
              <p className="font-serif text-2xl tracking-[0.25em] font-medium text-white">VILLA ELIANA</p>
              <p className="font-mono text-[9px] text-luxury-gold tracking-[0.4em] uppercase mt-1">Wailan · Tomohon</p>
            </div>
            
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              Sebuah eksplorasi arsitektur tentang privasi, cahaya, dan keheningan mendalam. Dirancang khusus sebagai tempat peristirahatan mewah eksklusif yang menghadap langsung ke kawah megah Gunung Lokon di Tomohon, Sulawesi Utara.
            </p>

            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-luxury-gold transition-colors" title="Instagram">
                <Instagram size={16} />
              </a>
              <a href="mailto:concierge@villaeliana.com" className="hover:text-luxury-gold transition-colors" title="Email">
                <Mail size={16} />
              </a>
              <a href="tel:+628114400" className="hover:text-luxury-gold transition-colors" title="WhatsApp">
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick-links aspect (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase mb-4">DIREKTORI LOBI</h4>
            <div className="flex flex-col space-y-3 text-xs text-gray-400">
              {[
                { id: 'hero', label: 'Lobi Utama' },
                { id: 'about', label: 'Kisah Kami' },
                { id: 'amenities', label: 'Fasilitas Eksklusif' },
                { id: 'gallery', label: 'Galeri Interaktif' },
                { id: 'reviews', label: 'Ulasan Tamu' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onScrollTo(link.id)}
                  className="hover:text-white transition-colors duration-200 text-left cursor-pointer focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location specifications (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-[9px] text-luxury-gold tracking-widest uppercase mb-4">ATLAS DATARAN TINGGI</h4>
            
            <div className="space-y-4 text-xs text-gray-400 font-light leading-relaxed">
              <div className="flex items-start space-x-3">
                <MapPin size={14} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  Jalan Raya Wailan, Kecamatan Tomohon Utara, Kota Tomohon, Sulawesi Utara, Indonesia 95443.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <Compass size={14} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>
                  Ketinggian: 750 meter di atas permukaan laut.<br />
                  Suhu Udara: 18°C – 23°C (Iklim Pegunungan Sejuk).
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Bottom License details */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 font-mono text-[9px] tracking-wider uppercase">
          <p>© {currentYear} Villa Eliana Tomohon · Hak Cipta Dilindungi.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-luxury-gold transition-colors">Kebijakan Privasi Charter</a>
            <span>·</span>
            <a href="#" className="hover:text-luxury-gold transition-colors">Syarat & Layanan Suaka</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
