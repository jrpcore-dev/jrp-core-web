"use client";

import Image from "next/image";
import { BARBER_FEATURES } from "@/lib/product-features";
import {
  Scissors,
  ArrowRight,
  CalendarCheck,
  Smartphone,
  Users,
  DollarSign
} from 'lucide-react';
import { ScrollReveal, SectionEyebrow } from "@/components/product-page-shared";

export function ProductBarber() {
  return (
    <section id="barber-pos" className="relative overflow-hidden py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <ScrollReveal yOffset={28}>
          <div className="mb-12 max-w-3xl sm:mb-16">
            <SectionEyebrow className="mb-4">Barberías y estéticas</SectionEyebrow>
            <h2 className="font-heading text-[clamp(34px,4.6vw,56px)] text-[#121722] [text-wrap:balance]">
              Barbería: Gestión inteligente de citas, comisiones y venta cruzada.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-[#777c86]">
              Elimina las cancelaciones de último momento y los desacuerdos en el pago a estilistas. Un software todo en uno que coordina los sillones de trabajo, agenda citas sincronizadas y cobra los productos para barba y cabello en una sola pantalla.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Capabilities Column */}
          <div className="order-2 flex flex-col justify-between space-y-3 lg:order-1 lg:col-span-5">
            {BARBER_FEATURES.map((feat, idx) => (
              <ScrollReveal key={idx} delay={0.1 + idx * 0.08} yOffset={20}>
                <div className="rounded-[16px] border border-[#dce7f0] bg-[#f4f8fc] p-5 transition-colors hover:bg-[#e8f7fc]">
                  <div className="mb-1.5 flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-white text-[11px] font-semibold text-[#0068f9]">
                      {idx + 1}
                    </span>
                    <h4 className="text-[15px] font-semibold tracking-tight text-[#121722]">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="pl-9 text-[13px] leading-relaxed text-[#777c86]">
                    {feat.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Quick summary highlights */}
            <ScrollReveal delay={0.4} yOffset={16}>
              <div className="grid grid-cols-2 gap-3 rounded-[16px] border border-[#efefef] bg-white p-4 text-[12px]">
                {[
                  { Icon: CalendarCheck, label: 'Cero citas empalmadas', tint: '#0068f9' },
                  { Icon: DollarSign, label: 'Comisiones exactas', tint: '#046645' },
                  { Icon: Smartphone, label: 'Acceso móvil para barberos', tint: '#0074dd' },
                  { Icon: Users, label: 'Historial de cada cliente', tint: '#0068f9' },
                ].map(({ Icon, label, tint }) => (
                  <div key={label} className="flex items-center gap-2 font-medium text-[#121722]">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#e8f7fc]"
                      style={{ color: tint }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Image Column */}
          <div className="order-1 flex flex-col lg:order-2 lg:col-span-7">
            <ScrollReveal delay={0.15} yOffset={32} className="h-full">
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-[16px] border border-[#efefef] bg-white shadow-[0_18px_40px_-24px_rgba(7,27,58,0.25)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#dce7f0] bg-[#dceef8]">
                  <Image
                    src="/barbershop-showcase.jpg"
                    alt="Software de gestión de citas y ventas para barberías"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-[100px] border border-[#efefef] bg-white px-3 py-1.5 text-[12px] font-medium text-[#121722] shadow-[0_8px_24px_-14px_rgba(7,27,58,0.35)]">
                    <Scissors className="h-4 w-4 text-[#0074dd]" />
                    <span>Control de agenda en tablet y smartphone</span>
                  </div>
                </div>

                <div className="space-y-4 p-6 sm:p-7">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#121722]">Solución Integral Barber Pro</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#777c86]">
                        Barberías tradicionales, salones de grooming masculino y cadenas de estética
                      </p>
                    </div>
                    <a
                      href="#contacto"
                      className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[48px] bg-[#0068f9] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#024bb1] active:scale-[0.98]"
                    >
                      <span>Cotizar para mi Barbería</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
