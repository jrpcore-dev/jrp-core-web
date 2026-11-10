"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Check } from "lucide-react";
import { useRef, type ReactNode } from "react";

/*
 * "Cómo trabajamos": light section with five steps. Each step shows a small
 * artifact of what actually happens at that stage. Static layout; the
 * connecting line draws once on entry and steps light up in order.
 */

const card =
  "rounded-xl bg-[#0b1120] p-3 shadow-[0_16px_32px_-20px_oklch(0.2_0.06_258/0.55)] ring-1 ring-black/5";

function ListenArtifact() {
  return (
    <div className={`${card} space-y-2 text-[11px] leading-snug`}>
      <p className="w-fit max-w-[90%] rounded-lg rounded-bl-sm bg-white/10 px-2.5 py-1.5 text-white/80">
        Pierdo horas cuadrando la caja.
      </p>
      <p className="ml-auto w-fit max-w-[90%] rounded-lg rounded-br-sm bg-brand px-2.5 py-1.5 text-white">
        Cuéntanos cómo lo haces hoy.
      </p>
    </div>
  );
}

function DesignArtifact() {
  return (
    <div className={`${card} space-y-2`}>
      <div className="h-2.5 w-2/3 rounded-sm border border-dashed border-white/30" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-9 rounded-md border border-dashed border-white/25" />
        <div className="h-9 rounded-md border border-dashed border-white/25" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-2 w-1/2 rounded-sm border border-dashed border-white/20" />
        <div className="h-4 w-12 rounded-full border border-dashed border-sky-300/70" />
      </div>
    </div>
  );
}

function BuildArtifact() {
  return (
    <div className={`${card} font-mono text-[11px]`}>
      <p className="flex items-center gap-1.5 text-white/80">
        <Check aria-hidden="true" className="size-3 text-emerald-400" strokeWidth={3} /> ventas
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-white/80">
        <Check aria-hidden="true" className="size-3 text-emerald-400" strokeWidth={3} /> inventario
      </p>
      <p className="mt-1 flex items-center gap-1.5 text-white/45">
        <span aria-hidden="true" className="size-3 rounded-full border border-dashed border-white/40" /> reportes
      </p>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-[#0063FD] to-[#00C6FD]" />
      </div>
    </div>
  );
}

function LaunchArtifact() {
  return (
    <ul className={`${card} space-y-1.5 text-[11px] text-white/80`}>
      {["Sistema configurado", "Datos cargados", "Equipo capacitado"].map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="flex size-4 shrink-0 items-center justify-center rounded bg-emerald-400/15">
            <Check aria-hidden="true" className="size-3 text-emerald-400" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SupportArtifact() {
  return (
    <div className={`${card} text-[11px] leading-snug`}>
      <p className="mb-2 flex items-center gap-1.5 text-[10px] text-white/45">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-400" />
        Soporte JRP · en línea
      </p>
      <p className="w-fit max-w-[90%] rounded-lg rounded-bl-sm bg-white/10 px-2.5 py-1.5 text-white/80">
        ¿Cómo agrego un producto?
      </p>
      <p className="ml-auto mt-1.5 w-fit max-w-[90%] rounded-lg rounded-br-sm bg-brand px-2.5 py-1.5 text-white">
        Te guiamos, ya quedó ✓
      </p>
    </div>
  );
}

const steps: { title: string; description: string; promise?: string; artifact: ReactNode }[] = [
  {
    title: "Escuchamos",
    description: "Conocemos tu operación y lo que hoy te frena.",
    artifact: <ListenArtifact />,
  },
  {
    title: "Diseñamos",
    description: "Te mostramos cómo se verá y funcionará antes de programar.",
    artifact: <DesignArtifact />,
  },
  {
    title: "Construimos",
    description: "Avances que puedes ver y probar durante el camino.",
    artifact: <BuildArtifact />,
  },
  {
    title: "Lo ponemos en marcha",
    description: "Configuramos todo y enseñamos a tu equipo a usarlo.",
    promise: "Capacitación incluida",
    artifact: <LaunchArtifact />,
  },
  {
    title: "Te acompañamos",
    description: "Ajustes y ayuda con el uso real del día a día.",
    promise: "Soporte mientras uses el sistema",
    artifact: <SupportArtifact />,
  },
];

const LINE_SECONDS = 1.1;
const easeOut = [0.22, 1, 0.36, 1] as const;

export function ProcessSection() {
  const reducedMotion = useReducedMotion() === true;
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.25 });
  const shown = reducedMotion || inView;

  const stepDelay = (index: number) => (reducedMotion ? 0 : (index / (steps.length - 1)) * LINE_SECONDS);

  return (
    <section
      id="proceso"
      aria-labelledby="process-title"
      className="relative isolate scroll-mt-16 overflow-hidden bg-background px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_35%_at_15%_35%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[13px] font-medium text-brand">
              <span aria-hidden="true" className="h-px w-8 bg-brand/60" />
              03 / cómo trabajamos
            </p>
            <h2
              id="process-title"
              className="mt-5 max-w-[20ch] text-balance text-[clamp(2.2rem,4.6vw,3.75rem)] font-bold leading-[1.03] tracking-[-0.045em] text-foreground"
            >
              Tú te enfocas en tu negocio.{" "}
              <span className="bg-gradient-to-r from-[#0063FD] to-[#00B4FD] bg-clip-text pr-[0.06em] font-accent text-[1.06em] font-normal italic tracking-[-0.02em] text-transparent">
                Nosotros, en que todo funcione.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-[15px] leading-7 text-muted-foreground">
            Un proceso claro, sin tecnicismos, en el que siempre sabes en qué paso vamos.
          </p>
        </div>

        <ol ref={listRef} className="relative mt-14 grid gap-12 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* Connecting line: horizontal on desktop, vertical on mobile */}
          <div aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-border lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-[#0063FD] to-[#00C6FD]"
              initial={reducedMotion ? false : { scaleX: 0 }}
              animate={shown ? { scaleX: 1 } : undefined}
              transition={{ duration: reducedMotion ? 0 : LINE_SECONDS, ease: easeOut }}
            />
          </div>
          <div aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-border lg:hidden">
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-[#0063FD] to-[#00C6FD]"
              initial={reducedMotion ? false : { scaleY: 0 }}
              animate={shown ? { scaleY: 1 } : undefined}
              transition={{ duration: reducedMotion ? 0 : LINE_SECONDS, ease: easeOut }}
            />
          </div>

          {steps.map(({ title, description, promise, artifact }, index) => {
            const number = String(index + 1).padStart(2, "0");
            const delay = stepDelay(index);
            return (
              <li key={title} className="relative flex gap-5 lg:block">
                {/* Marker: big serif number that lights up when the line reaches it */}
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0b1120] font-accent text-xl italic text-white/35 shadow-[0_10px_24px_-14px_oklch(0.2_0.06_258/0.7)]">
                  {number}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-[#0b1120] text-white ring-2 ring-brand shadow-[0_0_0_6px_color-mix(in_oklab,var(--brand)_14%,transparent),0_0_22px_color-mix(in_oklab,var(--brand)_45%,transparent)]"
                    initial={reducedMotion ? false : { scale: 0.4, opacity: 0 }}
                    animate={shown ? { scale: 1, opacity: 1 } : undefined}
                    transition={{ duration: reducedMotion ? 0 : 0.35, delay, ease: easeOut }}
                  >
                    {number}
                  </motion.span>
                </span>

                <motion.div
                  className="min-w-0 flex-1 pt-1 lg:pt-0"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={shown ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: reducedMotion ? 0 : 0.5, delay: delay + 0.05, ease: easeOut }}
                >
                  <div aria-hidden="true" className="lg:mt-7">
                    {artifact}
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.025em] text-foreground">{title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{description}</p>
                  {promise && (
                    <p className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-emerald-600/20 bg-emerald-50 px-2.5 py-1.5 font-mono text-[11.5px] font-medium text-emerald-700">
                      <Check aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={3} />
                      {promise}
                    </p>
                  )}
                </motion.div>
              </li>
            );
          })}
        </ol>

        {/* Bridge into the products section */}
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p className="max-w-xl text-pretty text-[15px] leading-6 text-muted-foreground">
            Además de crear a la medida,{" "}
            <span className="font-semibold text-foreground">tenemos productos propios listos para usar.</span>
          </p>
          <a
            href="#productos"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Conoce nuestros productos
            <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
