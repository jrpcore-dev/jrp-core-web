"use client";

import { motion } from "framer-motion";
import { VENDIA_FEATURES } from "@/lib/product-features";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Monitor,
  Printer,
  ScanBarcode,
  ShoppingCart,
  Smartphone,
} from 'lucide-react';
import { ScrollReveal, SectionEyebrow } from "@/components/product-page-shared";

const GRAPHICS = {
  services: {
    accent: '#0068f9',
    background: '#dceef8',
    Icon: Smartphone,
    eyebrow: 'Servicios conectados',
  },
  sales: {
    accent: '#0074dd',
    background: '#e8f7fc',
    Icon: ShoppingCart,
    eyebrow: 'Operación en caja',
  },
  inventory: {
    accent: '#046645',
    background: '#e3f2ef',
    Icon: Boxes,
    eyebrow: 'Existencias al día',
  },
  reports: {
    accent: '#0074dd',
    background: '#dceef8',
    Icon: BarChart3,
    eyebrow: 'Lectura del negocio',
  },
} as const;

const FeatureGraphic = ({ type, index }: { type: string; index: number }) => {
  const graphic = GRAPHICS[type as keyof typeof GRAPHICS] ?? GRAPHICS.services;
  const { Icon } = graphic;

  return (
    <div className="relative mt-7 min-h-[150px] overflow-hidden rounded-[24px] p-4" style={{ backgroundColor: graphic.background }}>
      <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full border-[18px] opacity-25" style={{ borderColor: graphic.accent }} />
      <div className="relative z-10 flex items-center justify-between text-[11px] font-medium" style={{ color: graphic.accent }}>
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {graphic.eyebrow}
        </span>
        <span>0{index + 1}</span>
      </div>

      {type === 'services' && (
        <motion.div
          initial={{ x: 28, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[16px] bg-white/80 p-3 backdrop-blur-sm"
        >
          <div>
            <span className="block text-[10px] text-[#777c86]">Nueva recarga</span>
            <span className="text-[15px] font-semibold text-[#121722]">Telcel · $200</span>
          </div>
          <span className="rounded-full px-2 py-1 text-[10px] font-semibold text-white" style={{ backgroundColor: graphic.accent }}>Lista</span>
        </motion.div>
      )}

      {type === 'sales' && (
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
          {[['Caja 01', '$1,240'], ['Caja 02', '$860'], ['Caja 03', '$2,410']].map(([label, amount], itemIndex) => (
            <motion.div
              key={label}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: 0.15 + itemIndex * 0.1 }}
              className="rounded-[12px] bg-white/80 p-2 backdrop-blur-sm"
            >
              <span className="block text-[9px] text-[#777c86]">{label}</span>
              <span className="text-[12px] font-semibold text-[#121722]">{amount}</span>
            </motion.div>
          ))}
        </div>
      )}

      {type === 'inventory' && (
        <div className="absolute bottom-4 left-4 right-4 space-y-2 rounded-[16px] bg-white/75 p-3 backdrop-blur-sm">
          {['Leche entera', 'Café molido', 'Pan dulce'].map((product, itemIndex) => (
            <div key={product} className="flex items-center gap-2 text-[10px] text-[#121722]">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: graphic.accent }} />
              <span className="flex-1">{product}</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${55 + itemIndex * 18}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: itemIndex * 0.12 }}
                className="h-1.5 rounded-full"
                style={{ backgroundColor: graphic.accent }}
              />
            </div>
          ))}
        </div>
      )}

      {type === 'reports' && (
        <div className="absolute bottom-4 left-4 right-4 flex h-[82px] items-end gap-2 rounded-[16px] bg-white/75 px-4 pb-3 pt-4 backdrop-blur-sm">
          {[34, 48, 41, 66, 54, 76, 62].map((height, barIndex) => (
            <motion.span
              key={barIndex}
              initial={{ height: 0 }}
              whileInView={{ height }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: barIndex * 0.06 }}
              className="flex-1 rounded-t-[5px]"
              style={{ backgroundColor: graphic.accent }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HardwareScene = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#dceef8] p-5 sm:min-h-[410px] sm:p-8"
  >
    <div
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 104, 249, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 104, 249, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
    <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0068f9]">
      <span>El ecosistema Vendia</span>
      <span className="rounded-full bg-white/70 px-3 py-1 text-[#046645]">Conectado</span>
    </div>

    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute left-[17%] top-[27%] w-[56%]"
    >
      <div className="rounded-[14px] bg-[#121722] p-2 shadow-[0_20px_40px_rgba(18,23,34,0.16)]">
        <div className="aspect-[16/9] rounded-[8px] bg-[#ffffff] p-3 sm:p-5">
          <div className="flex items-center justify-between border-b border-[#efefef] pb-2 text-[9px] text-[#777c86] sm:text-[11px]">
            <span className="font-semibold text-[#121722]">Caja principal</span>
            <span className="text-[#046645]">Operativa</span>
          </div>
          <div className="mt-3 grid grid-cols-[1.25fr_0.75fr] gap-2 sm:mt-5 sm:gap-3">
            <div className="space-y-2">
              {[['Leche entera', '$28.00'], ['Café molido', '$86.00'], ['Pan dulce', '$42.00']].map(([label, amount]) => (
                <div key={label} className="flex items-center justify-between rounded-[6px] bg-white px-2 py-1.5 text-[8px] text-[#777c86] sm:px-3 sm:py-2 sm:text-[10px]">
                  <span>{label}</span>
                  <span className="font-medium text-[#121722]">{amount}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[8px] bg-[#e8f7fc] p-2 sm:p-3">
              <span className="block text-[8px] text-[#777c86] sm:text-[10px]">Total</span>
              <span className="mt-1 block text-[16px] font-semibold text-[#121722] sm:text-[22px]">$156</span>
              <span className="mt-3 block h-1.5 rounded-full bg-[#0068f9] sm:mt-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-5 w-1/4 bg-[#121722] sm:h-7" />
      <div className="mx-auto h-2 w-2/5 rounded-full bg-[#121722]" />
    </motion.div>

    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      className="absolute bottom-[13%] right-[8%] w-[23%] min-w-[74px]"
    >
      <div className="rounded-[10px] bg-[#ffffff] p-2 shadow-[0_14px_26px_rgba(18,23,34,0.13)] sm:p-3">
        <div className="mb-2 flex items-center justify-between text-[#777c86]">
          <Printer className="h-4 w-4" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#046645]" />
        </div>
        <div className="h-1 rounded-full bg-[#a5a5a5]" />
        <div className="mt-1 h-1 w-3/4 rounded-full bg-[#a5a5a5]" />
      </div>
      <div className="mx-auto h-4 w-4/5 bg-white shadow-sm sm:h-5" />
    </motion.div>

    <motion.div
      animate={{ rotate: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute bottom-[12%] left-[5%] w-[19%] min-w-[68px]"
    >
      <div className="relative h-[70px] rounded-[34px_12px_12px_34px] bg-[#121722] p-2 shadow-[0_14px_26px_rgba(18,23,34,0.13)] sm:h-[88px] sm:p-3">
        <div className="h-full rounded-[26px_7px_7px_26px] border-2 border-[#777c86] bg-[#2d2d2d]" />
        <ScanBarcode className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
    </motion.div>

    <div className="absolute bottom-[6%] left-[7%] text-[10px] font-medium text-[#121722] sm:bottom-[4%] sm:left-[8%] sm:text-[12px]">
      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0074dd]" />
      Scanner de códigos
    </div>
    <div className="absolute right-[5%] top-[16%] text-right text-[10px] font-medium text-[#121722] sm:right-[8%] sm:top-[18%] sm:text-[12px]">
      <span className="mb-1 ml-auto block h-8 w-px bg-[#0068f9] sm:h-12" />
      Computadora de caja
    </div>
    <div className="absolute bottom-[5%] right-[6%] text-[10px] font-medium text-[#121722] sm:right-[9%] sm:text-[12px]">
      Impresora térmica
      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#046645]" />
    </div>
  </motion.div>
);

export function ProductVendia() {
  return (
    <section id="vendia-pos" className="relative overflow-hidden bg-[#f4f8fc] py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <ScrollReveal yOffset={28}>
          <div className="mb-12 max-w-3xl sm:mb-16">
            <SectionEyebrow className="mb-4">Vendia · Punto de venta</SectionEyebrow>
            <h2 className="font-heading text-[clamp(34px,4.6vw,56px)] text-[#121722] [text-wrap:balance]">
              Vendia: Velocidad en caja, inventarios precisos y cero pérdidas.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-[#777c86]">
              Diseñado para erradicar las filas lentas y los descuadres de corte. Vendia combina una arquitectura ligera con compatibilidad total con lectores de código de barras, cajones de dinero, básculas e impresoras de tickets térmicos.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento capabilities canvas */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          {VENDIA_FEATURES.map((feat, idx) => {
            const isFromLeft = idx % 2 === 0;
            const spanClass = idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <ScrollReveal
                key={feat.title}
                delay={0.08 + idx * 0.1}
                yOffset={22}
                xOffset={isFromLeft ? -90 : 90}
                viewportAmount={0.25}
                className={`${spanClass} ${idx > 1 ? 'lg:mt-1' : ''}`}
              >
                <div className="h-full rounded-[28px] p-6 sm:p-8" style={{ backgroundColor: GRAPHICS[feat.visual as keyof typeof GRAPHICS]?.background ?? '#dceef8' }}>
                  <div className="flex items-start justify-between gap-5">
                    <div className="max-w-[360px]">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#777c86]">Funcionalidad {String(idx + 1).padStart(2, '0')}</span>
                      <h3 className="mt-3 font-heading text-[clamp(25px,3vw,40px)] leading-[1.05] text-[#121722] [text-wrap:balance]">{feat.title}</h3>
                      <p className="mt-3 max-w-[420px] text-[14px] leading-[1.55] text-[#4f5963]">{feat.description}</p>
                    </div>
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70 text-[13px] font-semibold text-[#121722] sm:flex">0{idx + 1}</span>
                  </div>
                  <FeatureGraphic type={feat.visual} index={idx} />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal delay={0.1} yOffset={28} className="lg:col-span-7">
            <HardwareScene />
          </ScrollReveal>
          <ScrollReveal delay={0.18} yOffset={28} className="lg:col-span-5">
            <div className="flex flex-col items-start gap-4">
              <div>
                <h3 className="text-[20px] font-semibold text-[#121722]">Vendia para comercios que no se detienen</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#777c86]">Abarrotes, minimarkets, tiendas de conveniencia, papelerías y refaccionarias.</p>
              </div>
              <a
                href="#contacto"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[48px] bg-[#0068f9] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#024bb1] active:scale-[0.98]"
              >
                <span>Cotizar Vendia</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
