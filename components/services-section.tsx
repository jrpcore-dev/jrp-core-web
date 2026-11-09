"use client";

import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  ChartNoAxesCombined,
  Code2,
  Globe2,
  MousePointer2,
  Network,
  Package,
  PanelTop,
  ScanLine,
  ShoppingBag,
  Sparkles,
  Tag,
  UserPlus,
  Workflow,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { TechStackTicker } from "@/components/tech-stack-ticker";

const services = [
  {
    number: "01",
    eyebrow: "Presencia digital",
    title: "Páginas web que convierten visitas en oportunidades.",
    description:
      "Diseñamos sitios rápidos, claros y preparados para mostrar el valor de tu negocio y facilitar el siguiente paso a tus clientes.",
    tags: ["Sitios corporativos", "Landing pages", "Catálogos digitales"],
    icon: Globe2,
    visual: "web",
    tint: "from-sky-100/80 via-white to-blue-50",
    glow: "bg-sky-300/45",
  },
  {
    number: "02",
    eyebrow: "Software a la medida",
    title: "Sistemas a medida para las necesidades de tu negocio.",
    description:
      "Creamos las herramientas que tu operación necesita: desde un POS (punto de venta) hasta módulos propios para ventas, inventario o administración.",
    tags: ["POS y ventas", "Inventario", "Módulos propios"],
    icon: Code2,
    visual: "pos",
    tint: "from-indigo-100/80 via-white to-violet-50",
    glow: "bg-indigo-300/45",
  },
  {
    number: "03",
    eyebrow: "Automatización",
    title: "Tareas que se resuelven solas y conectan tus herramientas.",
    description:
      "Diseñamos flujos que mueven la información entre tus herramientas, avisan a tu equipo y reducen capturas y seguimientos manuales.",
    tags: ["Flujos de trabajo", "Avisos automáticos", "Integraciones"],
    icon: Workflow,
    visual: "automation",
    tint: "from-emerald-100/80 via-white to-teal-50",
    glow: "bg-emerald-300/45",
  },
  {
    number: "04",
    eyebrow: "Relación con clientes",
    title: "Un CRM para dar seguimiento a cada cliente.",
    description:
      "CRM significa gestión de relaciones con clientes. Es una herramienta que reúne contactos, conversaciones y oportunidades para que tu equipo sepa quién necesita atención, qué sigue y cuándo volver a contactar.",
    tags: ["Contactos e historial", "Seguimiento de oportunidades", "Recordatorios"],
    icon: Network,
    visual: "crm",
    tint: "from-amber-100/80 via-white to-orange-50",
    glow: "bg-amber-300/45",
  },
] as const;

type ServiceVisual = (typeof services)[number]["visual"];

const easeOut = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Counts up by one every `intervalMs` while `running` is true. */
function useTicker(intervalMs: number, running: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, running]);
  return tick;
}

const formatMoney = (value: number) =>
  `$${Math.round(value).toLocaleString("es-MX")}`;

function AnimatedNumber({
  value,
  reducedMotion,
  format = (v: number) => Math.round(v).toLocaleString("es-MX"),
}: {
  value: number;
  reducedMotion: boolean;
  format?: (value: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion) {
      node.textContent = format(value);
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.6,
      ease: easeOut,
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reducedMotion, format]);

  return <span ref={ref}>{format(value)}</span>;
}

/* ------------------------------------------------------------------ */
/* Artwork                                                             */
/* ------------------------------------------------------------------ */

const posItems = [
  { name: "Café de grano 1kg", price: 385, icon: Package },
  { name: "Taza térmica", price: 240, icon: ShoppingBag },
  { name: "Filtro reutilizable", price: 95, icon: Tag },
  { name: "Molienda especial", price: 40, icon: Sparkles },
];

function PosArtwork({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  // 0: empty ticket · 1-4: items added · 5: sale charged
  const tick = useTicker(950, active && !reducedMotion);
  const step = reducedMotion ? posItems.length : tick % (posItems.length + 2);
  const visibleItems = posItems.slice(0, Math.min(step, posItems.length));
  const tappedIndex = step >= 1 && step <= posItems.length ? step - 1 : -1;
  const paid = step === posItems.length + 1;
  const total = visibleItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto w-full max-w-[410px] rounded-2xl border border-white/80 bg-white/85 p-3 shadow-[0_24px_60px_-28px_oklch(0.22_0.06_255/0.3)] backdrop-blur-xl sm:p-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <ScanLine aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-foreground">Punto de venta</p>
            <p className="text-[9px] text-muted-foreground">Caja · inventario · operación</p>
          </div>
        </div>
        <span className="rounded-full bg-success/10 px-2 py-1 text-[9px] font-semibold text-success">
          Caja abierta
        </span>
      </div>

      <div className="grid grid-cols-[1.1fr_0.9fr] gap-2.5 pt-3 sm:gap-3">
        <div className="grid grid-cols-2 gap-2">
          {posItems.map(({ name, price, icon: Icon }, index) => {
            const isTapped = index === tappedIndex;
            return (
              <motion.div
                key={name}
                animate={isTapped ? { scale: [1, 0.92, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className={`rounded-xl border bg-background p-2 transition-colors duration-300 ${
                  isTapped ? "border-brand/50 ring-2 ring-brand/15" : "border-border/60"
                }`}
              >
                <span
                  className={`mb-1.5 flex aspect-[1.5] items-center justify-center rounded-lg transition-colors duration-300 ${
                    isTapped
                      ? "bg-brand text-brand-foreground"
                      : index % 2 === 0
                        ? "bg-brand-soft/70 text-brand"
                        : "bg-amber-100/70 text-amber-700"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="block truncate text-[8.5px] font-medium text-foreground/80">{name}</span>
                <span className="block font-mono text-[8.5px] text-muted-foreground">{formatMoney(price)}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col rounded-xl border border-border/60 bg-background p-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-semibold text-foreground">Venta actual</p>
            <span className="font-mono text-[8px] text-muted-foreground">#0427</span>
          </div>
          <div className="mt-2 min-h-[76px] flex-1 space-y-1.5">
            <AnimatePresence initial={false}>
              {visibleItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="flex items-center justify-between gap-1 text-[8.5px]"
                >
                  <span className="truncate text-foreground/80">{item.name}</span>
                  <span className="shrink-0 font-mono text-muted-foreground">{formatMoney(item.price)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {visibleItems.length === 0 && (
              <p className="text-[8.5px] text-muted-foreground/70">Agrega productos…</p>
            )}
          </div>
          <div className="pt-2">
            <div className="mb-2 h-px bg-border/70" />
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[9px] font-medium text-muted-foreground">Total</span>
              <span className="font-mono text-[12px] font-semibold text-foreground">
                <AnimatedNumber value={total} reducedMotion={reducedMotion} format={formatMoney} />
              </span>
            </div>
            <div
              className={`flex h-7 items-center justify-center gap-1 rounded-lg text-[9px] font-semibold text-white transition-colors duration-300 ${
                paid
                  ? "bg-success shadow-[0_6px_14px_-7px_var(--success)]"
                  : "bg-brand shadow-[0_6px_14px_-7px_var(--brand)]"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={paid ? "paid" : "charge"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  {paid ? (
                    <>
                      <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                      Venta registrada
                    </>
                  ) : (
                    "Cobrar"
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AUTOMATION_LOOP = 3.2;

function AutomationArtwork({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const running = active && !reducedMotion;
  const completed = 128 + useTicker(AUTOMATION_LOOP * 1000, running);
  const loop = { duration: AUTOMATION_LOOP, repeat: Infinity, ease: "easeInOut" } as const;

  // Pulse timings for each node, in fractions of the loop.
  const nodes = [
    { icon: PanelTop, label: "Entrada", color: "bg-sky-100 text-sky-700", at: 0.05 },
    { icon: Bot, label: "Automatización", color: "bg-brand-soft text-brand", at: 0.45 },
    { icon: ChartNoAxesCombined, label: "Resultado", color: "bg-emerald-100 text-emerald-700", at: 0.85 },
  ];

  return (
    <div className="relative mx-auto flex min-h-60 w-full max-w-[410px] flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/55 p-4">
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-foreground">Flujo: pedido nuevo</span>
        <span className="rounded-full bg-white/85 px-2 py-1 text-[9px] font-medium text-muted-foreground shadow-sm">
          Hoy:{" "}
          <span className="font-semibold text-foreground">
            <AnimatedNumber value={completed} reducedMotion={reducedMotion} />
          </span>{" "}
          tareas
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-6">
        <div className="absolute inset-x-4 top-1/2 h-16 -translate-y-1/2 rounded-full bg-brand/5 blur-xl" />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 180"
          preserveAspectRatio="none"
          className="absolute inset-x-2 top-1/2 h-28 w-[calc(100%-1rem)] -translate-y-1/2 overflow-visible"
        >
          <path
            d="M62 74 H338"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
            strokeDasharray="5 6"
            className="text-brand"
          />
          {running && (
            <motion.circle
              r="4.5"
              cy="74"
              fill="var(--brand)"
              initial={{ cx: 62, opacity: 0 }}
              animate={{
                cx: [62, 62, 200, 200, 338, 338],
                opacity: [0, 1, 1, 1, 1, 0],
              }}
              transition={{ ...loop, times: [0, 0.08, 0.38, 0.55, 0.82, 1] }}
            />
          )}
        </svg>

        <div className="relative z-10 grid w-full grid-cols-3 items-center gap-1 sm:gap-2">
          {nodes.map(({ icon: Icon, label, color, at }) => (
            <div key={label} className="flex min-w-0 flex-col items-center gap-3">
              <span className="relative">
                {running && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl border-2 border-brand/40"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1, 1.45, 1.45], opacity: [0, 0.9, 0, 0] }}
                    transition={{ ...loop, ease: "easeOut", times: [0, at, Math.min(at + 0.14, 0.99), 1] }}
                  />
                )}
                <motion.span
                  className={`flex size-11 items-center justify-center rounded-2xl border border-white/80 shadow-lg shadow-foreground/5 sm:size-12 ${color}`}
                  animate={running ? { scale: [1, 1, 1.12, 1, 1] } : { scale: 1 }}
                  transition={
                    running
                      ? { ...loop, times: [0, at, Math.min(at + 0.06, 0.98), Math.min(at + 0.14, 0.99), 1] }
                      : undefined
                  }
                >
                  <Icon aria-hidden="true" className="size-5" />
                </motion.span>
              </span>
              <span className="max-w-full text-center text-[9px] font-medium leading-tight text-muted-foreground sm:text-[11px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 mx-auto flex items-center gap-2 rounded-xl border border-white/80 bg-white/90 px-3 py-2 shadow-[0_10px_24px_-14px_oklch(0.2_0.06_258/0.35)]"
        initial={false}
        animate={running ? { opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, -4] } : { opacity: 1, y: 0 }}
        transition={running ? { ...loop, times: [0, 0.82, 0.88, 0.97, 1] } : undefined}
      >
        <span className="flex size-6 items-center justify-center rounded-lg bg-success/10 text-success">
          <Bell aria-hidden="true" className="size-3.5" />
        </span>
        <span>
          <span className="block text-[9.5px] font-semibold text-foreground">Pedido registrado</span>
          <span className="block text-[8.5px] text-muted-foreground">Inventario actualizado · equipo avisado</span>
        </span>
      </motion.div>
    </div>
  );
}

const crmColumns = ["Nuevo", "Seguimiento", "Cerrado"] as const;
const crmStaticCards: { initials: string; name: string; tone: string }[][] = [
  [{ initials: "AR", name: "Ana R.", tone: "bg-sky-100 text-sky-700" }],
  [{ initials: "LP", name: "Luis P.", tone: "bg-brand-soft text-brand" }],
  [{ initials: "DM", name: "Diana M.", tone: "bg-emerald-100 text-emerald-700" }],
];
const crmMessages = [
  "Contacto registrado con su historial",
  "Recordatorio: llamar mañana a las 10:00",
  "Oportunidad cerrada · $8,500",
];

function CrmArtwork({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const groupId = useId();
  // Pause on the last column for one extra beat before restarting.
  const tick = useTicker(1500, active && !reducedMotion);
  const stage = reducedMotion ? 2 : Math.min(tick % 4, 2);
  const closed = stage === 2;

  return (
    <div className="mx-auto w-full max-w-[410px] rounded-2xl border border-white/80 bg-white/85 p-3 shadow-[0_24px_60px_-28px_oklch(0.22_0.06_255/0.28)] backdrop-blur-xl sm:p-4">
      <div className="flex items-center justify-between border-b border-border/65 pb-3">
        <div>
          <p className="text-[11px] font-semibold text-foreground">Seguimiento de clientes</p>
          <p className="mt-0.5 text-[9px] text-muted-foreground">Contactos y oportunidades</p>
        </div>
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
          <Network aria-hidden="true" className="size-4" />
        </span>
      </div>

      <LayoutGroup id={groupId}>
        <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
          {crmColumns.map((column, columnIndex) => (
            <div key={column} className="flex min-h-[132px] flex-col gap-1.5 rounded-xl bg-muted/50 p-1.5">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-[8.5px] font-semibold text-foreground/75">{column}</span>
                <span className="font-mono text-[8px] text-muted-foreground">
                  {crmStaticCards[columnIndex].length + (stage === columnIndex ? 1 : 0)}
                </span>
              </div>
              {stage === columnIndex && (
                <motion.div
                  layoutId="lead"
                  transition={{ duration: reducedMotion ? 0 : 0.6, ease: easeOut }}
                  className={`relative rounded-lg border bg-background p-1.5 shadow-[0_8px_18px_-10px_oklch(0.2_0.06_258/0.4)] ${
                    closed ? "border-success/40" : "border-brand/35"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[7.5px] font-semibold ${
                        closed ? "bg-success/15 text-success" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {closed ? <Check aria-hidden="true" className="size-3" strokeWidth={3} /> : "ML"}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[8.5px] font-semibold text-foreground">María L.</span>
                      <span className="block truncate text-[7.5px] text-muted-foreground">Cotización</span>
                    </span>
                  </div>
                </motion.div>
              )}
              {crmStaticCards[columnIndex].map(({ initials, name, tone }) => (
                <motion.div
                  layout
                  transition={{ duration: reducedMotion ? 0 : 0.6, ease: easeOut }}
                  key={name}
                  className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 p-1.5"
                >
                  <span className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[7.5px] font-semibold ${tone}`}>
                    {initials}
                  </span>
                  <span className="truncate text-[8.5px] text-foreground/70">{name}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </LayoutGroup>

      <div
        className={`mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-[9px] font-medium transition-colors duration-300 ${
          closed ? "bg-success/10 text-success" : "bg-amber-50/80 text-amber-800"
        }`}
      >
        <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${closed ? "bg-success" : "bg-amber-500"}`} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            {crmMessages[stage]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

const WEB_STEPS = 7;

function WebArtwork({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  // 0: cursor appears · 1: moves to CTA · 2: hover · 3: click
  // 4-5: new lead notification · 6: reset
  const tick = useTicker(850, active && !reducedMotion);
  const step = reducedMotion ? 4 : tick % WEB_STEPS;
  const leads = 24 + (reducedMotion ? 1 : Math.floor((tick + WEB_STEPS - 4) / WEB_STEPS));
  const hovering = step >= 2 && step <= 3;
  const sent = step >= 3 && step <= 5;
  const showToast = step === 4 || step === 5;

  const cursor =
    step === 0
      ? { x: 150, y: 64, opacity: 1, scale: 1 }
      : step === 6
        ? { x: 64, y: 18, opacity: 0, scale: 1 }
        : step === 3
          ? { x: 64, y: 18, opacity: 1, scale: 0.82 }
          : step === 1 || step === 2 || step >= 4
            ? { x: 64, y: 18, opacity: 1, scale: 1 }
            : { x: 150, y: 64, opacity: 0, scale: 1 };

  return (
    <div className="relative mx-auto w-full max-w-[410px] rotate-[-2deg] rounded-2xl border border-white/80 bg-white/85 p-3 shadow-[0_24px_60px_-28px_oklch(0.22_0.06_255/0.3)] backdrop-blur-xl transition-transform duration-500 group-hover:-rotate-1 sm:p-4">
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-3">
        <span className="size-2 rounded-full bg-rose-300" />
        <span className="size-2 rounded-full bg-amber-300" />
        <span className="size-2 rounded-full bg-emerald-300" />
        <div className="ml-3 flex h-5 flex-1 items-center gap-1.5 rounded-md bg-muted/80 px-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success/70" />
          <span className="font-mono text-[8.5px] text-muted-foreground">tunegocio.com</span>
        </div>
      </div>
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-3 pt-4">
        <div className="flex flex-col justify-center">
          {[
            "h-2 w-1/3 bg-brand/30",
            "mt-3 h-3 w-[90%] bg-foreground/80",
            "mt-2 h-3 w-[72%] bg-foreground/70",
            "mt-2 h-2 w-[84%] bg-muted-foreground/25",
          ].map((classes, index) => (
            <motion.div
              key={classes}
              initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.1 + index * 0.08, ease: easeOut }}
              className={`origin-left rounded-full ${classes}`}
            />
          ))}

          <div className="relative mt-4 w-fit">
            <motion.div
              animate={{ scale: step === 3 ? 0.95 : hovering ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              className={`relative flex h-7 w-24 items-center justify-center gap-1 rounded-full text-[9px] font-semibold text-white transition-colors duration-300 ${
                sent
                  ? "bg-success shadow-[0_6px_14px_-7px_var(--success)]"
                  : hovering
                    ? "bg-brand-strong shadow-[0_8px_18px_-7px_var(--brand)]"
                    : "bg-brand shadow-[0_6px_14px_-7px_var(--brand)]"
              }`}
            >
              {sent ? (
                <>
                  <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                  Enviado
                </>
              ) : (
                "Cotizar"
              )}
              {step === 3 && !reducedMotion && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-success"
                />
              )}
            </motion.div>

            {!reducedMotion && (
              <motion.span
                aria-hidden="true"
                initial={{ x: 150, y: 64, opacity: 0 }}
                animate={cursor}
                transition={{ duration: step === 1 ? 0.75 : 0.25, ease: [0.45, 0, 0.2, 1] }}
                className="pointer-events-none absolute left-0 top-0 z-20 drop-shadow-[0_3px_4px_oklch(0.2_0.05_258/0.35)]"
              >
                <MousePointer2 className="size-[18px] fill-foreground text-white" strokeWidth={1.5} />
              </motion.span>
            )}
          </div>
        </div>
        <div className="relative flex aspect-[0.92] items-end overflow-hidden rounded-xl bg-gradient-to-br from-brand/20 via-sky-100 to-indigo-100 p-3">
          <motion.div
            aria-hidden="true"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute -right-4 -top-5 size-24 rounded-full border-[12px] border-dashed border-white/45"
          />
          <div className="relative w-full rounded-lg border border-white/70 bg-white/80 p-2.5 shadow-lg backdrop-blur">
            <p className="text-[8px] font-medium text-muted-foreground">Contactos este mes</p>
            <p className="mt-0.5 font-mono text-[15px] font-semibold leading-none text-foreground">
              <AnimatedNumber value={leads} reducedMotion={reducedMotion} />
            </p>
            <div className="mt-2 flex h-5 items-end gap-[3px]">
              {[30, 45, 38, 60, 52, 74, 90].map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                  className={`flex-1 rounded-[2px] ${index === 6 ? "bg-brand" : "bg-brand/25"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="absolute -bottom-4 -right-2 z-30 flex rotate-[2deg] items-center gap-2 rounded-xl border border-white/90 bg-white px-3 py-2 shadow-[0_16px_32px_-14px_oklch(0.2_0.06_258/0.4)]"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <UserPlus aria-hidden="true" className="size-3.5" />
            </span>
            <span>
              <span className="block text-[9.5px] font-semibold text-foreground">Nuevo contacto</span>
              <span className="block text-[8.5px] text-muted-foreground">Desde tu sitio web · ahora</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceArtwork({
  type,
  active,
  reducedMotion,
}: {
  type: ServiceVisual;
  active: boolean;
  reducedMotion: boolean;
}) {
  if (type === "web") return <WebArtwork active={active} reducedMotion={reducedMotion} />;
  if (type === "pos") return <PosArtwork active={active} reducedMotion={reducedMotion} />;
  if (type === "automation") return <AutomationArtwork active={active} reducedMotion={reducedMotion} />;
  return <CrmArtwork active={active} reducedMotion={reducedMotion} />;
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */

function SectionIntro({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-strong">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
        Lo que hacemos
      </p>
      <h2
        id={compact ? "services-title" : undefined}
        className={`mt-5 text-balance font-semibold leading-[1.04] tracking-[-0.055em] text-foreground ${
          compact
            ? "max-w-[16ch] text-[clamp(2rem,3.4vw,3rem)]"
            : "max-w-[12ch] text-4xl sm:text-5xl"
        }`}
      >
        Tecnología que le sigue el paso a tu negocio.
      </h2>
      {!compact && (
        <p className="mt-5 max-w-md text-pretty text-base leading-7 text-muted-foreground">
          Desde tu primera página hasta los sistemas que mueven toda tu
          operación, construimos herramientas útiles, claras y listas para
          crecer contigo.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned, scroll-driven showcase                             */
/* ------------------------------------------------------------------ */

function ServiceListItem({
  service,
  index,
  isActive,
  progress,
  reducedMotion,
  onSelect,
}: {
  service: (typeof services)[number];
  index: number;
  isActive: boolean;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const n = services.length;
  const fill = useTransform(progress, [index / n, (index + 1) / n], [0, 1], { clamp: true });

  return (
    <li className="relative pl-6">
      <span aria-hidden="true" className="absolute inset-y-1 left-0 w-0.5 overflow-hidden rounded-full bg-foreground/10">
        <motion.span style={{ scaleY: fill }} className="block size-full origin-top rounded-full bg-brand" />
      </span>
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-current={isActive ? "step" : undefined}
        className="group flex w-full items-center gap-3 rounded-lg py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className={`font-mono text-xs transition-colors ${isActive ? "text-brand" : "text-muted-foreground/60"}`}>
          {service.number}
        </span>
        <span
          className={`text-sm font-semibold transition-colors ${
            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"
          }`}
        >
          {service.eyebrow}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: easeOut }}
            className="overflow-hidden"
          >
            <h3 className="mt-1 max-w-[22ch] text-balance text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-foreground">
              {service.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{service.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2 pb-3">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[11px] font-medium text-foreground/75 shadow-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function ProgressSegment({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const n = services.length;
  const fill = useTransform(progress, [index / n, (index + 1) / n], [0, 1], { clamp: true });
  return (
    <span aria-hidden="true" className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
      <motion.span style={{ scaleX: fill }} className="block size-full origin-left rounded-full bg-brand" />
    </span>
  );
}

const serviceWhatsappHref = (service: string) =>
  `https://wa.me/529861133052?text=${encodeURIComponent(
    `Hola JRP Core, me interesa cotizar: ${service}.`,
  )}`;

function DesktopShowcase({ reducedMotion }: { reducedMotion: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);
  const n = services.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex(Math.min(n - 1, Math.max(0, Math.floor(value * n))));
  });

  // Gentle drift of the artwork within each service's scroll segment.
  const artworkY = useTransform(scrollYProgress, (value) => {
    if (reducedMotion) return 0;
    const local = Math.min(value * n - Math.min(n - 1, Math.floor(value * n)), 1);
    return (0.5 - local) * 28;
  });

  const scrollToService = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: trackTop + distance * ((index + 0.1) / n),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const active = services[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${n * 65}vh` }}>
      <div
        ref={stageRef}
        className="sticky top-[5.5rem] flex h-[calc(100svh_-_5.5rem)] min-h-[600px] items-center px-10"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] xl:gap-16">
          <div>
            <SectionIntro compact />
            <ol className="mt-8 space-y-1">
              {services.map((service, index) => (
                <ServiceListItem
                  key={service.number}
                  service={service}
                  index={index}
                  isActive={index === activeIndex}
                  progress={scrollYProgress}
                  reducedMotion={reducedMotion}
                  onSelect={scrollToService}
                />
              ))}
            </ol>
          </div>

          <div className="relative">
            {/* Colored glow behind the card, follows the active service */}
            <AnimatePresence initial={false}>
              <motion.div
                key={active.number}
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.8 }}
                className={`pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] blur-3xl ${active.glow}`}
              />
            </AnimatePresence>

            <div className="relative isolate flex h-[min(640px,calc(100svh_-_8.5rem))] flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white/40 shadow-[0_40px_90px_-40px_oklch(0.19_0.06_258/0.35),0_10px_26px_-14px_oklch(0.19_0.06_258/0.16),inset_0_1px_0_white] backdrop-blur-2xl">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.number}
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.6 }}
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${active.tint}`}
                />
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,oklch(0.3_0.04_258/0.09)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 -z-10 size-72 rounded-full border-[32px] border-white/35"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-64 rounded-full border-[28px] border-white/25"
              />

              {/* Header */}
              <div className="flex items-center gap-4 px-7 pt-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/80 text-brand shadow-sm backdrop-blur">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={active.number}
                      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                      transition={{ duration: reducedMotion ? 0 : 0.25 }}
                    >
                      <ActiveIcon aria-hidden="true" className="size-[18px]" />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={active.number}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: reducedMotion ? 0 : 0.25 }}
                        className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {active.eyebrow}
                      </motion.span>
                    </AnimatePresence>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground/70">
                      {active.number} / {String(n).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1.5">
                    {services.map((service, index) => (
                      <ProgressSegment key={service.number} index={index} progress={scrollYProgress} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stage */}
              <div className="relative mx-5 my-5 flex flex-1 items-center justify-center rounded-[1.5rem] border border-white/70 bg-white/35 px-6 shadow-[inset_0_1px_0_white] xl:px-10">
                <motion.div style={{ y: artworkY }} className="w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.number}
                      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.95, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98, filter: "blur(4px)" }}
                      transition={{ duration: reducedMotion ? 0 : 0.45, ease: easeOut }}
                      className="w-full xl:scale-[1.08]"
                    >
                      <ServiceArtwork type={active.visual} active={stageInView} reducedMotion={reducedMotion} />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-4 border-t border-foreground/5 px-7 py-4">
                <span className="text-[11px] font-medium text-muted-foreground">JRP Core · Soluciones digitales</span>
                <a
                  href={serviceWhatsappHref(active.eyebrow)}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/75 py-1.5 pl-3.5 pr-1.5 text-[12px] font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Cotizar este servicio
                  <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / tablet: swipeable service carousel                          */
/* ------------------------------------------------------------------ */

function MobileServiceBlock({
  service,
  reducedMotion,
}: {
  service: (typeof services)[number];
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const Icon = service.icon;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: easeOut }}
      className="w-full shrink-0 snap-start rounded-[1.6rem] border border-white/75 bg-white/55 p-4 shadow-[0_22px_55px_-34px_oklch(0.19_0.06_258/0.24),inset_0_1px_0_white] backdrop-blur sm:rounded-[1.8rem] sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-white/80 bg-white/75 text-brand shadow-sm">
          <Icon aria-hidden="true" className="size-[18px]" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {service.eyebrow}
        </span>
        <span className="ml-auto font-mono text-xs text-muted-foreground/65">{service.number}</span>
      </div>
      <h3 className="mt-5 max-w-[20ch] text-balance text-[clamp(1.6rem,5vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-foreground">
        {service.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
        {service.description}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[10px] font-medium text-foreground/75 shadow-sm sm:text-[11px]"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div
        ref={ref}
        className={`relative mt-6 flex min-h-64 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/80 bg-gradient-to-br p-4 sm:p-6 ${service.tint}`}
      >
        <ServiceArtwork type={service.visual} active={inView} reducedMotion={reducedMotion} />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

function MobileServicesCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const goToMobileService = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slide = carousel.children[index];
    if (!(slide instanceof HTMLElement)) return;
    const left = slide.getBoundingClientRect().left - carousel.getBoundingClientRect().left + carousel.scrollLeft;
    carousel.scrollTo({
      left,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const updateMobileActiveIndex = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slides = Array.from(carousel.children);
    const closestIndex = slides.reduce((closest, slide, index) => {
      const closestSlide = slides[closest];
      const slideLeft = (slide as HTMLElement).getBoundingClientRect().left - carousel.getBoundingClientRect().left + carousel.scrollLeft;
      const closestLeft = (closestSlide as HTMLElement).getBoundingClientRect().left - carousel.getBoundingClientRect().left + carousel.scrollLeft;
      return Math.abs(slideLeft - carousel.scrollLeft) < Math.abs(closestLeft - carousel.scrollLeft)
        ? index
        : closest;
    }, 0);
    setMobileActiveIndex(closestIndex);
  };

  return (
    <div className="px-5 py-20 sm:px-8 sm:py-24 lg:hidden">
      <div className="mx-auto max-w-2xl">
        <SectionIntro />
        <div
          ref={carouselRef}
          onScroll={updateMobileActiveIndex}
          role="region"
          aria-label="Servicios disponibles; desliza horizontalmente para explorar"
          aria-roledescription="carrusel"
          className={`mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12 sm:gap-5 ${reducedMotion ? "scroll-auto" : "scroll-smooth"}`}
        >
          {services.map((service) => (
            <MobileServiceBlock key={service.number} service={service} reducedMotion={reducedMotion} />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="group" aria-label={`Servicio ${mobileActiveIndex + 1} de ${services.length}`}>
            {services.map((service, index) => (
              <button
                key={service.number}
                type="button"
                aria-label={`Ir a ${service.eyebrow}`}
                aria-current={mobileActiveIndex === index ? "step" : undefined}
                onClick={() => goToMobileService(index)}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${mobileActiveIndex === index ? "w-7 bg-brand" : "w-2 bg-foreground/20 hover:bg-brand/50"}`}
              />
            ))}
            <span className="ml-1 text-[10px] font-medium text-muted-foreground">Desliza para explorar</span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Servicio anterior"
              onClick={() => goToMobileService(Math.max(0, mobileActiveIndex - 1))}
              disabled={mobileActiveIndex === 0}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-white/70 text-foreground shadow-sm transition-[color,background-color,opacity] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Siguiente servicio"
              onClick={() => goToMobileService(Math.min(services.length - 1, mobileActiveIndex + 1))}
              disabled={mobileActiveIndex === services.length - 1}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-white/70 text-foreground shadow-sm transition-[color,background-color,opacity] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const reducedMotion = useReducedMotion() === true;

  return (
    <section
      id="sistemas"
      aria-labelledby="services-title"
      className="relative isolate overflow-clip bg-canvas"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_82%_20%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent_36%)]"
      />

      <div className="relative z-10">
        <DesktopShowcase reducedMotion={reducedMotion} />
        <MobileServicesCarousel reducedMotion={reducedMotion} />
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
          <TechStackTicker />
        </div>
      </div>
    </section>
  );
}
