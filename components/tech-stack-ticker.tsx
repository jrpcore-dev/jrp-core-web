"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiExpo,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/*
 * Tech stack as a live shell prompt on a light surface: each technology is
 * "typed" as a command and explained with a shell comment in plain Spanish.
 * Grouped by the same layers as the hero (interface → data → code).
 * Colors are the official brand colors, darkened where needed to read on white.
 */
export const stack: { layer: string; name: string; description: string; icon: IconType; color: string }[] = [
  { layer: "interfaz", name: "next.js", description: "sitios web rápidos y fáciles de encontrar", icon: SiNextdotjs, color: "#0f172a" },
  { layer: "interfaz", name: "react", description: "sistemas web cómodos de usar", icon: SiReact, color: "#149ECA" },
  { layer: "interfaz", name: "react-native", description: "apps para iPhone y Android", icon: SiExpo, color: "#0f172a" },
  { layer: "interfaz", name: "tailwind", description: "diseño limpio y consistente", icon: SiTailwindcss, color: "#0EA5C6" },
  { layer: "datos", name: "node.js", description: "conecta tus herramientas y servicios", icon: SiNodedotjs, color: "#4E8F3A" },
  { layer: "datos", name: "postgresql", description: "tu información segura y ordenada", icon: SiPostgresql, color: "#336791" },
  { layer: "código", name: "javascript", description: "interactividad en cada pantalla", icon: SiJavascript, color: "#D4B106" },
  { layer: "código", name: "typescript", description: "software confiable y fácil de crecer", icon: SiTypescript, color: "#3178C6" },
  { layer: "código", name: "python", description: "automatizaciones y reportes", icon: SiPython, color: "#3776AB" },
];

const groups = Array.from(new Set(stack.map((item) => item.layer)));

const TICK_MS = 45; // typing speed
const HOLD_TICKS = 50; // ~2.25s pause once a line is complete

type State = { index: number; chars: number; hold: number };

const commandFor = (name: string) => `usamos ${name}`;

export function TechStackTicker() {
  const reducedMotion = useReducedMotion() === true;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.5 });
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState<State>({ index: 0, chars: 0, hold: 0 });
  const running = inView && !paused;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setState((s) => {
        const length = commandFor(stack[s.index].name).length;
        if (s.chars < length) return { ...s, chars: reducedMotion ? length : s.chars + 1 };
        if (s.hold < HOLD_TICKS) return { ...s, hold: s.hold + 1 };
        return { index: (s.index + 1) % stack.length, chars: 0, hold: 0 };
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running, reducedMotion]);

  const item = stack[state.index];
  const command = commandFor(item.name);
  const typed = reducedMotion ? command.length : state.chars;
  const done = typed >= command.length;
  const verb = command.slice(0, Math.min(typed, 7)); // "usamos "
  const name = typed > 7 ? command.slice(7, typed) : "";

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Tecnologías con las que trabajamos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-white/80 shadow-[0_1px_0_white_inset,0_18px_40px_-30px_oklch(0.2_0.06_258/0.35)] backdrop-blur-sm"
    >
      {/* Brand accent: thin rail on the left edge, like an editor gutter */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0063FD] to-[#00C6FD]" />

      {/* Full list for screen readers; the animated prompt is decorative. */}
      <ul className="sr-only">
        {stack.map(({ name: techName, description }) => (
          <li key={techName}>
            {techName}: {description}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 py-3 pl-6 pr-4 sm:pl-7 sm:pr-5 lg:flex-row lg:items-center lg:gap-6">
        {/* Prompt */}
        <p aria-hidden="true" className="min-h-[3rem] min-w-0 flex-1 font-mono text-[13px] leading-6 sm:min-h-6 sm:text-sm">
          <span className="font-medium text-brand">~/jrp-core</span>
          <span className="text-muted-foreground/60"> $ </span>
          <span className="text-foreground/70">{verb}</span>
          {name && (
            <span className="font-semibold" style={{ color: item.color }}>
              {name}
            </span>
          )}
          {done && (
            <span className="text-muted-foreground">
              {"  "}
              <span className="whitespace-nowrap"># {item.description}</span>
            </span>
          )}
          <span
            className={`ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-brand/80 ${
              done && !reducedMotion ? "animate-[caret_1s_steps(1)_infinite]" : ""
            }`}
          />
        </p>

        {/* Logo rail, grouped by layer; the active one is lit and underlined in its color */}
        <div className="flex shrink-0 flex-wrap items-center gap-y-2">
          {groups.map((group, groupIndex) => (
            <Fragment key={group}>
              {groupIndex > 0 && <span aria-hidden="true" className="mx-2 h-7 w-px bg-border" />}
              <div className="flex items-center gap-0.5" title={group}>
                {stack.map((tech, techIndex) => {
                  if (tech.layer !== group) return null;
                  const RailIcon = tech.icon;
                  const active = techIndex === state.index;
                  return (
                    <button
                      key={tech.name}
                      type="button"
                      aria-label={tech.name}
                      aria-pressed={active}
                      onClick={() => setState({ index: techIndex, chars: 0, hold: 0 })}
                      style={
                        active
                          ? {
                              backgroundColor: `${tech.color}12`,
                              boxShadow: `inset 0 0 0 1px ${tech.color}2e, 0 8px 18px -12px ${tech.color}`,
                            }
                          : undefined
                      }
                      className={`group relative flex items-center justify-center rounded-2xl transition-[width,height,background-color,box-shadow] duration-300 ease-out hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        active ? "mx-1 size-14" : "size-11"
                      }`}
                    >
                      <RailIcon
                        aria-hidden="true"
                        className={`transition-[width,height,opacity,filter] duration-300 ease-out ${
                          active
                            ? "size-8 opacity-100"
                            : "size-6 opacity-45 grayscale-[35%] group-hover:opacity-90 group-hover:grayscale-0"
                        }`}
                        style={{ color: tech.color }}
                      />
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-1 left-1/2 h-[3px] -translate-x-1/2 rounded-full transition-[width,opacity] duration-300 ease-out ${
                          active ? "w-5 opacity-100" : "w-0 opacity-0"
                        }`}
                        style={{ backgroundColor: tech.color }}
                      />
                    </button>
                  );
                })}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
