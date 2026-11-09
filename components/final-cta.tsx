import { ArrowUpRight, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const whatsappUrl =
  "https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.";

/** Closing call to action at the end of the page, right before the footer. */
export function FinalCta() {
  return (
    <section
      id="contacto"
      aria-labelledby="final-cta-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-background px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent_60%)]"
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="final-cta-title"
          className="text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1] tracking-[-0.045em] text-foreground"
        >
          ¿Tienes un proyecto{" "}
          <span className="bg-gradient-to-r from-[#0063FD] to-[#00B4FD] bg-clip-text pr-[0.06em] font-accent font-normal italic tracking-[-0.02em] text-transparent">
            en mente
          </span>
          ?
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Cuéntanos qué necesita tu negocio. Te respondemos y te ayudamos a encontrar el siguiente
          paso, sin compromiso.
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--brand)_65%,transparent)] transition-all hover:-translate-y-0.5 hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <FaWhatsapp aria-hidden="true" className="size-[18px]" />
            Escríbenos por WhatsApp
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="mailto:contacto@jrpstudios.dev"
            className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-border/80 bg-surface-raised/60 px-7 text-sm font-medium text-foreground transition-colors hover:border-brand/25 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Mail aria-hidden="true" className="size-4 text-brand" />
            Enviar un correo
          </a>
        </div>
      </div>
    </section>
  );
}
