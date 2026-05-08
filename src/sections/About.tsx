import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: '+', label: 'Yıllık Tecrübe' },
  { value: 50, suffix: 'K+', label: 'Mutlu Müşteri' },
  { value: 3, suffix: '', label: 'Ürün Kategorisi' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-left', {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.about-right', {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      stats.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;

        gsap.from(el, {
          innerText: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate: function () {
            const val = Math.round(parseFloat(el.innerText || '0'));
            el.innerText = val + stat.suffix;
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hakkimizda"
      ref={sectionRef}
      style={{
        background: '#1A1A1A',
        padding: '120px clamp(24px, 5vw, 64px)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        <div className="about-left">
          <p
            className="font-sans"
            style={{
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6B6B6B',
              marginBottom: '24px',
            }}
          >
            HAKKIMIZDA
          </p>
          <h2
            className="font-serif"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#F5F3EE',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            Dijital Baskı'da takdirinize layik olmak en büyük hedefimiz!
          </h2>
          <p
            className="font-sans"
            style={{
              fontWeight: 400,
              fontSize: '1.05rem',
              color: '#9A9A9A',
              lineHeight: 1.8,
            }}
          >
            Küçük bir işletme olarak özel baskı ürünleri üretiyoruz.
            Yüksek kaliteli malzemeler, dayanıklı mürekkepler ve özenli işçilikle
            her siparişe ayrı bir özenle yaklaşıyoruz.
          </p>

          <div
            ref={statsRef}
            className="flex flex-wrap"
            style={{ marginTop: '60px', gap: '48px' }}
          >
            {stats.map((stat, index) => (
              <div key={stat.label}>
                <span
                  ref={(el) => { numberRefs.current[index] = el; }}
                  className="font-serif"
                  style={{
                    fontWeight: 700,
                    fontSize: '2.5rem',
                    color: '#FF3B5C',
                    display: 'block',
                  }}
                >
                  0{stat.suffix}
                </span>
                <span
                  className="font-sans"
                  style={{
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right">
          <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
            <img
              src="/img-6.jpg"
              alt="Türk Baskı Evi baskı stüdyosu iç mekan"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                display: 'block',
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
