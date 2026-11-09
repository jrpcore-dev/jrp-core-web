"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const whatsappUrl =
  "https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.";

const links = [
  { label: "Inicio", href: "#soluciones", id: "soluciones" },
  { label: "Servicios", href: "#sistemas", id: "sistemas" },
  { label: "Ecosistema", href: "#ecosistema", id: "ecosistema" },
  { label: "Productos", href: "#productos", id: "productos" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("soluciones");
  const [hovered, setHovered] = useState<string | null>(null);
  const reducedMotion = useReducedMotion() === true;


  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`relative border-b px-5 transition-[background-color,border-color,box-shadow] duration-300 sm:px-8 lg:px-10 ${
          scrolled
            ? "border-border/60 bg-background/80 shadow-[0_10px_30px_-24px_oklch(0.19_0.06_258/0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 transition-[height] duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/#soluciones"
            onClick={closeMenu}
            aria-label="JRP Core, inicio"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <Image
              src="/jrp-mark.png"
              alt=""
              width={42}
              height={42}
              priority
              className={`object-contain transition-[width,height,transform] duration-300 group-hover:scale-105 ${
                scrolled ? "size-8" : "size-9 sm:size-10"
              }`}
            />
            <span className="leading-tight">
              <span className="block font-heading text-[16px] font-bold tracking-[-0.035em] text-foreground sm:text-[17px]">
                JRP <span className="text-brand">Core</span>
              </span>
              <span
                className={`hidden font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-opacity duration-300 sm:block ${
                  scrolled ? "sm:hidden" : ""
                }`}
              >
                Ingeniería de software
              </span>
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center lg:flex">
            <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
              {links.map((link) => {
                const active = activeSection === link.id;
                const spring = reducedMotion
                  ? { duration: 0 }
                  : ({ type: "spring", stiffness: 480, damping: 38 } as const);
                return (
                  <li key={link.id}>
                    <Link
                      href={`/${link.href}`}
                      aria-current={active ? "location" : undefined}
                      onMouseEnter={() => setHovered(link.id)}
                      onFocus={() => setHovered(link.id)}
                      onBlur={() => setHovered(null)}
                      className={`relative isolate block rounded-full px-4 py-2.5 text-[14px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        active
                          ? "font-semibold text-foreground"
                          : "font-medium text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {/* Hover: soft pill that glides between links */}
                      {hovered === link.id && (
                        <motion.span
                          layoutId="nav-hover"
                          aria-hidden="true"
                          transition={spring}
                          className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.06]"
                        />
                      )}
                      {link.label}
                      {/* Active: short brand-gradient bar under the label */}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          transition={spring}
                          className="absolute inset-x-4 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#0063FD] to-[#00C6FD] shadow-[0_0_10px_rgb(0_140_253/0.55)]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-[13px] font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
            >
              Hablemos
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur-lg transition-colors hover:bg-brand-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              {menuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Cerrar menú"
          onClick={closeMenu}
          className={`absolute inset-0 bg-slate-950/35 backdrop-blur-[3px] transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className={`absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col border-l border-white/70 bg-white/90 p-5 pt-7 shadow-[-24px_0_70px_-24px_oklch(0.19_0.06_258/0.4)] backdrop-blur-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          {...(!menuOpen ? { "aria-hidden": true, inert: true } : {})}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-heading text-lg font-bold tracking-[-0.04em] text-foreground">JRP <span className="text-brand">Core</span></span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={closeMenu}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-white/80 text-foreground transition-colors hover:bg-brand-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="size-[18px]" />
            </button>
          </div>
          <div className="space-y-1">
            {links.map((link) => {
              const active = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={`/${link.href}`}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={active ? "location" : undefined}
                  onClick={closeMenu}
                  className={`flex min-h-12 items-center justify-between rounded-xl px-3 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-brand-soft/45 ${active ? "font-semibold text-brand-strong" : "text-foreground hover:text-brand"}`}
                >
                  {link.label}
                  {active ? (
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]" />
                  ) : (
                    <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground" />
                  )}
                </Link>
              );
            })}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-[0_10px_24px_-12px_var(--brand)] transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Hablemos de tu proyecto
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <p className="mt-auto pt-8 text-center font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-muted-foreground/70">Ingeniería de software</p>
        </nav>
      </div>
    </header>
  );
}
