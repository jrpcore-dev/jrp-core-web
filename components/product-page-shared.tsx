"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 28,
  xOffset = 0,
  className = "",
  viewportAmount = 0.15,
  ...props
}: HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  viewportAmount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] ${tone === "dark" ? "text-sky-200" : "text-brand"} ${className}`}>
      <span aria-hidden="true" className={`h-[2px] w-7 rounded-full ${tone === "dark" ? "bg-sky-200/70" : "bg-brand/60"}`} />
      {children}
    </span>
  );
}

