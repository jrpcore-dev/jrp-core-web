import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";

const whatsappUrl =
  "https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.";

const footerLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#sistemas" },
  { label: "Ecosistema JRP", href: "/#ecosistema" },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_14%_0%,color-mix(in_oklab,var(--brand)_22%,transparent),transparent_36%),linear-gradient(135deg,transparent_40%,color-mix(in_oklab,var(--brand)_10%,transparent))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.09] [background-image:linear-gradient(rgba(160,195,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(160,195,255,0.3)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />
      <Image
        aria-hidden="true"
        src="/jrp-core-02-icono-color-fondo-oscuro.svg"
        alt=""
        width={440}
        height={440}
        className="pointer-events-none absolute -bottom-32 -right-24 z-0 size-[22rem] select-none object-contain opacity-[0.12] [filter:brightness(0)_invert(1)] sm:-bottom-40 sm:-right-16 sm:size-[30rem]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <Link
              href="/#soluciones"
              aria-label="JRP Core, volver al inicio"
              className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              <Image
                src="/jrp-core-02-icono-color-fondo-oscuro.svg"
                alt=""
                width={44}
                height={44}
                className="size-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-semibold tracking-[-0.045em] text-white">
                JRP <span className="text-sky-300">Core</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300/70">
              Estudio de ingeniería de software. Creamos productos propios y soluciones
              digitales a la medida de cada negocio.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/profile.php?id=61581714520643"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JRP Core en Facebook"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[translate,color,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-sky-300/10 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <FaFacebookF aria-hidden="true" className="size-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JRP Core en WhatsApp"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[translate,color,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-emerald-300/10 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <FaWhatsapp aria-hidden="true" className="size-[17px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Enlaces del sitio">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.17em] text-sky-200">
              Explora
            </h2>
            <ul className="mt-4 space-y-3">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-200/70 transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 text-sky-300/0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.17em] text-sky-200">
              Hablemos
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-200/65">
              Cuéntanos qué necesita tu negocio y encontraremos el siguiente paso.
            </p>
            <a
              href="mailto:contacto@jrpstudios.dev"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-100/85 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Mail aria-hidden="true" className="size-4 text-sky-200" />
              contacto@jrpstudios.dev
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-[11px] text-slate-300/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} JRP Core. Todos los derechos reservados.</span>
          <Link
            href="/#soluciones"
            className="inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-1 font-medium text-slate-200/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            Volver al inicio
            <ArrowUpRight aria-hidden="true" className="size-3.5 -rotate-45" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
