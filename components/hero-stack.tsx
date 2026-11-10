"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check, Code2, Database, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

/*
 * Concept: "del código a tu operación".
 * Three isometric layers — code → data/API → the system your team uses.
 * Every cycle a language writes code on the base, a build pulse rises through
 * the layers, a data row lights up and the interface updates.
 */

/* Plane geometry (px, un-rotated plane) */
const S = 240; // layer size
const R = 30; // layer radius
const HALF_DIAGONAL = (S * Math.SQRT2) / 2; // horizontal reach of a layer's vertex on screen
const LIFT = Math.sin((57 * Math.PI) / 180); // screen pixels per px of translateZ

const Z = { code: 0, data: 120, ui: 236 } as const;

/* Timeline (one cycle per language) */
const PHASE_MS = 600;
const PHASES = 7; // 0-2 typing · 3 data row · 5-6 UI updated
const PULSE_DELAY = 1.2; // s after cycle start
const PULSE_DURATION = 1.6;

const easeOut = [0.22, 1, 0.36, 1] as const;

type Token = readonly [text: string, kind: "k" | "f" | "v" | "s" | "p"];

const tokenColor: Record<Token[1], string> = {
  k: "text-[#7cc4ff]",
  f: "text-amber-200",
  v: "text-white/90",
  s: "text-emerald-300",
  p: "text-white/55",
};

const languages: {
  key: string;
  name: string;
  file: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color: string;
  lines: readonly (readonly Token[])[];
}[] = [
  {
    key: "ts",
    name: "TypeScript",
    file: "venta.ts",
    icon: SiTypescript,
    color: "#3178C6",
    lines: [
      [["const ", "k"], ["venta ", "v"], ["= ", "p"], ["await ", "k"], ["pos.cobrar", "f"], ["()", "p"]],
      [["inventario", "v"], [".descontar", "f"], ["(venta)", "p"]],
      [["avisar", "f"], ["(", "p"], ["'Venta lista'", "s"], [")", "p"]],
    ],
  },
  {
    key: "py",
    name: "Python",
    file: "avisos.py",
    icon: SiPython,
    color: "#3776AB",
    lines: [
      [["def ", "k"], ["avisar", "f"], ["(cliente):", "p"]],
      [["  enviar", "f"], ["(cliente.tel)", "p"]],
      [["  return ", "k"], ["True", "v"]],
    ],
  },
  {
    key: "sql",
    name: "SQL",
    file: "reporte.sql",
    icon: SiPostgresql,
    color: "#4169E1",
    lines: [
      [["SELECT ", "k"], ["producto, stock", "v"]],
      [["FROM ", "k"], ["inventario", "v"]],
      [["WHERE ", "k"], ["stock < ", "p"], ["5", "s"]],
    ],
  },
];

/* Floating language badges (screen-aligned, always readable) */
const badges = [
  { key: "py", label: "Python", icon: SiPython, color: "#3776AB", className: "left-[3%] top-[7%]" },
  { key: "ts", label: "TypeScript", icon: SiTypescript, color: "#3178C6", className: "left-[0%] top-[33%] lg:left-[-9%]" },
  { key: "react", label: "React", icon: SiReact, color: "#149ECA", className: "left-[34%] top-[0%]" },
  { key: "sql", label: "SQL", icon: SiPostgresql, color: "#4169E1", className: "left-[2%] top-[60%] lg:left-[-7%]" },
  { key: "node", label: "Node.js", icon: SiNodedotjs, color: "#5FA04E", className: "left-[64%] top-[7%]" },
] as const;

/* ------------------------------------------------------------------ */

function useTicker(intervalMs: number, running: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, running]);
  return tick;
}

/** Rounded tile with fake thickness: stacked copies below the face. */
function Slab({
  thickness,
  faceClassName,
  edgeClassName,
  children,
}: {
  thickness: number;
  faceClassName: string;
  edgeClassName: string;
  children?: ReactNode;
}) {
  const steps = Math.max(1, Math.round(thickness / 2));
  return (
    <div className="absolute inset-0 [transform-style:preserve-3d]">
      {Array.from({ length: steps }, (_, i) => (
        <div
          key={i}
          className={`absolute inset-0 ${edgeClassName}`}
          style={{ borderRadius: R, transform: `translateZ(${-(i + 1) * 2}px)` }}
        />
      ))}
      <div className={`absolute inset-0 overflow-hidden ${faceClassName}`} style={{ borderRadius: R }}>
        {children}
      </div>
    </div>
  );
}

function Layer({ baseZ, spread, children }: { baseZ: number; spread: MotionValue<number>; children: ReactNode }) {
  const z = useTransform(spread, (v) => baseZ * v);
  const transform = useMotionTemplate`translateZ(${z}px)`;
  return (
    <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform }}>
      {children}
    </motion.div>
  );
}

/** Screen-aligned label pinned to a layer's right vertex. */
function LayerLabel({
  baseZ,
  spread,
  opacity,
  icon: Icon,
  title,
  children,
}: {
  baseZ: number;
  spread: MotionValue<number>;
  opacity: MotionValue<number>;
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  const y = useTransform(spread, (v) => -baseZ * v * LIFT);
  return (
    <motion.div
      className="absolute flex -translate-y-1/2 items-center"
      style={{ left: S / 2 + HALF_DIAGONAL - 4, top: S / 2, y, opacity }}
    >
      <span className="size-2 rounded-full border-2 border-brand bg-background" />
      <span className="h-px w-5 bg-brand/50" />
      <span className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/80 bg-background py-2 pl-2 pr-3.5 shadow-[0_14px_30px_-16px_oklch(0.2_0.07_258/0.35)]">
        <span className="flex size-8 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Icon className="size-4" />
        </span>
        <span>
          <span className="block text-[13px] font-semibold leading-tight text-foreground">{title}</span>
          <span className="block text-[11px] leading-tight text-muted-foreground">{children}</span>
        </span>
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export function HeroStack() {
  const reducedMotion = useReducedMotion() === true;

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.15 });
  const tick = useTicker(PHASE_MS, !reducedMotion && inView);
  const cycle = reducedMotion ? 0 : Math.floor(tick / PHASES);
  const phase = reducedMotion ? PHASES - 1 : tick % PHASES;
  const language = languages[cycle % languages.length];
  const LanguageIcon = language.icon;
  const typedLines = Math.min(phase + 1, language.lines.length);
  const dataLit = phase >= 3;
  const uiUpdated = phase >= 5;
  const litRow = cycle % 4;

  // Entrance: layers rise out of the code base.
  const entrance = useMotionValue(0);
  useEffect(() => {
    if (reducedMotion) {
      entrance.set(1);
      return;
    }
    const controls = animate(entrance, 1, { duration: 1.4, delay: 0.15, ease: easeOut });
    return () => controls.stop();
  }, [reducedMotion, entrance]);

  // Scroll: layers open up a bit more as the hero scrolls away.
  const { scrollY } = useScroll();
  const scrollSpread = useTransform(scrollY, [0, 520], [0, 0.35], { clamp: true });
  const spread = useTransform([entrance, scrollSpread], ([e, s]: number[]) => e * (1 + (reducedMotion ? 0 : s)));
  const labelsOpacity = useTransform(entrance, [0.6, 1], [0, 1]);

  // Build pulse: a glowing ring that travels from the code to the interface.
  const pulse = useMotionValue(0);
  useEffect(() => {
    if (reducedMotion) return;
    pulse.set(0);
    const controls = animate(pulse, 1, { duration: PULSE_DURATION, delay: PULSE_DELAY, ease: "easeInOut" });
    return () => controls.stop();
  }, [cycle, reducedMotion, pulse]);
  const pulseZ = useTransform([pulse, spread], ([p, s]: number[]) => p * Z.ui * s);
  const pulseTransform = useMotionTemplate`translateZ(${pulseZ}px)`;
  const pulseOpacity = useTransform(pulse, [0, 0.08, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`relative mx-auto h-[420px] w-full max-w-[34rem] select-none sm:h-[560px] lg:ml-auto ${inView ? "" : "hero-paused"}`}
    >
      {/* Soft glow as a gradient (no filter blur) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 top-16 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_14%,transparent),transparent)]" />

      {/* Language badges */}
      {badges.map(({ key, label, icon: Icon, color, className }, index) => {
        const isActive = key === language.key;
        return (
          <motion.div
            key={key}
            className={`absolute z-10 ${className}`}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.9 + index * 0.08, ease: easeOut }}
          >
            <div
              style={{ animationDuration: `${4 + index * 0.6}s` }}
              className={`hero-float flex items-center gap-2 rounded-full border bg-background py-1.5 pl-1.5 pr-3 shadow-[0_10px_24px_-14px_oklch(0.2_0.07_258/0.35)] transition-[scale,border-color,box-shadow] duration-300 ${
                isActive ? "scale-110 border-brand/40 ring-4 ring-brand/10" : "border-white/80"
              }`}
            >
              <span
                className="flex size-6 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}1a` }}
              >
                <Icon className="size-3.5" style={{ color }} />
              </span>
              <span className={`text-[11px] font-semibold ${isActive ? "text-foreground" : "text-foreground/70"}`}>
                {label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Scene */}
      <motion.div
        className="hero-float absolute left-[30%] top-[66%] -translate-x-1/2 -translate-y-1/2 scale-[0.62] sm:left-[38%] sm:scale-100 lg:left-[37%] lg:scale-[0.86] xl:scale-[0.92]"
        style={{ width: S, height: S, perspective: 1800, animationDuration: "6s" }}
      >
        <div
          className="relative size-full [transform-style:preserve-3d]"
          style={{ transform: "rotateX(57deg) rotateZ(-45deg)" }}
        >
          {/* Ground shadow */}
          <div className="absolute -inset-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--brand)_30%,transparent),transparent)]" style={{ transform: "translateZ(-40px)" }} />

          {/* 1 · Code */}
          <Layer baseZ={Z.code} spread={spread}>
            <Slab
              thickness={16}
              edgeClassName="bg-gradient-to-r from-[#0063FD] to-[#00C6FD]"
              faceClassName="border border-brand/60 bg-slate-950 bg-[radial-gradient(circle_at_25%_20%,oklch(0.45_0.12_255/0.4),transparent_55%)]"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 px-5 pb-2.5 pt-5">
                <span className="size-1.5 rounded-full bg-rose-400/80" />
                <span className="size-1.5 rounded-full bg-amber-300/80" />
                <span className="size-1.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono text-[10px] text-white/50">{language.file}</span>
              </div>
              <div className="space-y-2 px-5 pt-3.5 font-mono text-[11px] leading-none">
                {language.lines.map((line, index) => (
                  <motion.div
                    key={`${language.key}-${index}`}
                    initial={false}
                    animate={{ opacity: index < typedLines ? 1 : 0, x: index < typedLines ? 0 : -6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                    className="flex whitespace-pre"
                  >
                    <span className="mr-3 w-3 text-right text-white/25">{index + 1}</span>
                    {line.map(([text, kind], tokenIndex) => (
                      <span key={tokenIndex} className={tokenColor[kind]}>
                        {text}
                      </span>
                    ))}
                    {index === typedLines - 1 && !uiUpdated && !reducedMotion && (
                      <motion.span
                        className="ml-0.5 inline-block h-3 w-[5px] bg-[#7cc4ff]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              <Image
                src="/jrp-core-02-icono-color-fondo-oscuro.svg"
                alt=""
                width={44}
                height={35}
                priority
                className="absolute bottom-5 right-5 h-auto w-11 opacity-90"
              />
            </Slab>
          </Layer>

          {/* 2 · Data / API */}
          <Layer baseZ={Z.data} spread={spread}>
            <div
              className="absolute inset-0 overflow-hidden border border-brand/35 bg-white/80 p-5 shadow-[0_0_40px_-14px_color-mix(in_oklab,var(--brand)_60%,transparent)]"
              style={{ borderRadius: R }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="h-2 w-16 rounded-full bg-foreground/60" />
                <span className="h-2 w-8 rounded-full bg-brand/40" />
              </div>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((row) => {
                  const lit = dataLit && row === litRow;
                  return (
                    <div
                      key={row}
                      className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-colors duration-300 ${
                        lit ? "bg-brand/15" : "bg-foreground/[0.04]"
                      }`}
                    >
                      <span className={`size-2.5 rounded-full transition-colors duration-300 ${lit ? "bg-brand" : "bg-foreground/20"}`} />
                      <span className={`h-1.5 rounded-full transition-colors duration-300 ${lit ? "w-20 bg-brand/70" : "w-16 bg-foreground/20"}`} />
                      <span className="ml-auto h-1.5 w-8 rounded-full bg-foreground/15" />
                    </div>
                  );
                })}
              </div>
            </div>
          </Layer>

          {/* Build pulse */}
          {!reducedMotion && (
            <motion.div
              className="absolute inset-0 border-2 border-brand shadow-[0_0_30px_var(--brand),inset_0_0_24px_color-mix(in_oklab,var(--brand)_50%,transparent)]"
              style={{ borderRadius: R, transform: pulseTransform, opacity: pulseOpacity }}
            />
          )}

          {/* 3 · Interface */}
          <Layer baseZ={Z.ui} spread={spread}>
            <div
              className="absolute inset-0 overflow-hidden border border-white bg-white/90 p-5 shadow-[0_30px_60px_-30px_oklch(0.2_0.07_258/0.45)]"
              style={{ borderRadius: R }}
            >
              <div className="flex items-center justify-between">
                <span className="h-2.5 w-20 rounded-full bg-foreground/75" />
                <span
                  className={`flex h-5 items-center rounded-full px-2 transition-colors duration-300 ${
                    uiUpdated ? "bg-success/15" : "bg-foreground/[0.06]"
                  }`}
                >
                  <span className={`size-2 rounded-full transition-colors duration-300 ${uiUpdated ? "bg-success" : "bg-foreground/25"}`} />
                </span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-2 rounded-xl bg-gradient-to-b from-brand-soft/60 to-transparent px-2.5 pb-2">
                {[38, 54, 46, 68, 58].map((height, index) => (
                  <span key={index} className="flex-1 rounded-t-[4px] bg-brand/30" style={{ height: `${height}%` }} />
                ))}
                <motion.span
                  className="flex-1 rounded-t-[4px] bg-brand"
                  initial={false}
                  animate={{ height: uiUpdated ? "94%" : "30%" }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, ease: easeOut }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <span className="h-9 rounded-lg border border-foreground/10 bg-background" />
                <span
                  className={`h-9 rounded-lg transition-colors duration-300 ${uiUpdated ? "bg-success" : "bg-brand"}`}
                />
              </div>
            </div>
          </Layer>
        </div>

        {/* Readable labels, aligned to each layer */}
        <LayerLabel baseZ={Z.ui} spread={spread} opacity={labelsOpacity} icon={MonitorSmartphone} title="Tu sistema">
          {uiUpdated ? (
            <span className="inline-flex items-center gap-1 font-medium text-success">
              <Check className="size-3" strokeWidth={3} />
              Actualizado
            </span>
          ) : (
            "Web · POS · Apps"
          )}
        </LayerLabel>
        <LayerLabel baseZ={Z.data} spread={spread} opacity={labelsOpacity} icon={Database} title="Datos y APIs">
          Ventas · inventario · clientes
        </LayerLabel>
        <LayerLabel baseZ={Z.code} spread={spread} opacity={labelsOpacity} icon={Code2} title="Código a la medida">
          <span className="inline-flex items-center gap-1">
            <LanguageIcon className="size-3" style={{ color: language.color }} />
            {language.name}
          </span>
        </LayerLabel>
      </motion.div>
    </div>
  );
}
