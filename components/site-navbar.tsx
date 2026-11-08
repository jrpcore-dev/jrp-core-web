"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#soluciones", id: "soluciones" },
  { label: "Sistemas", href: "#sistemas", id: "sistemas" },
  { label: "Tecnología", href: "#tecnologia", id: "tecnologia" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("soluciones");

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`relative mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 overflow-hidden rounded-full border px-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/55 bg-white/72 shadow-[0_18px_55px_-24px_oklch(0.19_0.06_258/0.34),0_3px_12px_-5px_oklch(0.19_0.06_258/0.16),inset_0_1px_0_oklch(1_0_0/0.9)] backdrop-blur-2xl"
            : "border-white/70 bg-white/55 shadow-[0_14px_45px_-26px_oklch(0.19_0.06_258/0.22),0_2px_8px_-3px_oklch(0.19_0.06_258/0.12),inset_0_1px_0_oklch(1_0_0/0.95)] backdrop-blur-xl"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <Link
          href="/#soluciones"
          onClick={closeMenu}
          aria-label="JRP Core, inicio"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <Image
            src="/jrp-mark.png"
            alt=""
            width={42}
            height={42}
            priority
            className="size-9 object-contain transition-transform duration-300 group-hover:scale-105 sm:size-10"
          />
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-[-0.035em] text-foreground sm:text-base">
              JRP <span className="text-brand">Core</span>
            </span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:block">
              Ingeniería de software
            </span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center lg:flex">
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const active = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={`/${link.href}`}
                  aria-current={active ? "location" : undefined}
                  className={`group/link relative rounded-full px-4 py-2 text-[13px] font-medium transition-[color,transform] duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? "font-semibold text-brand"
                      : "text-muted-foreground hover:text-brand"
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-2 -top-0.5 size-1 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]"
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/#contacto"
            className="group hidden h-10 items-center gap-2 rounded-full bg-brand px-4 text-[13px] font-semibold text-brand-foreground shadow-[0_8px_20px_-10px_var(--brand)] transition-all hover:-translate-y-0.5 hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          >
            Hablemos
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/75 bg-white/55 text-foreground shadow-[0_3px_10px_-5px_oklch(0.19_0.06_258/0.3),inset_0_1px_0_white] backdrop-blur-lg transition-colors hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            {menuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      <div
        className={`mx-auto grid max-w-6xl overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out lg:hidden ${
          menuOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          aria-hidden={!menuOpen}
          className="min-h-0 overflow-hidden rounded-[1.65rem] border border-white/65 bg-white/75 p-2 shadow-[0_24px_70px_-24px_oklch(0.19_0.06_258/0.34),0_6px_18px_-8px_oklch(0.19_0.06_258/0.18),inset_0_1px_0_white] backdrop-blur-2xl"
        >
          {links.map((link) => {
            const active = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={`/${link.href}`}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={active ? "location" : undefined}
                onClick={closeMenu}
                className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-brand-soft/45 ${
                  active
                    ? "font-semibold text-brand-strong"
                    : "text-foreground hover:text-brand"
                }`}
              >
                {link.label}
                {active ? (
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]" />
                ) : (
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                )}
              </Link>
            );
          })}
          <Link
            href="/#contacto"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Hablemos de tu proyecto
            <ArrowUpRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
