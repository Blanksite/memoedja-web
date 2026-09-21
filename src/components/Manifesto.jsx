import React, { useEffect, useRef, useState } from 'react';

/*
 * Manifesto — The Brand's Poetic Statement
 * 
 * A single powerful sentence on a clean white canvas.
 * Fades in softly on scroll. Sets the philosophical tone
 * before the gallery begins.
 */
export default function Manifesto() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-[#FFFFFF] flex items-center justify-center py-28 md:py-40 px-8"
    >
      <div
        className={`max-w-3xl text-center transition-all duration-[1500ms] ease-out ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Small Eyebrow */}
        <span className="block text-[9px] tracking-[0.4em] uppercase text-[#999999] mb-8 font-sans">
          Tarombo Collection — Drop 01
        </span>

        {/* The Manifesto Line */}
        <h2 className="font-serif italic text-2xl md:text-[2.5rem] lg:text-[3rem] leading-[1.35] font-light text-[#1A1A1A] tracking-wide">
          Not bringing back the past.
          <br />
          <span className="text-[#555555]">
            Bringing back the feeling
            <br className="hidden md:inline" /> of knowing it.
          </span>
        </h2>

        {/* Thin Decorative Line */}
        <div className="mt-10 mx-auto w-12 h-px bg-[#D0D0D0]" />
      </div>
    </section>
  );
}
