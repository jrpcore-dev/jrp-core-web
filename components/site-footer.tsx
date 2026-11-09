import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";

const whatsappUrl =
  "https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.";
const email = "contacto@jrpstudios.dev";

/*
 * Social profiles. Add Instagram, LinkedIn, TikTok, etc. here when ready —
 * e.g. { label: "Instagram", href: "https://…", icon: FaInstagram }.
 */
const socials: { label: string; href: string; icon: IconType }[] = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61581714520643", icon: FaFacebookF },
  { label: "WhatsApp", href: whatsappUrl, icon: FaWhatsapp },
];

const linkGroups = [
  {
    title: "Servicios",
    links: [
      { label: "Páginas web", href: "/#sistemas" },
      { label: "Software a la medida", href: "/#sistemas" },
      { label: "Automatización", href: "/#sistemas" },
      { label: "CRM", href: "/#sistemas" },
    ],
  },
];

const headingClass = "font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-400";
const linkClass =
  "group inline-flex items-center gap-2 text-sm leading-6 sm:text-[15px] text-slate-300/85 transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300";

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--brand)_24%,transparent),transparent_45%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.09] [background-image:linear-gradient(rgba(160,195,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(160,195,255,0.3)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-12 pb-8 pt-16 sm:pb-10 sm:pt-20 lg:flex-row lg:items-center lg:gap-16">
        {/* Brand: left column, logo and name centered on each other */}
        <div className="flex shrink-0 flex-col items-center text-center lg:w-56">
          <Link
            href="/#soluciones"
            aria-label="JRP Core, volver al inicio"
            className="group flex flex-col items-center gap-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-8 focus-visible:ring-offset-slate-950"
          >
            <Image
              src="/jrp-core-02-icono-color-fondo-oscuro.svg"
              alt=""
              width={120}
              height={96}
              className="h-auto w-24 object-contain drop-shadow-[0_0_28px_rgb(0_150_253/0.35)] transition-transform duration-300 group-hover:scale-105 sm:w-28"
            />
            <span className="font-heading text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl">
              JRP <span className="text-sky-300">Core</span>
            </span>
          </Link>
        </div>

        {/* Links */}
        <div className="grid w-full flex-1 grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 pt-12 text-center sm:grid-cols-3 sm:gap-x-10 sm:text-left lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0 xl:gap-x-16">
          {linkGroups.map(({ title, links }) => (
            <nav key={title} aria-label={title} className="min-w-0">
              <h2 className={headingClass}>{title}</h2>
              <ul className="mt-5 space-y-3.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="min-w-0">
            <h2 className={headingClass}>Contacto</h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FaWhatsapp aria-hidden="true" className="size-4 shrink-0 text-emerald-400" />
                  +52 986 113 3052
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-sky-300" />
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 min-w-0 text-center sm:col-span-1 sm:text-left">
            <h2 className={headingClass}>Síguenos</h2>
            <ul className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`JRP Core en ${label}`}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition-[translate,color,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-sky-300/10 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col-reverse items-center gap-4 pb-8 pt-0 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span>© 2026 JRP Core. Todos los derechos reservados.</span>
          <Link
            href="/#soluciones"
            className="group hidden items-center gap-1.5 rounded-full px-2 py-1 font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:inline-flex"
          >
            Volver arriba
            <ArrowUp aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
