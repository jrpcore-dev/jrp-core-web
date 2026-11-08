"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const lead = ["Software", "hecho"];
const tailLines = [
  ["de", "tu", "negocio,"],
  ["para", "crecer."],
];
/** Second part of the headline, relative to the fitted first line. */
const TAIL_SCALE = 0.8;
const TAIL_LEADING = 1.02;

/**
 * Hero headline. On desktop the first line ("Software hecho a la medida")
 * is sized to span the full container width; the rest sits below in the
 * left column, lighter, next to the 3D scene.
 */
export function HeroTitle() {
  const reducedMotion = useReducedMotion() === true;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [fitSize, setFitSize] = useState<number | null>(null);

  // Fit the first line to the heading width (desktop only).
  useEffect(() => {
    const heading = headingRef.current;
    const line = lineRef.current;
    if (!heading || !line) return;
    const desktop = window.matchMedia("(min-width: 1024px)");

    const measure = () => {
      const root = heading.closest<HTMLElement>("[data-hero-root]");
      if (!desktop.matches) {
        setFitSize(null);
        root?.style.removeProperty("--hero-tail-height");
        return;
      }
      const current = parseFloat(window.getComputedStyle(line).fontSize);
      const width = line.scrollWidth;
      if (!current || !width) return;
      // Text scales linearly with font-size (spacing is in em).
      const size = Math.floor(current * (heading.clientWidth / width) * 0.995 * 10) / 10;
      setFitSize(size);
      // Lets the 3D scene start exactly where the second part of the title starts.
      root?.style.setProperty("--hero-tail-height", `${size * TAIL_SCALE * TAIL_LEADING * tailLines.length}px`);
    };

    const observer = new ResizeObserver(() => measure());
    observer.observe(heading);
    desktop.addEventListener("change", measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", measure);
    };
  }, []);

  const word = (index: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: "0.35em", filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1 + index * 0.07, ease: easeOut },
  });

  return (
    <h1 ref={headingRef} id="hero-title" className="w-full text-foreground">
      <span
        ref={lineRef}
        style={fitSize ? { fontSize: fitSize } : undefined}
        className="block text-[clamp(2.9rem,12vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em] lg:w-max lg:whitespace-nowrap lg:text-[6vw]"
      >
        {lead.map((text, index) => (
          <motion.span key={text} {...word(index)} className="mr-[0.22em] inline-block">
            {text}
          </motion.span>
        ))}
        <motion.span
          {...word(lead.length)}
          className="relative inline-block whitespace-nowrap pr-[0.08em] font-accent text-[1.1em] font-normal italic leading-[0.9] tracking-[-0.02em]"
        >
          <span className="bg-gradient-to-r from-[#0063FD] to-[#00B4FD] bg-clip-text text-transparent">
            a la medida
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 300 24"
            preserveAspectRatio="none"
            className="absolute -bottom-[0.12em] left-[2%] h-[0.22em] w-[96%] overflow-visible"
          >
            <motion.path
              d="M4 16 C 60 6, 120 4, 180 9 S 270 18, 296 8"
              fill="none"
              stroke="url(#hero-underline)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.75, ease: easeOut }}
            />
            <defs>
              <linearGradient id="hero-underline" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#0063FD" stopOpacity="0.45" />
                <stop offset="1" stopColor="#00C6FD" stopOpacity="0.45" />
              </linearGradient>
            </defs>
          </svg>
        </motion.span>
      </span>{" "}
      <span
        style={fitSize ? { fontSize: fitSize * TAIL_SCALE, lineHeight: TAIL_LEADING } : undefined}
        className="mt-3 block text-[clamp(2.5rem,10.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground lg:mt-4"
      >
        {tailLines.map((line, lineIndex) => {
          const offset = lead.length + 1 + tailLines.slice(0, lineIndex).flat().length;
          return (
            <span key={lineIndex} className="lg:block lg:whitespace-nowrap">
              {line.map((text, index) => (
                <motion.span key={text} {...word(offset + index)} className="mr-[0.24em] inline-block">
                  {text}
                </motion.span>
              ))}{" "}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
