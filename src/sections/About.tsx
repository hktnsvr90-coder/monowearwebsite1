import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hakkimizda"
      ref={sectionRef}
      className="py-24 px-6 md:px-16"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sol Taraf: Metin */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-8">
              Dijital Baskıda <br />
              <span className="text-[#FF3B5C]">Profesyonel</span> Çözümler
            </h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
              Mono Wear olarak kalite ve güvenin adresi olma hedefiyle yola çıktık. 
              En modern tekniklerle hayallerinizi tişörtlere, kupalara ve anılarınıza büyük bir özenle işliyoruz.
            </p>
          </div>

          {/* Sağ Taraf: İstatistikler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="stat-item p-8 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="text-4xl font-bold text-[#1A1A1A] mb-2">5K+</div>
              <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold">
                Mutlu Müşteri
              </div>
            </div>

            <div className="stat-item p-8 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="text-4xl font-bold text-[#1A1A1A] mb-2">10K+</div>
              <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold">
                Baskılı Ürün
              </div>
            </div>

            <div className="stat-item p-8 border border-gray-100 rounded-2xl bg-gray-50/50 sm:col-span-2">
              <div className="text-4xl font-bold text-[#1A1A1A] mb-2">%100</div>
              <div className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold">
                Müşteri Memnuniyeti Odaklı Çalışma
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
