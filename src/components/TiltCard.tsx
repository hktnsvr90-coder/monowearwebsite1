import { useRef, useCallback, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = '', style = {} }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if ('ontouchstart' in window) return;
    const card = cardRef.current;
    const shadow = shadowRef.current;
    const container = containerRef.current;
    if (!card || !shadow || !container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const shadowX = ((x - centerX) / centerX) * -12;
    const shadowY = ((y - centerY) / centerY) * -12;
    shadow.style.transform = `translateX(${shadowX}px) translateY(${shadowY}px)`;
    shadow.style.opacity = '0.15';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if ('ontouchstart' in window) return;
    const card = cardRef.current;
    const shadow = shadowRef.current;
    if (!card || !shadow) return;
    card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    shadow.style.transform = 'translateX(0) translateY(0)';
    shadow.style.opacity = '0';
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="expand"
      style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
    >
      <div
        ref={cardRef}
        className={className}
        style={{
          transition: 'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
          transformStyle: 'preserve-3d',
          ...style,
        }}
      >
        {children}
      </div>
      <div
        ref={shadowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.08), transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
          transition: 'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.3s ease',
        }}
      />
    </div>
  );
}
