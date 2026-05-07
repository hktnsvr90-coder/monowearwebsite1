import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Tişört baskısı harika çıktı. Renkler canlı, kumaş kalitesi mükemmel. Arkadaşlarıma da öneriyorum.',
    name: 'Ayşe K.',
    location: 'İstanbul',
  },
  {
    quote: 'Eşime doğum gününde baskılı kupa hediye ettim. Çok beğendi! Paketleme de çok özenliydi.',
    name: 'Mehmet T.',
    location: 'Ankara',
  },
  {
    quote: 'Düğün fotoğraflarımızı albümlük baskı olarak yaptırdık. Kalite çok iyi, teslimat da hızlıydı.',
    name: 'Zeynep \u0026 Can',
    location: 'İzmir',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-label', {
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

      gsap.from('.testimonials-heading', {
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

      gsap.from('.testimonial-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
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
      id="yorumlar"
      ref={sectionRef}
      style={{
        background: '#F5F3EE',
        padding: '120px clamp(24px, 5vw, 64px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p
          className="testimonials-label font-sans"
          style={{
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            marginBottom: '24px',
          }}
        >
          MÜŞTERİ YORUMLARI
        </p>
        <h2
          className="testimonials-heading font-serif"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#1A1A1A',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            marginBottom: '80px',
          }}
        >
          Mutlu Müşterilerimiz
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '32px' }}
        >
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card" style={{ position: 'relative' }}>
              <TiltCard
                style={{
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '40px 32px',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '2px',
                    height: '24px',
                    background: '#FF3B5C',
                    marginBottom: '20px',
                  }}
                />
                <p
                  className="font-sans"
                  style={{
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#1A1A1A',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    color: '#1A1A1A',
                    letterSpacing: '0.02em',
                  }}
                >
                  {t.name}
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    color: '#6B6B6B',
                  }}
                >
                  {t.location}
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
