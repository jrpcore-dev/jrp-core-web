"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { serviceStacks, technologies, type TechName } from "@/components/tech-stack";

/*
 * Compact "tabla periódica" band: the stack as small 3D periodic-table tiles
 * scrolling right → left in an infinite marquee (paused on hover). Hovering a
 * tile lifts and tilts it while the rest dim; a one-line detail shows what it
 * is for and which services use it.
 */

const families = [
  { key: "interfaz", color: "#0EA5E9", items: ["next.js", "react", "react-native", "electron", "tailwind"] },
  { key: "codigo", color: "#6366F1", items: ["javascript", "typescript"] },
  { key: "datos", color: "#10B981", items: ["node.js", "postgresql", "mysql", "sqlite"] },
  { key: "auto", color: "#F59E0B", items: ["python"] },
] as const satisfies readonly { key: string; color: string; items: readonly TechName[] }[];

const symbols: Record<TechName, string> = {
  "next.js": "Nx",
  react: "Re",
  "react-native": "Rn",
  tailwind: "Tw",
  javascript: "Js",
  typescript: "Ts",
  "node.js": "No",
  postgresql: "Pg",
  python: "Py",
  electron: "El",
  mysql: "My",
  sqlite: "Sq",
};

const elements = families.flatMap((family) => family.items.map((name) => ({ name: name as TechName, family })));

const usedIn = (name: TechName) =>
  Object.values(serviceStacks)
    .filter((service) => (service.stack as readonly TechName[]).includes(name))
    .map((service) => service.label);

const ROTATE_MS = 3000;
const easeOut = [0.22, 1, 0.36, 1] as const;
const onDark = (color: string) => (color === "#0f172a" ? "#ffffff" : color);

/* Slab thickness: stacked 1px shadows under the tile, like the hero layers. */
const restingDepth =
  "0 1px 0 #e4e8ef, 0 2px 0 #e4e8ef, 0 3px 0 #d8dde6, 0 4px 0 #d8dde6, 0 10px 16px -10px rgb(15 23 42 / 0.28)";
const liftedDepth = (color: string) =>
  `0 1px 0 ${color}, 0 2px 0 ${color}, 0 3px 0 ${color}cc, 0 4px 0 ${color}cc, 0 5px 0 ${color}99, 0 22px 30px -14px ${color}aa`;

function Tile({
  index,
  copy,
  lifted,
  dimmed,
  onHover,
  onLeave,
  onSelect,
}: {
  index: number;
  copy: boolean;
  lifted: boolean;
  dimmed: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
  onSelect: (index: number) => void;
}) {
  const { name } = elements[index];
  const tech = technologies[name];
  const Icon = tech.icon;

  return (
    <div className="[perspective:500px]">
      <button
        type="button"
        tabIndex={copy ? -1 : 0}
        aria-hidden={copy || undefined}
        aria-pressed={copy ? undefined : lifted}
        aria-label={copy ? undefined : `${tech.label}: ${tech.description}`}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(index)}
        onBlur={onLeave}
        onClick={() => onSelect(index)}
        style={{
          transform: lifted ? "translateY(-12px) rotateX(14deg) scale(1.06)" : "none",
          boxShadow: lifted ? liftedDepth(tech.color === "#0f172a" ? "#64748b" : tech.color) : restingDepth,
        }}
        className={`relative isolate flex size-16 items-center justify-center overflow-hidden rounded-xl transition-[transform,box-shadow,background-color,opacity,filter] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-[4.5rem] ${
          lifted ? "bg-[#0b1120]" : "bg-white ring-1 ring-inset ring-border"
        } ${dimmed ? "opacity-35 grayscale" : "opacity-100"}`}
      >
        {lifted && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{ background: `radial-gradient(circle at 50% 42%, ${onDark(tech.color)}55, transparent 65%)` }}
          />
        )}
        <Icon
          aria-hidden="true"
          className="size-8 sm:size-9"
          style={{ color: lifted ? onDark(tech.color) : tech.color }}
        />
        <span className={`absolute left-1.5 top-1 font-mono text-[9px] leading-none ${lifted ? "text-white/45" : "text-muted-foreground/70"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`absolute bottom-1 right-1.5 font-heading text-[10px] font-bold leading-none ${lifted ? "text-white/70" : "text-muted-foreground"}`}>
          {symbols[name]}
        </span>
      </button>
    </div>
  );
}

export function StackTable() {
  const reducedMotion = useReducedMotion() === true;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.5 });
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);

  // Detail line rotates slowly until the visitor interacts.
  useEffect(() => {
    if (!inView || interacted || hovered !== null || reducedMotion) return;
    const id = window.setTimeout(() => setSelected((i) => (i + 1) % elements.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [selected, inView, interacted, hovered, reducedMotion]);

  const hover = (index: number) => {
    setInteracted(true);
    setHovered(index);
    setSelected(index);
  };
  const leave = () => setHovered(null);
  const select = (index: number) => {
    setInteracted(true);
    setSelected(index);
  };

  const shownIndex = hovered ?? selected;
  const current = elements[shownIndex];
  const tech = technologies[current.name];
  const Icon = tech.icon;
  const services = usedIn(current.name);

  const row = (copy: boolean) =>
    families.map((family, familyIndex) => (
      <Fragment key={`${copy ? "b" : "a"}-${family.key}`}>
        {familyIndex > 0 && <span aria-hidden="true" className="h-10 w-px shrink-0 bg-border" />}
        <div className="flex shrink-0 gap-2.5">
          {family.items.map((name) => {
            const index = elements.findIndex((el) => el.name === name);
            const isLifted = index === hovered;
            return (
              <Tile
                key={name}
                index={index}
                copy={copy}
                lifted={isLifted}
                dimmed={hovered !== null && index !== hovered}
                onHover={hover}
                onLeave={leave}
                onSelect={select}
              />
            );
          })}
        </div>
        {/* gap before the next copy of the row */}
        {familyIndex === families.length - 1 && <span aria-hidden="true" className="h-10 w-px shrink-0 bg-border" />}
      </Fragment>
    ));

  return (
    <div ref={rootRef} className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
      {/* One-line detail of the selected element */}
      <div className="min-w-0 shrink-0 lg:w-[22rem]">
        <div aria-live="polite" className="min-h-[3rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current.name}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: easeOut }}
              className="text-[15px] leading-6 text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <Icon aria-hidden="true" className="size-3.5" style={{ color: tech.color }} />
                {tech.label}
              </span>
              {" · "}
              {tech.description}
              <span className="font-mono text-[12px]">
                {"  — en "}
                {(services.length ? services : ["apps a la medida"]).join(", ").toLowerCase()}
              </span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Infinite marquee (right → left), paused while hovering. Vertical padding leaves room for the lift. */}
      <div className="group/marquee relative min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [overflow-x:clip]">
        <div
          className={`flex w-max py-5 ${
            reducedMotion
              ? ""
              : "animate-[marquee_32s_linear_infinite] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
          }`}
        >
          {/* Two identical copies; trailing padding = gap so -50% loops seamlessly */}
          <div className="flex shrink-0 items-center gap-4 pr-4">{row(false)}</div>
          <div className="flex shrink-0 items-center gap-4 pr-4">{row(true)}</div>
        </div>
      </div>
    </div>
  );
}
