import {
  ArrowUpRight,
  Boxes,
  ChartNoAxesCombined,
  Code2,
  Workflow,
} from "lucide-react";

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,color-mix(in_oklab,var(--brand)_12%,transparent),transparent_38%),linear-gradient(180deg,var(--background),var(--canvas))]" />
        <div className="absolute -right-40 top-[-12rem] size-[34rem] rounded-full border border-brand/10" />
        <div className="absolute -right-20 top-[-8rem] size-[26rem] rounded-full border border-brand/10" />
        <div className="absolute -right-4 top-[-4rem] size-[18rem] rounded-full border border-brand/10" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand/15 bg-brand-soft/55 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-strong shadow-[inset_0_1px_0_oklch(1_0_0/0.65)] backdrop-blur-sm sm:text-xs">
            <span aria-hidden="true" className="size-2 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
            Ingeniería de software para negocios
          </p>

          <h1
            id="hero-title"
            className="max-w-[12ch] text-balance text-[clamp(3.15rem,7vw,6.2rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-foreground"
          >
            Tu operación,
            <span className="relative ml-[0.16em] inline-block text-brand">
              más simple.
              <span aria-hidden="true" className="absolute -bottom-1 left-1 h-1.5 w-[68%] rounded-full bg-brand/20 sm:-bottom-2 sm:h-2" />
            </span>
            <br />
            Tu negocio, listo para crecer.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Creamos sistemas propios y software a la medida para que trabajes con más orden,
            mejores datos y menos tareas manuales.
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

        <div aria-hidden="true" className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
          <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-brand/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/75 bg-white/60 p-3 shadow-[0_40px_100px_-42px_oklch(0.2_0.07_258/0.38),0_10px_28px_-18px_oklch(0.2_0.07_258/0.25),inset_0_1px_0_white] backdrop-blur-2xl sm:rounded-[2.35rem] sm:p-4">
            <div className="overflow-hidden rounded-[1.45rem] border border-border/70 bg-background/90 shadow-[0_12px_32px_-18px_oklch(0.2_0.07_258/0.2)] sm:rounded-[1.8rem]">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                    <ChartNoAxesCombined aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Panel de operación</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Vista conceptual</p>
                  </div>
                </div>
                <span className="rounded-full border border-success/15 bg-success/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-success">
                  Modular
                </span>
              </div>

              <div className="grid gap-3 p-3 sm:grid-cols-[0.78fr_1.22fr] sm:gap-4 sm:p-4">
                <div className="space-y-2 rounded-2xl border border-border/65 bg-muted/45 p-3 sm:p-3.5">
                  <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Módulos</p>
                  {[
                    { name: "Ventas", active: true },
                    { name: "Inventario", active: false },
                    { name: "Clientes", active: false },
                    { name: "Reportes", active: false },
                  ].map((item) => (
                    <div key={item.name} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[11px] font-medium ${item.active ? "bg-brand text-brand-foreground shadow-sm" : "text-muted-foreground"}`}>
                      <span className={`size-1.5 rounded-full ${item.active ? "bg-white/80" : "bg-brand/35"}`} />
                      {item.name}
                    </div>
                  ))}
                  <div className="mt-3 rounded-xl border border-brand/10 bg-brand-soft/45 p-2.5">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-brand-strong">
                      <Workflow aria-hidden="true" className="size-3.5" />
                      Flujos conectados
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-brand/10">
                      <div className="h-1 w-2/3 rounded-full bg-brand/55" />
                    </div>
                  </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-border/65 bg-surface-raised p-3.5 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Resumen del negocio</p>
                      <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">Todo en un solo lugar</p>
                    </div>
                    <span className="rounded-lg border border-border/70 px-2 py-1 text-[9px] text-muted-foreground">Vista general</span>
                  </div>
                  <div aria-hidden="true" className="mt-5 flex h-28 items-end gap-2 rounded-xl bg-gradient-to-b from-brand-soft/35 to-transparent px-2 pb-2 pt-4 sm:h-36 sm:gap-2.5">
                    {[34, 49, 41, 67, 55, 76, 63, 92, 72, 84, 61, 100].map((height, index) => (
                      <span key={index} className={`min-w-0 flex-1 rounded-t-sm ${index === 11 ? "bg-brand" : "bg-brand/25"}`} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between px-1 text-[9px] text-muted-foreground">
                    <span>Operación</span>
                    <span>Integrada</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-border/60 bg-background px-3 py-2.5">
                      <p className="text-[9px] text-muted-foreground">Procesos</p>
                      <p className="mt-1 text-xs font-semibold text-foreground">Más claros</p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background px-3 py-2.5">
                      <p className="text-[9px] text-muted-foreground">Información</p>
                      <p className="mt-1 text-xs font-semibold text-foreground">Centralizada</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-border/70 px-4 py-3 text-[10px] text-muted-foreground sm:px-5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                Diseñado alrededor de tu negocio
                <ArrowUpRight aria-hidden="true" className="ml-auto size-3.5 text-brand" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/70 bg-background/75 px-4 py-3 shadow-[0_18px_42px_-20px_oklch(0.2_0.07_258/0.32)] backdrop-blur-xl sm:flex lg:-left-8">
            <span className="flex size-8 items-center justify-center rounded-xl bg-success/10 text-success">
              <Boxes aria-hidden="true" className="size-4" />
            </span>
            <span className="text-xs font-semibold text-foreground">Tecnología que trabaja contigo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
