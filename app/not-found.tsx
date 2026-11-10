"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Home, Lock, RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteNavbar } from "@/components/site-navbar";

/*
 * 404: big "4 0 4" where the 0 is the JRP Core mark, floating as if lost,
 * with its shadow breathing on the floor. Simple copy and two ways out.
 */

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  const reducedMotion = useReducedMotion() === true;
  const pathname = usePathname() ?? "/";
  const path = decodeURIComponent(pathname).slice(0, 40) || "/";

  // Type the attempted path once, then strike it through.
  const [chars, setChars] = useState(0);
  const typingDone = reducedMotion || chars >= path.length;
  useEffect(() => {
    if (typingDone) return;
    const id = window.setInterval(() => setChars((c) => c + 1), 45);
    return () => window.clearInterval(id);
  }, [typingDone]);
  const typedPath = reducedMotion ? path : path.slice(0, chars);

  const digit = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: easeOut },
  });

  const float = { duration: 3.6, repeat: Infinity, ease: "easeInOut" } as const;

  return (
    <>
      <title>Página no encontrada | JRP Core</title>
      <SiteNavbar />
      <main className="relative isolate flex min-h-[calc(100svh_-_5rem)] items-center px-5 py-16 sm:px-8 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_35%,color-mix(in_oklab,var(--brand)_9%,transparent),transparent_70%)]"
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {/* Just the browser's address bar, with the path the visitor tried, typed then struck through */}
          <motion.div
            {...digit(0)}
            className="mb-10 flex max-w-full items-center gap-3 rounded-full border border-border bg-white py-2 pl-3.5 pr-4 shadow-[0_10px_24px_-18px_oklch(0.2_0.06_258/0.4)]"
          >
            <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
              <ChevronLeft className="size-4 opacity-70" />
              <ChevronRight className="size-4 opacity-35" />
              <RotateCw className="size-3.5 opacity-70" />
            </span>
            <span className="flex min-w-0 items-center gap-2 font-mono text-[13px]">
              <Lock aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />
              <span className="shrink-0 text-muted-foreground">jrpcore</span>
              <span className="relative min-w-0 truncate font-medium text-foreground">
                {typedPath}
                {!typingDone && (
                  <span aria-hidden="true" className="ml-px inline-block h-[1em] w-px translate-y-[0.15em] bg-foreground/70" />
                )}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 h-[1.5px] origin-left bg-rose-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: typingDone ? 1 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.15, ease: easeOut }}
                />
              </span>
            </span>
            <span className="sr-only">Dirección no encontrada: {path}</span>
          </motion.div>

          {/* 4 [logo] 4 */}
          <div
            aria-hidden="true"
            className="flex items-center font-heading text-[clamp(7.5rem,26vw,16rem)] font-bold leading-none tracking-[-0.06em] text-foreground"
          >
            <motion.span {...digit(0.05)}>4</motion.span>

            <motion.span {...digit(0.15)} className="relative mx-[0.04em] inline-flex h-[0.86em] w-[0.86em] items-center justify-center">
              <motion.span
                className="relative block size-full"
                animate={reducedMotion ? undefined : { y: ["-4%", "4%", "-4%"], rotate: [-5, 4, -5] }}
                transition={float}
              >
                <Image
                  src="/jrp-mark.png"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 14rem, 26vw"
                  className="object-contain drop-shadow-[0_18px_30px_rgb(0_99_253/0.25)]"
                />
              </motion.span>
              {/* Floor shadow breathes with the float */}
              <motion.span
                className="absolute -bottom-[0.06em] left-1/2 h-[0.06em] w-[0.6em] -translate-x-1/2 rounded-[50%] bg-foreground/15 blur-[6px]"
                animate={reducedMotion ? undefined : { scaleX: [0.85, 1.1, 0.85], opacity: [0.55, 0.9, 0.55] }}
                transition={float}
              />
            </motion.span>

            <motion.span {...digit(0.25)}>4</motion.span>
          </div>

          <motion.div {...digit(0.35)} className="mt-8 flex flex-col items-center">
            <h1 className="max-w-[18ch] text-balance text-[clamp(1.9rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.04em] text-foreground">
              Esta página no existe…{" "}
              <span className="bg-gradient-to-r from-[#0063FD] to-[#00B4FD] bg-clip-text pr-[0.08em] font-accent text-[1.1em] font-normal italic tracking-[-0.02em] text-transparent">
                todavía.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-muted-foreground">
              Puede que haya cambiado de lugar. Hasta nuestro logo la anda buscando.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--brand)_65%,transparent)] transition-all hover:-translate-y-0.5 hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <Home aria-hidden="true" className="size-4" />
                Volver al inicio
              </Link>
              <Link
                href="/#contacto"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border/80 bg-white px-6 text-sm font-medium text-foreground transition-colors hover:border-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Hablemos
                <ArrowUpRight aria-hidden="true" className="size-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
