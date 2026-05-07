import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Kişiye Özel Tişört',
    description: 'Pamuklu kumaş üzerine yüksek kaliteli dijital baskı. Kendi tasarımını yükle, biz basalım.',
    image: '/img-3.jpg',
    alt: 'Baskılı tişört — pembe renkli özel desenli',
  },
  {
    name: 'Baskılı Kupa',
    description: 'Porselen kupaya fotoğraf veya mesaj baskısı. Kahve keyfine kişisel dokunuş.',
    image: '/img-4.jpg',
    alt: 'Baskılı porselen kupa — ahşap masada',
  },
  {
    name: 'Albümlük Fotoğraf Baskısı',
    description: 'Anılarınızı kaliteli fotoğraf kağıdına özel boyutlarda basalım.',
    image: '/img-5.jpg',
    alt: 'Elde tutulan fotoğraf baskıları — manzara ve portreler',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.from('.products-label', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.products-heading', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.product-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="urunler"
      ref={sectionRef}
      style={{
        background: '#F5F3EE',
        padding: '120px clamp(24px, 5vw, 64px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p
          className="products-label font-sans"
          style={{
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            marginBottom: '24px',
          }}
        >
          ÜRÜNLERİMİZ
        </p>
        <h2
          className="products-heading font-serif"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '80px',
          }}
        >
          Tasarlamını Seç, Baskıya Başlayalım
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '32px' }}
        >
          {products.map((product) => (
            <div key={product.name} className="product-card" style={{ position: 'relative' }}>
              <TiltCard
                style={{
                  borderRadius: '4px',
                  border: '1px solid rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                }}
              >
                <div style={{ overflow: 'hidden', borderRadius: '4px 4px 0 0' }}>
                  <img
                    src={product.image}
                    alt={product.alt}
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                    }}
                  />
                </div>
                <div style={{ padding: '16px 20px 24px' }}>
                  <h3
                    className="font-sans"
                    style={{
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      color: '#1A1A1A',
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="font-sans"
                    style={{
                      fontWeight: 400,
                      fontSize: '0.9rem',
                      color: '#6B6B6B',
                      marginTop: '6px',
                      lineHeight: 1.5,
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
