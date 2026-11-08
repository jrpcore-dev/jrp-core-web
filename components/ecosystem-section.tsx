"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Headset,
  Layers3,
  ShoppingBag,
  Smartphone,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const supportSteps = [
  "Configuración del sistema",
  "Capacitación del equipo",
  "Acompañamiento continuo",
];

function ProductsVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const bars = [35, 49, 40, 66, 54, 82, 68, 92, 75];
  return (
    <div className="relative mt-7 rounded-[1.35rem] border border-white/75 bg-white/75 p-4 shadow-[0_20px_48px_-28px_oklch(0.2_0.06_258/0.28)] backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
            <ShoppingBag aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Productos propios</p>
            <p className="text-[10px] text-muted-foreground">Listos para operar</p>
          </div>
        </div>
        <span className="rounded-full border border-success/15 bg-success/10 px-2.5 py-1 text-[9px] font-semibold text-success">En uso</span>
      </div>

      <div className="mt-4 flex h-[5.5rem] items-end gap-1.5 rounded-xl bg-gradient-to-b from-brand-soft/45 to-transparent px-3 pb-2 sm:h-24 sm:gap-2">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            initial={reduceMotion ? false : { height: 0 }}
            whileInView={{ height: `${height}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.045, ease: [0.22, 1, 0.36, 1] }}
            className={`flex-1 rounded-t-[4px] ${index === bars.length - 1 ? "bg-brand" : "bg-brand/30"}`}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2.5 rounded-xl border border-border/55 bg-background/85 p-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
            <ShoppingBag aria-hidden="true" className="size-3.5" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold text-foreground">Vendia</span>
            <span className="block text-[9px] text-muted-foreground">Punto de venta</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-border/55 bg-background/85 p-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Workflow aria-hidden="true" className="size-3.5" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold text-foreground">Barbería</span>
            <span className="block text-[9px] text-muted-foreground">Agenda y operación</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomSoftwareVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const lines = [
    { indent: "w-[38%]", color: "bg-brand/80" },
    { indent: "ml-4 w-[68%]", color: "bg-emerald-600/75" },
    { indent: "ml-4 w-[54%]", color: "bg-amber-600/75" },
    { indent: "ml-4 w-[74%]", color: "bg-brand/65" },
    { indent: "w-[22%]", color: "bg-foreground/35" },
  ];
  return (
    <div className="relative mt-6 pb-7">
      <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950 shadow-[0_24px_55px_-28px_oklch(0.13_0.04_258/0.6)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-rose-400/85" />
          <span className="size-2 rounded-full bg-amber-300/85" />
          <span className="size-2 rounded-full bg-emerald-400/85" />
          <span className="ml-2 font-mono text-[9px] text-white/45">sistema / procesos.ts</span>
          <span className="ml-auto rounded-full bg-white/10 px-2 py-1 text-[8px] text-sky-200">a tu medida</span>
        </div>
        <div className="space-y-3 p-4 sm:p-5">
          <p className="font-mono text-[9px] text-white/40">Diseñamos para tu operación</p>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.07 }}
              className={`h-2 rounded-full ${line.indent} ${line.color}`}
            />
          ))}
          <div className="flex items-center gap-2 pt-1 text-[9px] text-white/55">
            <Code2 aria-hidden="true" className="size-3.5 text-sky-300" />
            Web · móvil · integraciones
          </div>
        </div>
      </div>
      <div className="absolute -bottom-1 right-3 w-[88px] rotate-[5deg] rounded-[14px] border border-white/90 bg-white p-2 shadow-[0_15px_30px_-16px_oklch(0.15_0.04_258/0.5)] sm:right-5">
        <span className="mx-auto block h-1 w-5 rounded-full bg-border" />
        <div className="mt-2 flex gap-1">
          <span className="h-7 flex-1 rounded-md bg-brand-soft" />
          <span className="h-7 flex-1 rounded-md bg-accent" />
        </div>
        <div className="mt-1.5 h-1 w-4/5 rounded-full bg-border" />
      </div>
    </div>
  );
}

function SupportVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="mt-6 rounded-[1.35rem] border border-white/75 bg-white/80 p-4 shadow-[0_20px_48px_-28px_oklch(0.2_0.06_258/0.25)] backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Puesta en marcha</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[9px] font-semibold text-success">
          <span className="size-1.5 rounded-full bg-success" />
          En equipo
        </span>
      </div>
      <div className="relative mt-4 space-y-3">
        <span aria-hidden="true" className="absolute bottom-4 left-[9px] top-4 w-px bg-brand/15" />
        {supportSteps.map((step, index) => (
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.1 }}
            className="relative flex items-center gap-2.5"
          >
            <span className="z-10 flex size-[19px] shrink-0 items-center justify-center rounded-full border border-brand/15 bg-brand-soft text-brand">
              <Check aria-hidden="true" className="size-3" strokeWidth={2.8} />
            </span>
            <span className="text-[11px] font-medium text-foreground">{step}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-brand-soft/55 px-3 py-2.5">
        <div className="flex items-center justify-between text-[9px] font-medium text-brand-strong">
          <span>Personas, procesos y tecnología</span>
          <Headset aria-hidden="true" className="size-3.5" />
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-brand/10">
          <motion.span
            initial={reduceMotion ? false : { width: "0%" }}
            whileInView={{ width: "78%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full rounded-full bg-brand/65"
          />
        </div>
      </div>
    </div>
  );
}

const cardBase =
  "group relative flex flex-col overflow-hidden rounded-[1.8rem] border p-6 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_oklch(0.19_0.06_258/0.25)] sm:rounded-[2rem] sm:p-8";

export function EcosystemSection() {
  const shouldReduceMotion = useReducedMotion() === true;
  const reveal = (index: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.55,
      delay: shouldReduceMotion ? 0 : index * 0.07,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section id="ecosistema" aria-labelledby="ecosystem-title" className="relative isolate overflow-hidden bg-background px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_48%_0%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent_62%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-brand/60" />
              El ecosistema JRP Core
            </span>
            <h2 id="ecosystem-title" className="mt-4 max-w-2xl text-balance text-[clamp(2rem,4vw,3.15rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-foreground">
              Una empresa, varias formas de resolver tu operación.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Combinamos productos propios, desarrollo y acompañamiento para que la tecnología encaje con el trabajo real de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <motion.article
            {...reveal(0)}
            className={`${cardBase} border-brand/15 bg-gradient-to-br from-brand-soft/75 via-sky-50/80 to-white lg:col-span-7`}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-strong">
              <ShoppingBag aria-hidden="true" className="size-3.5" />
              Productos propios
            </span>
            <h3 className="mt-3 max-w-md text-balance text-[clamp(1.6rem,2.8vw,2.25rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground">
              Sistemas listos para acompañar tu operación.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Vendia y nuestro sistema para barberías organizan caja, inventario, citas y comisiones desde herramientas listas para usar.
            </p>
            <ProductsVisual reduceMotion={shouldReduceMotion} />
          </motion.article>

          <motion.article
            {...reveal(1)}
            className={`${cardBase} border-emerald-700/10 bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 lg:col-span-5`}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-800">
              <Code2 aria-hidden="true" className="size-3.5" />
              Desarrollo a medida
            </span>
            <h3 className="mt-3 text-balance text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-foreground">
              El software exacto que{" "}
              <span className="text-brand">tu operación necesita.</span>
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Diseñamos experiencias web y móvil, sistemas internos y APIs alrededor de tus procesos, no al revés.
            </p>
            <CustomSoftwareVisual reduceMotion={shouldReduceMotion} />
          </motion.article>

          <motion.article
            {...reveal(2)}
            className={`${cardBase} border-sky-700/10 bg-gradient-to-br from-sky-50 via-white to-blue-50/80 lg:col-span-5`}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-800">
              <Headset aria-hidden="true" className="size-3.5" />
              Implementación y soporte
            </span>
            <h3 className="mt-3 text-balance text-[clamp(1.6rem,2.8vw,2.25rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground">
              Te acompañamos después del lanzamiento.
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Ayudamos a poner el sistema en marcha, capacitar al equipo y seguir afinándolo con el uso.
            </p>
            <SupportVisual reduceMotion={shouldReduceMotion} />
          </motion.article>

          <motion.article
            {...reveal(3)}
            className={`${cardBase} border-slate-900/10 bg-slate-950 text-white shadow-[0_28px_70px_-36px_oklch(0.13_0.04_258/0.55)] hover:shadow-[0_34px_78px_-34px_oklch(0.13_0.04_258/0.65)] lg:col-span-7`}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-brand/35 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-1/3 size-56 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-200">
                <BarChart3 aria-hidden="true" className="size-3.5" />
                Una empresa completa
              </span>
              <h3 className="mt-3 max-w-lg text-balance text-[clamp(1.6rem,2.8vw,2.25rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-white">
                ¿Tu operación necesita algo distinto?
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/65">
                Construimos la solución contigo y te acompañamos desde la idea hasta su puesta en marcha.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-4">
                {[
                  { icon: Code2, label: "A tu medida" },
                  { icon: Layers3, label: "Productos propios" },
                  { icon: Smartphone, label: "Web y móvil" },
                  { icon: Headset, label: "Acompañamiento" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="size-4 shrink-0 text-sky-200" />
                    <span className="text-[10px] leading-snug text-white/65">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios."
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-slate-950 shadow-[0_8px_22px_-12px_white] transition-all hover:-translate-y-0.5 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Hablemos de tu proyecto
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-200/90">
                  Soluciones para tu operación
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
