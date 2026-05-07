import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4 });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
      style={{
        height: '64px',
        padding: '0 clamp(24px, 5vw, 64px)',
        background: 'rgba(245,243,238,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div
        className="font-sans"
        style={{
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: '#1A1A1A',
        }}
      >
        TÜRK BASKI EVI
      </div>
      <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
        {[
          { label: 'Ürünler', target: '#urunler' },
          { label: 'Hakkımızda', target: '#hakkimizda' },
          { label: 'Sipariş', target: '#siparis' },
          { label: 'İletişim', target: '#iletisim' },
        ].map((item) => (
          <button
            key={item.target}
            onClick={() => scrollTo(item.target)}
            className="font-sans bg-transparent border-none outline-none"
            style={{
              fontWeight: 400,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: '#1A1A1A',
              cursor: 'none',
              padding: '8px 0',
              position: 'relative',
            }}
            data-cursor="expand"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
