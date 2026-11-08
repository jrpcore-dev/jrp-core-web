"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Bot,
  ChartNoAxesCombined,
  CircleDollarSign,
  Code2,
  Globe2,
  Network,
  PanelTop,
  ScanLine,
  Workflow,
} from "lucide-react";

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
  },
] as const;

function ServiceArtwork({
  type,
  reducedMotion,
}: {
  type: (typeof services)[number]["visual"];
  reducedMotion: boolean;
}) {
  if (type === "web") {
    return (
      <div className="relative mx-auto w-full max-w-[410px] rotate-[-2deg] rounded-2xl border border-white/80 bg-white/85 p-3 shadow-[0_24px_60px_-28px_oklch(0.22_0.06_255/0.3)] backdrop-blur-xl transition-transform duration-500 group-hover:-rotate-1 sm:p-4">
        <div className="flex items-center gap-1.5 border-b border-border/60 pb-3">
          <span className="size-2 rounded-full bg-rose-300" />
          <span className="size-2 rounded-full bg-amber-300" />
          <span className="size-2 rounded-full bg-emerald-300" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-muted/80" />
        </div>
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-3 pt-4">
          <div className="flex flex-col justify-center">
            <div className="h-2 w-1/3 rounded-full bg-brand/30" />
            <div className="mt-3 h-3 w-[90%] rounded-full bg-foreground/80" />
            <div className="mt-2 h-3 w-[72%] rounded-full bg-foreground/70" />
            <div className="mt-2 h-2 w-[84%] rounded-full bg-muted-foreground/25" />
            <div className="mt-4 h-7 w-24 rounded-full bg-brand shadow-[0_6px_14px_-7px_var(--brand)]" />
          </div>
          <div className="relative flex aspect-[0.92] items-end overflow-hidden rounded-xl bg-gradient-to-br from-brand/20 via-sky-100 to-indigo-100 p-3">
            <div className="absolute -right-4 -top-5 size-24 rounded-full border-[12px] border-white/45" />
            <div className="relative w-full rounded-lg border border-white/70 bg-white/75 p-2.5 shadow-lg backdrop-blur">
              <div className="h-2 w-3/4 rounded-full bg-foreground/70" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted-foreground/20" />
              <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-muted-foreground/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "pos") {
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
          <span className="rounded-full bg-success/10 px-2 py-1 text-[9px] font-semibold text-success">POS</span>
        </div>
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-2.5 pt-3 sm:gap-3">
          <div className="grid grid-cols-2 gap-2">
            {["Producto", "Servicio", "Inventario", "Cliente"].map((label, index) => (
              <div key={label} className="rounded-xl border border-border/60 bg-background p-2">
                <span className={`mb-2 flex aspect-[1.35] items-center justify-center rounded-lg ${index % 2 === 0 ? "bg-brand-soft/70 text-brand" : "bg-amber-100/70 text-amber-700"}`}>
                  {index === 0 ? <Boxes className="size-4" /> : index === 1 ? <CircleDollarSign className="size-4" /> : index === 2 ? <ChartNoAxesCombined className="size-4" /> : <Network className="size-4" />}
                </span>
                <span className="block text-[9px] font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col rounded-xl border border-border/60 bg-background p-2.5">
            <p className="text-[9px] font-semibold text-foreground">Venta actual</p>
            <div className="mt-2 space-y-2">
              {["Artículo", "Cantidad", "Total"].map((label, index) => (
                <div key={label} className="flex items-center justify-between gap-1">
                  <span className="h-1.5 rounded-full bg-muted-foreground/20" style={{ width: `${48 + index * 8}%` }} />
                  <span className="size-1.5 rounded-full bg-brand/35" />
                </div>
              ))}
            </div>
            <div className="mt-auto pt-3">
              <div className="mb-2 h-px bg-border/70" />
              <div className="h-7 rounded-lg bg-brand shadow-[0_6px_14px_-7px_var(--brand)]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div className="relative mx-auto flex min-h-56 w-full max-w-[410px] items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/55 p-5">
        <div className="absolute inset-x-4 top-1/2 h-16 -translate-y-1/2 rounded-full bg-brand/5 blur-xl" />
        <svg aria-hidden="true" viewBox="0 0 400 180" preserveAspectRatio="none" className="absolute inset-x-2 top-1/2 h-28 w-[calc(100%-1rem)] -translate-y-1/2 overflow-visible">
          <path d="M62 74 H180 M220 74 H338" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="2" strokeDasharray="5 6" className="text-brand" />
          {!reducedMotion && (
            <>
              <motion.circle r="4" cy="74" fill="var(--brand)" animate={{ cx: [62, 180], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} />
              <motion.circle r="4" cy="74" fill="var(--brand)" animate={{ cx: [220, 338], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.8, delay: 0.9, repeat: Infinity, ease: "linear" }} />
            </>
          )}
        </svg>
        <div className="relative z-10 grid w-full grid-cols-3 items-center gap-1 sm:gap-2">
          {[
            { icon: PanelTop, label: "Entrada", color: "bg-sky-100 text-sky-700" },
            { icon: Bot, label: "Automatización", color: "bg-brand-soft text-brand" },
            { icon: ChartNoAxesCombined, label: "Resultado", color: "bg-emerald-100 text-emerald-700" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex min-w-0 flex-col items-center gap-3">
              <span className={`flex size-11 items-center justify-center rounded-2xl border border-white/80 shadow-lg shadow-foreground/5 sm:size-12 ${color}`}>
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="max-w-full text-center text-[9px] font-medium leading-tight text-muted-foreground sm:text-[11px]">{label}</span>
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/75 bg-white/85 px-3 py-1.5 text-[9px] font-medium text-muted-foreground shadow-sm"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
          Sincroniza · avisa · actualiza
        </div>
      </div>
    );
  }

  if (type === "crm") {
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
        <div className="mt-3 space-y-2">
          {[
            { initials: "CL", title: "Contacto nuevo", detail: "Datos e historial", tone: "bg-sky-100 text-sky-700" },
            { initials: "OP", title: "En seguimiento", detail: "Próximo paso definido", tone: "bg-brand-soft text-brand" },
            { initials: "OK", title: "Oportunidad activa", detail: "Recordatorio programado", tone: "bg-emerald-100 text-emerald-700" },
          ].map(({ initials, title, detail, tone }, index) => (
            <div key={title} className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/80 p-2.5">
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${tone}`}>{initials}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold text-foreground">{title}</span>
                <span className="block text-[9px] text-muted-foreground">{detail}</span>
              </span>
              <span className={`h-1.5 rounded-full ${index === 2 ? "w-2/5 bg-emerald-300" : index === 1 ? "w-1/3 bg-brand/35" : "w-1/4 bg-sky-300"}`} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50/80 px-3 py-2 text-[9px] font-medium text-amber-800">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />
          Próximo seguimiento: tu equipo sabe qué hacer
        </div>
      </div>
    );
  }

  return null;
}

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="sistemas"
      aria-labelledby="services-title"
      className="relative isolate overflow-clip bg-canvas px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_82%_20%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent_36%)]"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-strong">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand"
            />
            Lo que hacemos
          </p>
          <h2
            id="services-title"
            className="mt-5 max-w-[12ch] text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            Tecnología que le sigue el paso a tu negocio.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base leading-7 text-muted-foreground">
            Desde tu primera página hasta los sistemas que mueven toda tu
            operación, construimos herramientas útiles, claras y listas para
            crecer contigo.
          </p>
          <div className="mt-8 hidden items-center gap-2 text-xs font-medium text-muted-foreground lg:flex">
            <span className="flex size-7 items-center justify-center rounded-full border border-border bg-background">
              <ArrowDown aria-hidden="true" className="size-3.5 text-brand" />
            </span>
            Desliza para explorar los servicios
          </div>
        </div>

        <div className="relative pb-[15vh]">
          {services.map(
            (
              {
                number,
                eyebrow,
                title,
                description,
                tags,
                icon: Icon,
                visual,
                tint,
              },
              index,
            ) => (
              <motion.article
                key={number}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 28, scale: 0.985 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  delay: shouldReduceMotion ? 0 : 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ top: 112 + index * 18, zIndex: index + 1 }}
                className={`group sticky mb-5 flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/80 bg-gradient-to-br p-5 shadow-[0_32px_80px_-38px_oklch(0.19_0.06_258/0.28),0_8px_22px_-14px_oklch(0.19_0.06_258/0.16),inset_0_1px_0_white] backdrop-blur-2xl transition-[box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-[0_38px_90px_-36px_oklch(0.19_0.06_258/0.34),0_10px_26px_-14px_oklch(0.19_0.06_258/0.2),inset_0_1px_0_white] sm:min-h-[450px] sm:rounded-[2rem] sm:p-7 lg:min-h-[480px] lg:p-8 isolate ${tint}`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-24 z-0 size-64 rounded-full border-[28px] border-white/35 transition-transform duration-700 group-hover:scale-110"
                />

                <div className="relative z-10 grid flex-1 items-center gap-8 sm:grid-cols-[0.95fr_1.05fr] sm:gap-6">
                  <div className="flex h-full flex-col justify-center">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/80 bg-white/75 text-brand shadow-sm backdrop-blur">
                        <Icon aria-hidden="true" className="size-[18px]" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {eyebrow}
                      </span>
                      <span className="ml-auto font-mono text-xs text-muted-foreground/65">
                        {number}
                      </span>
                    </div>
                    <h3 className="mt-6 max-w-[16ch] text-balance text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-foreground">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
                      {description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[10px] font-medium text-foreground/75 shadow-sm backdrop-blur sm:text-[11px]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/65 bg-white/35 p-3 sm:min-h-[310px] sm:p-5">
                  <ServiceArtwork
                    type={visual}
                    reducedMotion={shouldReduceMotion === true}
                  />
                  </div>
                </div>
                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-foreground/5 pt-4">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    JRP Core · Soluciones digitales
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/65 text-brand shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </motion.article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
