"use client";

import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Code2, Home, Mail, Scissors, Store } from 'lucide-react';

const QUICK_CARDS = [
  {
    label: 'Vendia POS',
    description: 'Punto de venta para comercios',
    href: '/vendia',
    icon: Store,
    background: '#0068f9',
    foreground: '#ffffff',
    rotation: -6,
    position: 'xl:left-0 xl:top-[14%]',
    delay: 0.12,
  },
  {
    label: 'Barbería POS',
    description: 'Citas, sillones y comisiones',
    href: '/barberia',
    icon: Scissors,
    background: '#6736eb',
    foreground: '#ffffff',
    rotation: 5,
    position: 'xl:right-0 xl:top-[8%]',
    delay: 0.18,
  },
  {
    label: 'Sistemas a medida',
    description: 'Software para tu operación',
    href: '/#sistemas',
    icon: Code2,
    background: '#046645',
    foreground: '#ffffff',
    rotation: 4,
    position: 'xl:bottom-[12%] xl:left-[3%]',
    delay: 0.24,
  },
  {
    label: 'Hablemos',
    description: 'Cuéntanos qué estabas buscando',
    href: '/#contacto',
    icon: Mail,
    background: '#f4f0ff',
    foreground: '#121722',
    rotation: -4,
    position: 'xl:bottom-[16%] xl:right-[2%]',
    delay: 0.3,
  },
];

export default function NotFound() {
  return (
    <MotionConfig reducedMotion="user">
      <title>404 | JRP Core</title>
      <main className="relative min-h-screen overflow-hidden text-[#121722] selection:bg-[#0068f9]/20 selection:text-[#121722]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#f4f8fc_0%,#ffffff_45%,#e8f7fc_78%,#dceef8_100%)]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,104,249,0.10) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 42%, black 0%, transparent 72%)',
              maskImage: 'radial-gradient(ellipse at 50% 42%, black 0%, transparent 72%)',
            }}
          />
          <div className="absolute -top-36 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#0068f9]/10 blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full bg-[#6736eb]/10 blur-[110px]" />
          <div className="absolute -right-20 top-1/3 h-[300px] w-[300px] rounded-full bg-[#046645]/10 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-5 py-6 sm:px-8">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <a
              href="/"
              aria-label="Ir a la página principal de JRP Core"
              className="inline-flex items-center text-[17px] font-semibold tracking-tight text-[#121722]"
            >
              <span className="flex items-center gap-2.5">
                <Image src="/jrp-mark.png" alt="" width={42} height={42} className="size-10 object-contain" />
                <span className="font-semibold">JRP <span className="text-[#0068f9]">Core</span></span>
              </span>
            </a>

            <div className="inline-flex items-center gap-2 rounded-[100px] border border-[#dce7f0] bg-white/80 px-3 py-1.5 text-[11px] font-medium text-[#777c86] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0068f9] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0068f9]" />
              </span>
              Estado: ruta no encontrada
            </div>
          </header>

          <section className="relative flex flex-1 flex-col items-center justify-center py-14 xl:min-h-[640px] xl:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-[100px] border border-[#dce7f0] bg-white/80 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#0074dd] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0068f9]" />
                Error 404
              </div>

              <h1
                aria-label="Error 404"
        className="mt-6 font-heading text-[clamp(120px,26vw,260px)] leading-[0.78] tracking-[-0.08em] text-[#121722]"
              >
                4<span className="text-[#0068f9]">0</span>4
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-[1.65] text-[#777c86] sm:text-[16px]">
                La ruta que buscas no existe, cambió de lugar o nunca estuvo aquí. No es tu culpa:
                a veces el código también se esconde.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-[48px] bg-[#0068f9] px-5 py-3 text-[13px] font-medium text-white shadow-[0_16px_34px_-16px_rgba(0,104,249,0.95)] transition-colors hover:bg-[#024bb1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068f9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f8fc]"
                >
                  <Home className="h-4 w-4" />
                  Volver al inicio
                </a>
                <a
                  href="/#contacto"
                  className="group inline-flex items-center justify-center gap-2 rounded-[48px] border border-[#dce7f0] bg-white/80 px-5 py-3 text-[13px] font-medium text-[#121722] backdrop-blur transition-colors hover:border-[#0068f9]/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068f9]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f8fc]"
                >
                  Hablemos de tu proyecto
                  <ArrowUpRight className="h-4 w-4 text-[#0068f9] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a5a5a5]">
                <span>JRP Core</span>
                <span className="h-1 w-1 rounded-full bg-[#dce7f0]" />
                <span>Software que sí aparece</span>
              </div>
            </motion.div>

            <div className="relative mt-12 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 xl:pointer-events-none xl:absolute xl:inset-0 xl:mt-0 xl:block xl:max-w-none">
              {QUICK_CARDS.map((card) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  initial={{ opacity: 0, y: 18, rotate: card.rotation }}
                  animate={{ opacity: 1, y: 0, rotate: card.rotation }}
                  whileHover={{ y: -6, rotate: 0 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.5, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
                  className={`pointer-events-auto flex w-full flex-col justify-between gap-5 rounded-[18px] border border-white/25 p-4 text-left shadow-[0_24px_50px_-30px_rgba(7,27,58,0.55)] xl:absolute xl:w-[210px] ${card.position}`}
                  style={{ backgroundColor: card.background, color: card.foreground }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      <card.icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  </div>
                  <div>
                    <span className="block text-[13px] font-semibold tracking-tight">{card.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug opacity-70">
                      {card.description}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          <p className="sr-only">ERR:404_NOT_FOUND</p>
        </div>
      </main>
    </MotionConfig>
  );
}
