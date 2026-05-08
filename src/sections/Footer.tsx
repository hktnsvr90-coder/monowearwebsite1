import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.from('.footer-col', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="iletisim"
      ref={footerRef}
      className="w-full pb-20 px-6 md:px-16"
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E5E5E5',
        paddingTop: '40px', // Üst boşluğu azalttık (Butonu yukarı çektik)
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* TEK WHATSAPP SİPARİŞ BUTONU */}
        <div className="flex justify-center mb-16 footer-col">
          <a 
            href="https://wa.me/905525767284?text=Merhaba,%20sipariş%20vermek%20istiyorum." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1A1A1A] text-white px-10 py-5 font-bold tracking-widest hover:bg-[#25D366] transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <MessageCircle size={22} />
            SİPARİŞ VER
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Column */}
          <div className="footer-col">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
              MONO WEAR
            </h3>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs">
              Kişiye özel baskı ile tarzınızı yansıtıyoruz. 
              Tişört, kupa ve fotoğraf baskısında kalite.
            </p>
          </div>

          {/* Social & Contact Column */}
          <div className="footer-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#1A1A1A] mb-6">
              BİZE ULAŞIN
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.instagram.com/monowearstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#1A1A1A] hover:text-[#FF3B5C] transition-all group"
              >
                <div className="p-2 rounded-full border border-gray-200 group-hover:border-[#FF3B5C]">
                  <Instagram size={20} />
                </div>
                <span className="font-medium text-sm">@monowearstudio</span>
              </a>

              <a
                href="mailto:monowearstudiobusiness@gmail.com"
                className="flex items-center gap-3 text-[#1A1A1A] hover:text-blue-500 transition-all group"
              >
                <div className="p-2 rounded-full border border-gray-200 group-hover:border-blue-500">
                  <Mail size={20} />
                </div>
                <span className="font-medium text-sm text-wrap">Email Gönder</span>
              </a>
            </div>
          </div>

          {/* Location Column */}
          <div className="footer-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#1A1A1A] mb-6">
              LOKASYON
            </h4>
            <div className="flex items-start gap-3 text-[#6B6B6B]">
              <MapPin size={20} className="shrink-0" />
              <p className="text-sm">
                Kağıthane, İstanbul<br />
                Türkiye
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2026 MONO WEAR. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-black">Gizlilik Politikası</a>
            <a href="#" className="hover:text-black">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
