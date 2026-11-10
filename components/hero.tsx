import {
  ArrowUpRight,
  Boxes,
  Code2,
  Workflow,
} from "lucide-react";
import { HeroStack } from "@/components/hero-stack";
import { HeroTitle } from "@/components/hero-title";

const whatsappHref = "https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.";

const capabilities = [
  { label: "Sistemas propios", icon: Boxes },
  { label: "Desarrollo a medida", icon: Code2 },
  { label: "Procesos conectados", icon: Workflow },
];

export function Hero() {
  return (
    <section
      id="soluciones"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh_-_5.5rem)] scroll-mt-28 items-center overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,color-mix(in_oklab,var(--brand)_12%,transparent),transparent_38%)]" />
        <div className="absolute -right-40 top-[-12rem] size-[34rem] rounded-full border border-brand/10" />
        <div className="absolute -right-20 top-[-8rem] size-[26rem] rounded-full border border-brand/10" />
        <div className="absolute -right-4 top-[-4rem] size-[18rem] rounded-full border border-brand/10" />
      </div>

      <div data-hero-root className="mx-auto w-full max-w-6xl">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand/15 bg-brand-soft/55 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-strong shadow-[inset_0_1px_0_oklch(1_0_0/0.65)] backdrop-blur-sm sm:text-xs">
            <span aria-hidden="true" className="size-2 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
            Ingeniería de software para negocios
          </p>

          <HeroTitle />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="relative z-10 max-w-xl">
            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Desde páginas web hasta sistemas de ventas, inventario y clientes: creamos las
              herramientas que ordenan tu operación y te ayudan a vender más.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--brand)_65%,transparent),inset_0_1px_0_oklch(1_0_0/0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-[0_18px_36px_-12px_color-mix(in_oklab,var(--brand)_72%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Hablemos de tu proyecto
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="mailto:contacto@jrpstudios.dev"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border/80 bg-surface-raised/55 px-5 text-sm font-medium text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.75)] backdrop-blur-sm transition-colors hover:border-brand/25 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Escríbenos por correo
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-5">
              {capabilities.map(({ label, icon: Icon }) => (
                <li key={label} className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-[13px]">
                  <Icon aria-hidden="true" className="size-4 text-brand/80" strokeWidth={1.8} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:mt-[calc(var(--hero-tail-height,10rem)*-1)]">
            <HeroStack />
          </div>
        </div>
      </div>
    </section>
  );
}
