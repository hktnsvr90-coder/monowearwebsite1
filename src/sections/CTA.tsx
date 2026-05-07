import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.cta-heading', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.cta-subtext', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="siparis"
      ref={sectionRef}
      style={{
        background: '#FF3B5C',
        padding: '100px clamp(24px, 5vw, 64px)',
        textAlign: 'center',
      }}
    >
      <h2
        className="cta-heading font-serif"
        style={{
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        Kendi Tarzını Oluştur
      </h2>
      <p
        className="cta-subtext font-sans"
        style={{
          fontWeight: 400,
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.6,
          maxWidth: '560px',
          margin: '24px auto 0',
        }}
      >
        Tasarımını yükle, biz en kaliteli şekilde basalım ve kapına kadar teslim edelim.
      </p>
      <button
        className="cta-button font-sans"
        data-cursor="expand"
        aria-label="Sipariş vermek için tıklayın"
        style={{
          background: '#1A1A1A',
          color: '#F5F3EE',
          padding: '18px 48px',
          borderRadius: 0,
          fontWeight: 500,
          fontSize: '0.85rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: '40px',
          border: 'none',
          cursor: 'none',
          transition: 'background 0.4s ease, color 0.4s ease',
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.background = '#F5F3EE';
          btn.style.color = '#1A1A1A';
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.background = '#1A1A1A';
          btn.style.color = '#F5F3EE';
        }}
      >
        Sipariş Ver
      </button>
    </section>
  );
}
