import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react'; // Ensure lucide-react is installed

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
        stagger: 0.08,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="iletisim"
      ref={footerRef}
      style={{
        background: '#1A1A1A',
        padding: '80px clamp(24px, 5vw, 64px) 40px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '40px' }}
        >
          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <p
              className="font-sans"
              style={{
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#F5F3EE',
              }}
            >
              MONOWEAR BASKI EVİ
            </p>
            <p
              className="font-sans"
              style={{
                fontWeight: 400,
                fontSize: '0.85rem',
                color: '#6B6B6B',
                marginTop: '8px',
              }}
            >
              Kişiye özel baskı ürünleri
            </p>
          </div>

          <div className="footer-col">
            <p
              className="font-sans"
              style={{
                fontWeight: 500,
                fontSize: '0.75rem',
                color: '#F5F3EE',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Sayfalar
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Ana Sayfa', 'Ürünler', 'Hakkımızda', 'İletişim'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="font-sans"
                    data-cursor="expand"
                    style={{
                      fontWeight: 400,
                      fontSize: '0.85rem',
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#F5F3EE';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#6B6B6B';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p
              className="font-sans"
              style={{
                fontWeight: 500,
                fontSize: '0.75rem',
                color: '#F5F3EE',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Ürünler
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Kişiye Özel Tişört', 'Baskılı Kupa', 'Fotoğraf Baskısı'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a
                    href="#urunler"
                    className="font-sans"
                    data-cursor="expand"
                    style={{
                      fontWeight: 400,
                      fontSize: '0.85rem',
                      color: '#6B6B6B',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#F5F3EE';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#6B6B6B';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <p
              className="font-sans"
              style={{
                fontWeight: 500,
                fontSize: '0.75rem',
                color: '#F5F3EE',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              İletişim
            </p>
            <a
              href="mailto:monowearstudiobusiness@gmail.com"
              className="font-sans"
              data-cursor="expand"
              style={{
                fontWeight: 400,
                fontSize: '0.85rem',
                color: '#6B6B6B',
                textDecoration: 'none',
                transition: 'color 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#F5F3EE';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#6B6B6B';
              }}
            >
              BİZE E-MAIL ÜZERİNDEN ULAŞMAK İÇİN TIKLA!
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: '60px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            className="font-sans"
            style={{
              fontWeight: 400,
              fontSize: '0.75rem',
              color: '#6B6B6B',
            }}
          >
            © 2026 MONOWEAR BASKI EVİ. Tüm hakları saklıdır.
          </p>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/monowearstudio/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="expand"
              aria-label="Instagram"
              className="flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#6B6B6B',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#FF3B5C';
                el.style.color = '#F5F3EE';
                el.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255,255,255,0.15)';
                el.style.color = '#6B6B6B';
                el.style.transform = 'scale(1)';
              }}
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
