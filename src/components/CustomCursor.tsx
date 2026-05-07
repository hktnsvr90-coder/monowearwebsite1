import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="expand"]')
      ) {
        isHoveringRef.current = true;
        cursor.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="expand"]')
      ) {
        isHoveringRef.current = false;
        cursor.classList.remove('cursor-hover');
      }
    };

    let rafId: number;
    const animate = () => {
      const { current } = posRef;
      current.x += (current.targetX - current.x) * 0.08;
      current.y += (current.targetY - current.y) * 0.08;

      const size = isHoveringRef.current ? 40 : 8;
      cursor.style.transform = `translate(${current.x - size / 2}px, ${current.y - size / 2}px)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if ('ontouchstart' in window) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        border: '1.5px solid #1A1A1A',
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease',
      }}
      className="custom-cursor"
    />
  );
}
