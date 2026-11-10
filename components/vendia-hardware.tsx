"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { VendiaTerminal } from "@/components/vendia-terminal";

/*
 * Exploded view of a Vendia checkout: the computer with Vendia in the center
 * and each compatible device pulled apart around it, joined by dashed leader
 * lines and labeled. On entry everything starts stacked at the center and
 * "explodes" outwards once.
 *
 * SCREENS: the monitor shows the animated <VendiaTerminal /> (or a static `screen`
 * capture if passed); `phoneScreen` = Vendia Stock app capture.
 */

const ink = "#0b1120";
const inkSoft = "#1e2638";

/* ---------- Device drawings (pure CSS) ---------- */

function Monitor({ screen }: { screen?: string }) {
  return (
    <div>
      <div className="rounded-[12px] p-[2.2%] shadow-[0_30px_50px_-28px_rgb(11_17_32/0.6)]" style={{ backgroundColor: ink }}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] bg-white">
          {screen ? (
            <Image src={screen} alt="Pantalla de cobro de Vendia" fill className="object-cover object-top" sizes="(min-width: 1024px) 40vw, 90vw" />
          ) : (
            <VendiaTerminal />
          )}
        </div>
      </div>
      <div className="mx-auto h-[18px] w-[14%]" style={{ backgroundColor: inkSoft }} />
      <div className="mx-auto h-[7px] w-[36%] rounded-full" style={{ backgroundColor: inkSoft }} />
    </div>
  );
}

function Phone({ screen }: { screen?: string }) {
  return (
    <div className="rounded-[18%/8.5%] p-[5%] shadow-[0_30px_50px_-24px_rgb(11_17_32/0.65)] ring-1 ring-white/10" style={{ backgroundColor: ink }}>
      <div className="relative aspect-[738/1600] overflow-hidden rounded-[14%/6.5%] bg-[#151b2b]">
        {screen ? (
          <Image src={screen} alt="App móvil Vendia Stock" fill className="object-cover object-top" sizes="(min-width: 1024px) 10vw, 40vw" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-1 text-center">
            <ImageIcon aria-hidden="true" className="size-4 text-white/50" />
            <span className="px-2 text-[10px] font-semibold text-white/70">Vendia Stock</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Scanner() {
  return (
    <div className="relative aspect-square">
      {/* head */}
      <div className="absolute left-[4%] top-[14%] h-[34%] w-[74%] rounded-[45%_14%_14%_45%]" style={{ backgroundColor: ink }} />
      <div className="absolute right-[22%] top-[19%] h-[24%] w-[5%] rounded-sm bg-rose-500/90" />
      {/* handle */}
      <div className="absolute left-[38%] top-[40%] h-[54%] w-[26%] origin-top rotate-[14deg] rounded-b-[16px]" style={{ backgroundColor: inkSoft }} />
      {/* trigger */}
      <div className="absolute left-[60%] top-[46%] h-[12%] w-[8%] rounded-r-full bg-brand" />
      {/* laser */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[-16%] top-[30%] h-[2px] w-[36%] bg-rose-500 shadow-[0_0_8px_rgb(244_63_94)]"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </div>
  );
}

function TicketPrinter() {
  return (
    <div className="relative aspect-square">
      {/* ticket coming out */}
      <motion.div
        className="absolute left-[22%] top-[2%] h-[42%] w-[56%] rounded-t-sm border border-border bg-white px-[8%] pt-[8%] shadow-sm"
        animate={{ y: ["6%", "-4%", "6%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-[6%] w-full rounded bg-foreground/25" />
        <div className="mt-[10%] h-[6%] w-3/4 rounded bg-foreground/15" />
        <div className="mt-[10%] h-[6%] w-2/3 rounded bg-foreground/15" />
      </motion.div>
      {/* body */}
      <div className="absolute bottom-[6%] left-[6%] h-[58%] w-[88%] rounded-[14px] border border-border bg-white shadow-[0_14px_24px_-14px_rgb(11_17_32/0.45)]">
        <div className="mx-auto mt-[9%] h-[6%] w-[64%] rounded-full" style={{ backgroundColor: ink }} />
        <div className="absolute bottom-[14%] right-[12%] size-[9%] rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}

function CashDrawer() {
  return (
    <div className="relative aspect-[2/1]">
      <div className="absolute inset-x-0 bottom-0 top-[18%] rounded-[12px] shadow-[0_16px_26px_-16px_rgb(11_17_32/0.6)]" style={{ backgroundColor: ink }}>
        {/* drawer front */}
        <div className="absolute inset-x-[6%] bottom-[12%] top-[34%] rounded-[8px]" style={{ backgroundColor: inkSoft }}>
          <div className="mx-auto mt-[10%] h-[14%] w-[30%] rounded-full bg-white/25" />
        </div>
        <div className="absolute right-[8%] top-[14%] size-[8%] rounded-full bg-amber-400" />
      </div>
      {/* bills peeking */}
      <div className="absolute left-[18%] top-[2%] h-[26%] w-[26%] rotate-[-6deg] rounded-sm bg-emerald-400/80" />
      <div className="absolute left-[36%] top-[4%] h-[24%] w-[24%] rotate-[5deg] rounded-sm bg-emerald-500/80" />
    </div>
  );
}

function WeighingScale() {
  return (
    <div className="relative aspect-[5/4]">
      {/* plate */}
      <div className="absolute inset-x-[4%] top-[8%] h-[16%] rounded-[50%] border border-border bg-white shadow-sm" />
      {/* body */}
      <div
        className="absolute inset-x-[10%] bottom-[4%] top-[26%] rounded-[12px] shadow-[0_14px_24px_-14px_rgb(11_17_32/0.55)]"
        style={{ backgroundColor: ink }}
      >
        <div className="absolute inset-x-[16%] top-[22%] flex h-[34%] items-center justify-end rounded-[6px] bg-[#0f2a1f] px-[6%] font-mono text-[clamp(8px,0.9vw,12px)] text-emerald-400">
          0.850 kg
        </div>
      </div>
    </div>
  );
}

/* ---------- Layout ---------- */

type Part = {
  key: string;
  label: string;
  detail: string;
  device: ReactNode;
  width: string;
  left: number; // % of the stage
  top: number; // % of the stage
};

const parts: Part[] = [
  { key: "scanner", label: "Lector de código de barras", detail: "Cobra escaneando, sin teclear precios.", device: <Scanner />, width: "13%", left: 15, top: 28 },
  { key: "printer", label: "Impresora de tickets", detail: "Tickets térmicos al cerrar cada venta.", device: <TicketPrinter />, width: "12%", left: 85, top: 26 },
  { key: "scale", label: "Báscula", detail: "Vende a granel por peso.", device: <WeighingScale />, width: "14%", left: 13, top: 76 },
  { key: "drawer", label: "Cajón de dinero", detail: "Se abre solo al cobrar en efectivo.", device: <CashDrawer />, width: "19%", left: 87, top: 76 },
];

const CENTER = { left: 50, top: 46 };

function PartLabel({ index, label, detail }: { index: number; label: string; detail: string }) {
  return (
    <div className="flex gap-2.5 text-left">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#0b1120] font-mono text-[11px] font-semibold text-white shadow-[0_0_0_5px_color-mix(in_oklab,var(--brand)_18%,transparent)]">
        {index + 1}
      </span>
      <span>
        <span className="block text-[14px] font-semibold leading-tight text-foreground">{label}</span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">{detail}</span>
      </span>
    </div>
  );
}

export function VendiaHardware({ screen, phoneScreen }: { screen?: string; phoneScreen?: string }) {
  const reducedMotion = useReducedMotion() === true;
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.45 });
  const exploded = reducedMotion || inView;
  const move = reducedMotion ? "none" : "left 1s cubic-bezier(0.22,1,0.36,1), top 1s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease";

  return (
    <>
      {/* Desktop: exploded diagram */}
      <div
        ref={stageRef}
        className="relative hidden aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-[radial-gradient(ellipse_55%_50%_at_50%_45%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent_75%)] lg:block"
      >
        {/* Leader lines from each part to the computer */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {parts.map((part, index) => (
            <motion.line
              key={part.key}
              x1={CENTER.left}
              y1={CENTER.top}
              x2={part.left}
              y2={part.top}
              stroke="var(--brand)"
              strokeOpacity={0.45}
              strokeWidth={1.25}
              strokeDasharray="4 5"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={exploded ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.85 + index * 0.08 }}
            />
          ))}
        </svg>

        {/* Computer with Vendia */}
        <div className="absolute w-[46%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${CENTER.left}%`, top: `${CENTER.top}%` }}>
          <Monitor screen={screen} />
        </div>

        {/* Vendia Stock phone, in front of the lower right corner of the computer */}
        <div
          className="absolute z-10 w-[13%] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${exploded ? 69 : CENTER.left}%`,
            top: `${exploded ? 61 : CENTER.top}%`,
            opacity: exploded ? 1 : 0,
            transition: move,
            transitionDelay: reducedMotion ? "0s" : "0.35s",
          }}
        >
          <Phone screen={phoneScreen} />
          {/* Label on the phone's left side, so it does not collide with the drawer label */}
          <motion.div
            className="absolute bottom-[6%] right-full mr-4 w-max max-w-[13rem]"
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={exploded ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.4 }}
          >
            <PartLabel index={parts.length} label="Vendia Stock" detail="App móvil para registrar y revisar tu inventario." />
          </motion.div>
        </div>

        {/* Exploded parts */}
        {parts.map((part, index) => (
          <div
            key={part.key}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{
              width: part.width,
              left: `${exploded ? part.left : CENTER.left}%`,
              top: `${exploded ? part.top : CENTER.top}%`,
              opacity: exploded ? 1 : 0,
              transition: move,
              transitionDelay: reducedMotion ? "0s" : `${0.1 + index * 0.06}s`,
            }}
          >
            <div className="w-full">{part.device}</div>
            <motion.div
              className="absolute left-1/2 top-full mt-3 w-max max-w-[15rem] -translate-x-1/2"
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={exploded ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.05 + index * 0.08 }}
            >
              <PartLabel index={index} label={part.label} detail={part.detail} />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile / tablet: computer on top, devices in a grid */}
      <div className="lg:hidden">
        <div className="relative mx-auto max-w-md pb-10">
          <Monitor screen={screen} />
          <div className="absolute -bottom-4 right-[3%] w-[30%]">
            <Phone screen={phoneScreen} />
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-md">
          <PartLabel index={parts.length} label="Vendia Stock" detail="App móvil para registrar y revisar tu inventario." />
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8">
          {parts.map((part, index) => (
            <li key={part.key} className="flex flex-col items-center gap-3">
              <div className="w-[55%]">{part.device}</div>
              <PartLabel index={index} label={part.label} detail={part.detail} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
