"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  Package,
  Scissors,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    id: "vendia",
    name: "Vendia",
    category: "Punto de venta para comercios",
    title: "Cada venta, cada producto y cada corte en orden.",
    description:
      "Organiza la caja, el inventario y los servicios de tu comercio desde un sistema hecho para el ritmo del día a día.",
    benefits: ["Ventas e inventario", "Cortes por cajero", "Recargas y servicios"],
    icon: ShoppingCart,
    prompt: "Hola JRP Core, me interesa conocer Vendia para mi negocio.",
  },
  {
    id: "barberia",
    name: "Barbería",
    category: "Gestión para barberías",
    title: "Agenda y operación trabajando en equipo.",
    description:
      "Coordina citas, servicios y comisiones en una herramienta pensada para la operación diaria de una barbería.",
    benefits: ["Agenda por estación", "Comisiones claras", "Historial de clientes"],
    icon: Scissors,
    prompt: "Hola JRP Core, me interesa conocer su sistema para barberías.",
  },
] as const;

function VendiaScreen({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(92px,0.72fr)] bg-slate-50 text-slate-700 sm:grid-cols-[minmax(0,1fr)_minmax(128px,0.72fr)]">
      <div className="min-w-0 p-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[8px] font-semibold text-slate-800 sm:text-[10px]">Catálogo</p>
            <p className="mt-0.5 text-[6px] text-slate-400 sm:text-[8px]">Productos disponibles</p>
          </div>
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[6px] text-slate-400 sm:text-[8px]">Buscar producto</span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-4 sm:gap-2">
          {[
            { label: "Abarrotes", icon: Package },
            { label: "Bebidas", icon: CircleDollarSign },
            { label: "Limpieza", icon: Package },
            { label: "Otros", icon: Package },
          ].map(({ label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.07 }}
              className={`rounded-md border p-1.5 sm:rounded-lg sm:p-2 ${index === 0 ? "border-brand/35 bg-brand-soft/60" : "border-slate-200 bg-white"}`}
            >
              <span className="flex aspect-[1.8] items-center justify-center rounded bg-slate-100/80 text-brand/75">
                <Icon aria-hidden="true" className="size-3 sm:size-4" />
              </span>
              <span className="mt-1 block text-[6px] font-medium text-slate-500 sm:text-[8px]">{label}</span>
              <span className="mt-1 block h-1 w-2/3 rounded-full bg-slate-200" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col border-l border-slate-200 bg-white p-2.5 sm:p-4">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <ShoppingCart aria-hidden="true" className="size-3 text-brand sm:size-4" />
          <span className="text-[7px] font-semibold text-slate-700 sm:text-[9px]">Venta actual</span>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.35 }}
          className="mt-2 rounded-md bg-brand-soft/50 p-1.5 sm:mt-3 sm:rounded-lg sm:p-2"
        >
          <span className="block text-[6px] font-medium text-slate-700 sm:text-[8px]">Producto agregado</span>
          <span className="mt-1 block h-1 w-4/5 rounded-full bg-slate-300" />
          <span className="mt-1 block h-1 w-1/2 rounded-full bg-slate-200" />
        </motion.div>
        <div className="mt-auto pt-2 sm:pt-3">
          <div className="mb-1.5 flex justify-between text-[6px] text-slate-400 sm:text-[8px]">
            <span>Total</span>
            <span>Calculado en caja</span>
          </div>
          <motion.div
            initial={reduceMotion ? false : { scale: 0.96, opacity: 0.7 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.55 }}
            className="flex items-center justify-center gap-1 rounded-md bg-brand px-1.5 py-1.5 text-[6px] font-semibold text-white shadow-[0_5px_12px_-7px_var(--brand)] sm:rounded-lg sm:py-2 sm:text-[8px]"
          >
            <Check aria-hidden="true" className="size-2.5 sm:size-3" />
            Cobrar
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function BarberiaScreen({ reduceMotion }: { reduceMotion: boolean }) {
  const times = ["09:00", "10:00", "11:00", "12:00"];
  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(92px,0.72fr)] bg-slate-50 text-slate-700 sm:grid-cols-[minmax(0,1fr)_minmax(128px,0.72fr)]">
      <div className="min-w-0 p-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[8px] font-semibold text-slate-800 sm:text-[10px]">Agenda de hoy</p>
            <p className="mt-0.5 text-[6px] text-slate-400 sm:text-[8px]">Estaciones y citas</p>
          </div>
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[6px] text-slate-400 sm:text-[8px]">Semana</span>
        </div>
        <div className="mt-2.5 grid grid-cols-[28px_repeat(4,minmax(0,1fr))] gap-1 sm:mt-4 sm:grid-cols-[36px_repeat(4,minmax(0,1fr))] sm:gap-1.5">
          <span />
          {["Lun", "Mar", "Mié", "Jue"].map((day, index) => (
            <span key={day} className={`rounded-sm py-1 text-center text-[6px] font-medium sm:rounded-md sm:text-[8px] ${index === 1 ? "bg-brand text-white" : "bg-white text-slate-400"}`}>{day}</span>
          ))}
          {times.map((time, row) => (
            <div key={time} className="contents">
              <span className="py-1 text-[6px] text-slate-400 sm:text-[8px]">{time}</span>
              {[0, 1, 2, 3].map((column) => {
                const selected = row === 1 && column === 1;
                return (
                  <span
                    key={column}
                    className={`relative h-8 rounded-sm border sm:h-10 sm:rounded-md ${selected ? "border-brand/30 bg-brand-soft/60" : "border-slate-200/80 bg-white"}`}
                  >
                    {selected && (
                      <motion.span
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: 4 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.35 }}
                        className="absolute inset-x-0.5 top-0.5 flex h-[calc(100%_-_0.25rem)] items-center justify-center rounded-sm bg-brand px-0.5 text-[5px] font-medium leading-tight text-white sm:inset-x-1 sm:top-1 sm:h-[calc(100%_-_0.5rem)] sm:rounded-md sm:text-[7px]"
                      >
                        Cita
                      </motion.span>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col border-l border-slate-200 bg-white p-2.5 sm:p-4">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <CalendarDays aria-hidden="true" className="size-3 text-brand sm:size-4" />
          <span className="text-[7px] font-semibold text-slate-700 sm:text-[9px]">Nueva cita</span>
        </div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.5 }}
          className="mt-2 flex items-center gap-1.5 rounded-md bg-brand-soft/50 p-1.5 sm:mt-3 sm:gap-2 sm:rounded-lg sm:p-2"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-brand sm:size-8">
            <UserRound aria-hidden="true" className="size-3 sm:size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[6px] font-semibold text-slate-700 sm:text-[8px]">Cliente</span>
            <span className="block truncate text-[5px] text-slate-400 sm:text-[7px]">Servicio seleccionado</span>
          </span>
        </motion.div>
        <div className="mt-2 flex items-center gap-1 text-[6px] text-slate-400 sm:mt-3 sm:text-[8px]">
          <Clock3 aria-hidden="true" className="size-2.5 sm:size-3" />
          Horario disponible
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2 text-[6px] text-slate-500 sm:pt-3 sm:text-[8px]">
          <span>Confirmar cita</span>
          <span className="flex size-5 items-center justify-center rounded-md bg-brand text-white sm:size-6">
            <Check aria-hidden="true" className="size-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

function LaptopDemo({
  product,
  reduceMotion,
}: {
  product: "vendia" | "barberia";
  reduceMotion: boolean;
}) {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[36rem]">
      <div className="rounded-t-[1rem] border-[5px] border-b-0 border-slate-800 bg-slate-800 p-1.5 shadow-[0_24px_52px_-26px_oklch(0.17_0.04_258/0.5)] sm:rounded-t-[1.35rem] sm:border-[7px] sm:p-2">
        <div className="mb-1.5 flex items-center gap-1 sm:mb-2">
          <span className="size-1.5 rounded-full bg-rose-300 sm:size-2" />
          <span className="size-1.5 rounded-full bg-amber-300 sm:size-2" />
          <span className="size-1.5 rounded-full bg-emerald-300 sm:size-2" />
          <span className="ml-2 flex h-3 flex-1 items-center rounded bg-slate-700/80 px-2 text-[5px] text-slate-400 sm:h-4 sm:text-[7px]">
            {product === "vendia" ? "app.vendia" : "agenda.barberia"}
          </span>
        </div>
        <div className="aspect-[16/9] overflow-hidden rounded-sm bg-white sm:rounded-md">
          {product === "vendia" ? (
            <VendiaScreen reduceMotion={reduceMotion} />
          ) : (
            <BarberiaScreen reduceMotion={reduceMotion} />
          )}
        </div>
      </div>
      <div className="relative mx-auto h-2.5 w-[108%] -translate-x-[3.7%] rounded-b-[45%] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-[0_14px_24px_-16px_oklch(0.17_0.04_258/0.6)] sm:h-3">
        <span className="absolute left-1/2 top-0 h-1 w-[22%] -translate-x-1/2 rounded-b-md bg-slate-500/60" />
      </div>
    </div>
  );
}

const whatsappHref = (prompt: string) =>
  `https://wa.me/529861133052?text=${encodeURIComponent(prompt)}`;

export function ProductShowcase() {
  const shouldReduceMotion = useReducedMotion() === true;

  return (
    <section
      id="productos"
      aria-labelledby="products-title"
      className="relative isolate overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_35%_at_50%_30%,color-mix(in_oklab,var(--brand)_7%,transparent),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-brand/60" />
              Productos JRP Core
            </span>
            <h2 id="products-title" className="mt-4 text-balance text-[clamp(2rem,4vw,3.15rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-foreground">
              Soluciones propias para operaciones distintas.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Conoce Vendia para comercios y nuestro sistema de gestión para barberías.
          </p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {products.map(({ id, name, category, title, description, benefits, icon: Icon, prompt }, index) => (
            <motion.article
              key={id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-border/65 bg-gradient-to-br from-surface-raised via-background to-brand-soft/35 p-3 shadow-[0_24px_65px_-38px_oklch(0.19_0.06_258/0.24)] transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_34px_76px_-36px_oklch(0.19_0.06_258/0.32)] sm:rounded-[2rem] sm:p-4"
            >
              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/65 bg-gradient-to-br from-brand-soft/60 via-white/70 to-accent/50 px-3 pb-5 pt-6 sm:rounded-[1.6rem] sm:px-6 sm:pb-7 sm:pt-8">
                <div aria-hidden="true" className="absolute -right-12 -top-16 size-44 rounded-full border-[18px] border-white/35" />
                <div className="relative z-10 mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground/70 shadow-sm backdrop-blur sm:mb-6 sm:text-[10px]">
                  <Icon aria-hidden="true" className="size-3.5 text-brand" />
                  {category}
                </div>
                <LaptopDemo product={id} reduceMotion={shouldReduceMotion} />
                <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[8px] font-medium text-muted-foreground shadow-sm backdrop-blur sm:bottom-4 sm:right-4">
                  <span className="size-1.5 rounded-full bg-success" />
                  Vista conceptual
                </div>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5 sm:pb-5 sm:pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand">
                      Producto propio
                    </p>
                    <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.05em] text-foreground">
                      {name}
                    </h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/70 text-brand shadow-sm">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium leading-6 text-foreground/85">
                  {title}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                  {description}
                </p>
                <ul className="mt-5 grid gap-2 border-t border-border/60 pt-4 sm:grid-cols-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-[11px] leading-snug text-muted-foreground">
                      <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-brand" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappHref(prompt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/action relative z-40 mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-brand px-5 text-xs font-semibold text-brand-foreground shadow-[0_10px_22px_-12px_var(--brand)] transition-[translate,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_14px_26px_-12px_var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Consultar sobre {name}
                  <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover/action:translate-x-0.5" />
                </a>
              </div>
              <Link
                href={`/${id}`}
                aria-label={`Conocer ${name}`}
                className="absolute inset-0 z-30 rounded-[1.8rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:rounded-[2rem]"
              >
                <span className="sr-only">Ver detalles de {name}</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
