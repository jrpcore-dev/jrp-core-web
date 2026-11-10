"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Coffee,
  PencilRuler,
  ShoppingBasket,
  Store,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollReveal } from "@/components/product-page-shared";
import { VendiaHardware } from "@/components/vendia-hardware";
import { VendiaTerminal } from "@/components/vendia-terminal";
import { VENDIA_FEATURES } from "@/lib/product-features";

/*
 * Vendia product page in the site's identity. No "text left / image right"
 * splits: centered hero with a wide app window, feature cards with small live
 * frames of the system, an exploded hardware view, how to start and FAQ.
 *
 * Real captures live in public/vendia/ (webp).
 */

const easeOut = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-3 font-mono text-[13px] font-medium text-brand">
      <span aria-hidden="true" className="h-px w-8 bg-brand/60" />
      {children}
    </p>
  );
}

/** Desktop app window chrome (Vendia is an installable app). */
function AppWindow({ title, children, compact = false }: { title: string; children: ReactNode; compact?: boolean }) {
  return (
    <div
      className={`overflow-hidden border border-border bg-white ${
        compact
          ? "rounded-xl shadow-[0_14px_30px_-22px_oklch(0.2_0.06_258/0.45)]"
          : "rounded-2xl shadow-[0_1px_2px_oklch(0.2_0.05_258/0.06),0_40px_80px_-48px_oklch(0.2_0.06_258/0.5)]"
      }`}
    >
      <div className={`flex items-center gap-3 border-b border-border/80 bg-[#eef1f6] ${compact ? "px-3 py-2" : "px-4 py-2.5"}`}>
        <span aria-hidden="true" className="flex gap-1.5">
          <span className={`${compact ? "size-2" : "size-2.5"} rounded-full bg-[#ff5f57]`} />
          <span className={`${compact ? "size-2" : "size-2.5"} rounded-full bg-[#febc2e]`} />
          <span className={`${compact ? "size-2" : "size-2.5"} rounded-full bg-[#28c840]`} />
        </span>
        <span className={`flex-1 truncate text-center font-medium text-muted-foreground ${compact ? "text-[10.5px]" : "text-[12px]"}`}>
          {title}
        </span>
        <span aria-hidden="true" className="w-8" />
      </div>
      {children}
    </div>
  );
}

function useTicker(intervalMs: number, running: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, running]);
  return tick;
}

const money = (value: number) => `$${value.toLocaleString("es-MX")}`;

/* ------------------------------------------------------------------ */
/* Live mini frames of the system (one per feature)                    */
/* ------------------------------------------------------------------ */

type FrameProps = { running: boolean; reducedMotion: boolean };

function ServicesFrame({ running, reducedMotion }: FrameProps) {
  // 0 pick carrier · 1 pick amount · 2 charging · 3-4 done · 5 pause
  const tick = useTicker(900, running && !reducedMotion);
  const step = reducedMotion ? 3 : tick % 6;
  const cycle = Math.floor(tick / 6);
  const carriers = ["Telcel", "AT&T", "Movistar"];
  const carrier = cycle % carriers.length;
  const done = step === 3 || step === 4;

  return (
    <div className="space-y-3 p-3.5 text-[11px]">
      <div className="flex gap-1.5">
        {carriers.map((name, index) => (
          <span
            key={name}
            className={`flex-1 rounded-lg border px-2 py-1.5 text-center font-semibold transition-colors duration-300 ${
              index === carrier ? "border-brand bg-brand/10 text-brand" : "border-border text-muted-foreground"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="flex gap-1.5">
        {[50, 100, 200].map((amount, index) => (
          <span
            key={amount}
            className={`flex-1 rounded-lg border px-2 py-1.5 text-center font-mono transition-colors duration-300 ${
              step >= 1 && index === 1 ? "border-brand bg-brand/10 text-brand" : "border-border text-muted-foreground"
            }`}
          >
            {money(amount)}
          </span>
        ))}
      </div>
      <div
        className={`flex h-8 items-center justify-center gap-1.5 rounded-lg font-semibold text-white transition-colors duration-300 ${
          done ? "bg-emerald-600" : "bg-brand"
        }`}
      >
        {done ? (
          <>
            <Check aria-hidden="true" className="size-3.5" strokeWidth={3} /> Recarga lista · {carriers[carrier]} {money(100)}
          </>
        ) : step === 2 ? (
          "Procesando…"
        ) : (
          "Cobrar recarga"
        )}
      </div>
    </div>
  );
}

function SalesFrame({ running, reducedMotion }: FrameProps) {
  const tick = useTicker(1400, running && !reducedMotion);
  const active = reducedMotion ? 0 : tick % 3;
  const sales = [
    { items: ["Refresco 600ml", "Papas", "Chicles"], total: 74 },
    { items: ["Leche entera", "Pan de caja"], total: 71 },
    { items: ["Café molido", "Azúcar 1kg", "Galletas", "Huevo"], total: 189 },
  ];

  return (
    <div className="p-3.5 text-[11px]">
      <div className="flex gap-1">
        {sales.map((sale, index) => (
          <span
            key={index}
            className={`rounded-t-md border border-b-0 px-2.5 py-1 font-semibold transition-colors duration-300 ${
              index === active ? "border-border bg-white text-foreground" : "border-transparent bg-muted/60 text-muted-foreground"
            }`}
          >
            Venta {index + 1}
          </span>
        ))}
      </div>
      <div className="rounded-b-lg rounded-tr-lg border border-border bg-white p-2.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <ul className="space-y-1 text-muted-foreground">
              {sales[active].items.slice(0, 3).map((item) => (
                <li key={item} className="flex justify-between">
                  <span>{item}</span>
                  <span className="font-mono">×1</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">{sales[active].items.length} artículos</span>
              <span className="font-mono text-[13px] font-semibold text-foreground">{money(sales[active].total)}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function InventoryFrame({ running, reducedMotion }: FrameProps) {
  const tick = useTicker(1000, running && !reducedMotion);
  const t = reducedMotion ? 11 : tick % 12;
  const products = [
    { name: "Leche entera", base: 24 },
    { name: "Café molido", base: 11 },
    { name: "Pan dulce", base: 6 },
  ];
  // Each tick one product sells one unit (round-robin); resets every 12 ticks.
  const stockOf = (index: number, base: number) => base - Math.max(0, Math.floor((t - index + 3) / 3));

  return (
    <ul className="divide-y divide-border p-1.5 text-[11px]">
      {products.map(({ name, base }, index) => {
        const stock = stockOf(index, base);
        const low = stock <= 4;
        return (
          <li key={name} className="flex items-center gap-2 px-2 py-2">
            <span className="flex-1 font-medium text-foreground">{name}</span>
            {low && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                <TriangleAlert aria-hidden="true" className="size-3" /> Stock bajo
              </span>
            )}
            <motion.span
              key={stock}
              initial={reducedMotion ? false : { scale: 1.25, color: "#0063FD" }}
              animate={{ scale: 1, color: low ? "#b45309" : "#0f172a" }}
              transition={{ duration: 0.4 }}
              className="w-8 text-right font-mono font-semibold"
            >
              {stock}
            </motion.span>
          </li>
        );
      })}
    </ul>
  );
}

function ReportsFrame({ running, reducedMotion }: FrameProps) {
  const tick = useTicker(4000, running && !reducedMotion);
  const bars = [34, 48, 41, 66, 54, 76, 62];
  const cash = 62;

  return (
    <div className="p-3.5 text-[11px]">
      <div className="flex items-baseline justify-between">
        <span className="text-muted-foreground">Corte del día · Caja 01</span>
        <span className="font-mono text-[14px] font-semibold text-foreground">{money(12480)}</span>
      </div>
      <div key={tick} className="mt-3 flex h-16 items-end gap-1.5">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            initial={reducedMotion ? false : { height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: easeOut }}
            className={`flex-1 rounded-t-[3px] ${index === bars.length - 1 ? "bg-brand" : "bg-brand/25"}`}
          />
        ))}
      </div>
      <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
        <span className="bg-emerald-500" style={{ width: `${cash}%` }} />
        <span className="flex-1 bg-brand" />
      </div>
      <div className="mt-1.5 flex justify-between text-muted-foreground">
        <span>Efectivo {cash}%</span>
        <span>Tarjeta {100 - cash}%</span>
      </div>
    </div>
  );
}

const frames = {
  services: { Frame: ServicesFrame, title: "Recargas" },
  sales: { Frame: SalesFrame, title: "Ventas abiertas" },
  inventory: { Frame: InventoryFrame, title: "Inventario" },
  reports: { Frame: ReportsFrame, title: "Reportes" },
} as const;

function FeatureCard({ index, reducedMotion }: { index: number; reducedMotion: boolean }) {
  const feature = VENDIA_FEATURES[index];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const { Frame, title } = frames[feature.visual as keyof typeof frames] ?? frames.sales;

  return (
    <div ref={ref} className="flex h-full flex-col rounded-3xl border border-border bg-white p-6 sm:p-8">
      <span className="font-mono text-[12px] text-muted-foreground">{String(index + 1).padStart(2, "0")} / función</span>
      <h3 className="mt-3 text-balance text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.08] tracking-[-0.04em] text-foreground">
        {feature.title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-6 text-muted-foreground">{feature.description}</p>
      <div className="mt-auto pt-7">
        <AppWindow title={`Vendia — ${title}`} compact>
          <Frame running={inView} reducedMotion={reducedMotion} />
        </AppWindow>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const businesses = [
  { label: "Abarrotes", icon: ShoppingBasket },
  { label: "Minisúper", icon: Store },
  { label: "Tiendas de conveniencia", icon: Coffee },
  { label: "Papelerías", icon: PencilRuler },
  { label: "Refaccionarias", icon: Wrench },
];

const startSteps = [
  { title: "Te mostramos una demo", detail: "Vemos tu caja y cómo vendes hoy." },
  { title: "Instalamos y configuramos", detail: "Dejamos Vendia listo en tu computadora y equipo." },
  { title: "Capacitamos a tu equipo", detail: "Incluida: tus cajeros aprenden a usarlo.", promise: true },
  { title: "Te acompañamos", detail: "Soporte mientras uses el sistema.", promise: true },
];

/*
 * TODO (confirmar con JRP Core antes de agregar):
 * - ¿Funciona sin internet?
 * - ¿Emite facturas (CFDI)?
 * - Precio o forma de cobro (pago único / mensual).
 */
const faqs = [
  {
    q: "¿Incluye capacitación?",
    a: "Sí. Cuando instalamos Vendia, capacitamos a tu equipo para que pueda cobrar, dar de alta productos y hacer cortes desde el primer día.",
  },
  {
    q: "¿Qué pasa si tengo dudas después?",
    a: "Tienes soporte mientras uses el sistema con nosotros: te ayudamos con dudas, ajustes y cualquier problema del día a día.",
  },
  {
    q: "¿Funciona con mi lector, impresora o báscula?",
    a: "Vendia trabaja con lectores de código de barras, impresoras de tickets térmicos, cajones de dinero y básculas. Si ya tienes equipo, revisamos que sea compatible antes de instalar.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de cuántas cajas tengas y del equipo que necesites. Cuéntanos de tu negocio y te enviamos una cotización sin compromiso.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function ProductVendia() {
  const reducedMotion = useReducedMotion() === true;

  return (
    <>
      {/* Hero: centered copy, wide app window below */}
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,color-mix(in_oklab,var(--brand)_10%,transparent),transparent_70%)]"
        />
        <ScrollReveal yOffset={20} className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionLabel>producto / punto de venta</SectionLabel>
          <p className="mt-6 font-heading text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.05em] text-brand">
            Vendia
          </p>
          <h1 className="mt-3 text-balance text-[clamp(2.1rem,4.8vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.045em] text-foreground">
            Cobra rápido, controla tu inventario y{" "}
            <span className="bg-gradient-to-r from-[#0063FD] to-[#00B4FD] bg-clip-text pr-[0.06em] font-accent text-[1.08em] font-normal italic tracking-[-0.02em] text-transparent">
              cierra caja sin descuadres.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Punto de venta para comercios: caja, inventario, recargas y reportes en un solo sistema que se
            instala en tu computadora.
          </p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contacto"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--brand)_65%,transparent)] transition-all hover:-translate-y-0.5 hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              Pedir una demo
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#funciones"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-sm font-medium text-foreground transition-colors hover:border-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              Ver funciones
              <ArrowDown aria-hidden="true" className="size-4 text-brand transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-foreground/80">
            {["Capacitación incluida", "Soporte mientras lo uses", "App instalable"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="size-4 text-emerald-600" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal yOffset={32} delay={0.1} className="mx-auto mt-14 max-w-5xl">
          {/* Animated recreation of the real Terminal de Venta (has its own window bar) */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_oklch(0.2_0.05_258/0.06),0_40px_80px_-48px_oklch(0.2_0.06_258/0.5)]">
            <VendiaTerminal />
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-4">
          <p className="font-mono text-[12px] text-muted-foreground">ideal para</p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {businesses.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground"
              >
                <Icon aria-hidden="true" className="size-4 text-brand" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features: cards with live mini frames of the system */}
      <section id="funciones" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-4 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel>01 / funciones</SectionLabel>
              <h2 className="mt-5 max-w-[18ch] text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground">
                Todo lo que pasa en tu caja, en un solo lugar.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-7 text-muted-foreground">
              Así se ve Vendia trabajando: cada función tal como la usarán tus cajeros.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {VENDIA_FEATURES.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                delay={reducedMotion ? 0 : 0.05 + (index % 2) * 0.08}
                yOffset={24}
                viewportAmount={0.2}
                className={index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <FeatureCard index={index} reducedMotion={reducedMotion} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible hardware: annotated photo + legend */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>02 / equipo</SectionLabel>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground">
              Funciona con el equipo de tu mostrador.
            </h2>
          </div>

          <div className="mt-12">
            <VendiaHardware phoneScreen="/vendia/vendia-stock-inventario.webp" />
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-canvas px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          <SectionLabel>03 / cómo empiezas</SectionLabel>
          <h2 className="mt-5 max-w-[20ch] text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground">
            De la demo a tu primera venta, te acompañamos.
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {startSteps.map(({ title, detail, promise }, index) => (
              <li key={title} className="rounded-2xl border border-border bg-white p-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#0b1120] font-accent text-lg italic text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[17px] font-bold tracking-[-0.02em] text-foreground">{title}</p>
                <p className={`mt-1.5 text-sm leading-6 ${promise ? "font-medium text-emerald-700" : "text-muted-foreground"}`}>
                  {detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ: centered heading, accordion below */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionLabel>04 / preguntas</SectionLabel>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em] text-foreground">
              Lo que más nos preguntan.
            </h2>
          </div>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 pr-8 text-[15px] leading-7 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-[15px] text-muted-foreground">
            ¿No ves tu duda? Escríbenos en el formulario de abajo.
          </p>
        </div>
      </section>
    </>
  );
}
