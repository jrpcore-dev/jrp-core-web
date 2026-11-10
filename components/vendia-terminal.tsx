"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Archive,
  ArrowLeftRight,
  BadgePercent,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  LogOut,
  Minus,
  MonitorSmartphone,
  Package,
  Plus,
  ScanBarcode,
  Search,
  Settings,
  ShoppingCart,
  Square,
  Tag,
  Truck,
  TriangleAlert,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/*
 * Animated recreation of Vendia's "Terminal de Venta" (desktop app).
 * Every size is in container-query units (cqw), so the UI scales crisply with
 * its box: legible inside the small monitor and in the large hero alike.
 * Loop: type "coca" → add products to the sale → F8 Vender → sale registered.
 */

const products = [
  { name: "Coca 2.5 L", price: 40, stock: 2, color: "#b91c1c" },
  { name: "Sabritas", price: 22, stock: 14, color: "#f59e0b" },
  { name: "Pan Bimbo", price: 58, stock: 6, color: "#2563eb" },
];

const sidebar = [
  MonitorSmartphone,
  Archive,
  ClipboardCheck,
  FileText,
  Zap,
  Users,
  Package,
  Tag,
  BadgePercent,
  Truck,
  ArrowLeftRight,
  TriangleAlert,
  BarChart3,
];

const fKeys = [
  ["F1", "Ayuda"],
  ["F2", "Sin código"],
  ["F6", "Descuento"],
  ["F9", "Cantidad"],
  ["F8", "Vender"],
  ["F10", "Retiro"],
  ["F11", "Cerrar caja"],
];

const STEPS = 14;
const QUERY = "coca";

function useTicker(intervalMs: number, running: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, running]);
  return tick;
}

const money = (value: number) => `$${value.toFixed(2)}`;

export function VendiaTerminal({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion() === true;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const tick = useTicker(650, inView && !reducedMotion);
  const step = reducedMotion ? 8 : tick % STEPS;

  // Timeline
  const query = step >= 12 || step === 0 ? "" : QUERY.slice(0, Math.min(step, QUERY.length));
  const clicked = step === 5 ? 0 : step === 7 ? 1 : -1;
  const added = step >= 12 ? 0 : step >= 8 ? 2 : step >= 6 ? 1 : 0;
  const total = products.slice(0, added).reduce((sum, p) => sum + p.price, 0);
  const selling = step === 9 || step === 10;
  const sold = step === 10 || step === 11;
  const shownTotal = sold ? products[0].price + products[1].price : total;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`@container relative flex aspect-[16/9] w-full flex-col overflow-hidden bg-white font-sans text-[#111827] ${className}`}
    >
      {/* Top bar */}
      <div className="flex h-[4.2cqw] shrink-0 items-center gap-[1cqw] border-b border-[#eef0f3] px-[1.2cqw]">
        <span className="flex size-[2.2cqw] items-center justify-center rounded-full bg-gradient-to-br from-[#0063FD] to-[#00B4FD] text-[0.9cqw] font-bold text-white">
          V
        </span>
        <span className="text-[1cqw] text-[#6b7280]">Punto de venta</span>
        <span className="text-[1cqw] text-[#9ca3af]">›</span>
        <span className="text-[1.2cqw] font-semibold">Terminal de Venta</span>
        <span className="ml-auto flex items-center gap-[0.5cqw] rounded-[0.6cqw] border border-[#e5e7eb] px-[0.8cqw] py-[0.4cqw] text-[0.9cqw] text-[#6b7280]">
          <Search className="size-[1cqw]" /> Buscar…
          <span className="rounded-[0.3cqw] bg-[#f3f4f6] px-[0.3cqw] text-[0.7cqw]">Ctrl K</span>
        </span>
        <span className="relative flex size-[2.4cqw] items-center justify-center rounded-[0.6cqw] border border-[#e5e7eb]">
          <Bell className="size-[1.1cqw]" />
          <span className="absolute -right-[0.4cqw] -top-[0.4cqw] flex size-[1.1cqw] items-center justify-center rounded-full bg-[#111827] text-[0.65cqw] font-bold text-white">
            2
          </span>
        </span>
        <span className="flex items-center gap-[0.6cqw] rounded-[0.6cqw] border border-[#e5e7eb] px-[0.8cqw] py-[0.4cqw] text-[0.95cqw]">
          <span className="size-[0.5cqw] rounded-full bg-emerald-500" />
          Caja abierta
          <Wifi className="size-[1cqw] text-emerald-600" />
          <span className="font-semibold">08:09 p.m.</span>
          <ChevronDown className="size-[0.9cqw] text-[#9ca3af]" />
        </span>
        <span className="flex items-center gap-[1.4cqw] pl-[0.6cqw] text-[#6b7280]">
          <Minus className="size-[1cqw]" />
          <Square className="size-[0.85cqw]" />
          <X className="size-[1cqw]" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="flex w-[4.4cqw] shrink-0 flex-col items-center gap-[1.25cqw] border-r border-[#eef0f3] py-[1cqw] text-[#4b5563]">
          {sidebar.map((Icon, index) => (
            <span
              key={index}
              className={`flex size-[2.4cqw] items-center justify-center rounded-[0.6cqw] ${index === 0 ? "bg-[#eef1f6] text-[#111827]" : ""}`}
            >
              <Icon className="size-[1.25cqw]" />
            </span>
          ))}
          <span className="mt-auto flex flex-col items-center gap-[1cqw]">
            <Settings className="size-[1.25cqw]" />
            <span className="flex size-[2.2cqw] items-center justify-center rounded-full bg-emerald-500 text-[0.9cqw] font-bold text-white">
              A
            </span>
            <LogOut className="size-[1.1cqw]" />
          </span>
        </div>

        {/* Main panel */}
        <div className="relative m-[1.4cqw] flex min-w-0 flex-1 flex-col rounded-[0.8cqw] border border-[#e5e7eb]">
          {/* Sales tabs */}
          <div className="flex items-center gap-[1cqw] border-b border-[#eef0f3] px-[1.2cqw] py-[0.8cqw]">
            <span className="text-[0.8cqw] font-semibold tracking-[0.12em] text-[#6b7280]">VENTAS</span>
            <span className="flex items-center gap-[0.6cqw] rounded-[0.8cqw] border-[0.12cqw] border-[#111827] px-[1cqw] py-[0.5cqw] text-[1.05cqw] font-semibold">
              <ShoppingCart className="size-[1.1cqw]" />
              Venta #1
              <motion.span
                key={shownTotal}
                initial={reducedMotion ? false : { scale: 1.25, color: "#0063FD" }}
                animate={{ scale: 1, color: "#111827" }}
                className="text-[0.8cqw] font-semibold"
              >
                {money(shownTotal)}
              </motion.span>
            </span>
            {added > 0 && (
              <span className="rounded-full bg-[#eef6ff] px-[0.7cqw] py-[0.2cqw] text-[0.8cqw] font-medium text-[#0063FD]">
                {added} {added === 1 ? "artículo" : "artículos"}
              </span>
            )}
            <span className="ml-auto flex items-center gap-[0.4cqw] rounded-[0.8cqw] border border-dashed border-[#d1d5db] px-[1cqw] py-[0.5cqw] text-[1.05cqw] font-semibold">
              <Plus className="size-[1cqw]" /> Nueva
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-[1.2cqw] pt-[1cqw]">
            {/* Scanner hint */}
            <div className="flex flex-col items-center gap-[0.4cqw] text-[#9ca3af]">
              <ScanBarcode className="size-[2.6cqw]" strokeWidth={1.5} />
              <span className="text-[0.85cqw] text-[#6b7280]">
                Para productos sin código, usa &quot;Productos rápidos&quot; o busca por nombre
              </span>
            </div>

            {/* Search */}
            <div
              className={`mt-[1cqw] flex items-center gap-[0.6cqw] rounded-[0.7cqw] border px-[1cqw] py-[0.75cqw] text-[1.1cqw] transition-colors ${
                query ? "border-[#0063FD]/50 shadow-[0_0_0_0.25cqw_rgb(0_99_253/0.1)]" : "border-[#e5e7eb]"
              }`}
            >
              <Search className="size-[1.1cqw] text-[#6b7280]" />
              {query ? (
                <span className="font-medium">
                  {query}
                  <span className="ml-[0.1cqw] inline-block h-[1.1cqw] w-[0.1cqw] translate-y-[0.15cqw] bg-[#111827]" />
                </span>
              ) : (
                <span className="text-[#9ca3af]">Nombre del producto (mín. 3 caracteres)</span>
              )}
              <span className="ml-auto rounded-[0.4cqw] border border-[#e5e7eb] px-[0.4cqw] text-[0.7cqw] font-semibold text-[#6b7280]">F5</span>
            </div>

            {/* Filters */}
            <div className="mt-[1cqw] flex items-center">
              <span className="flex gap-[0.3cqw] rounded-[0.7cqw] bg-[#f3f4f6] p-[0.3cqw] text-[0.95cqw]">
                <span className="px-[0.8cqw] py-[0.35cqw] text-[#6b7280]">Más vendidos <span className="text-[#9ca3af]">8</span></span>
                <span className="px-[0.8cqw] py-[0.35cqw] text-[#6b7280]">Fijados <span className="text-[#9ca3af]">1</span></span>
                <span className="rounded-[0.5cqw] bg-white px-[0.8cqw] py-[0.35cqw] font-semibold shadow-sm">
                  Todos <span className="text-[#9ca3af]">8</span>
                </span>
              </span>
              <span className="ml-auto flex gap-[0.5cqw] text-[0.9cqw] font-semibold">
                <span className="flex items-center gap-[0.3cqw] rounded-[0.6cqw] bg-[#f3f4f6] px-[0.8cqw] py-[0.4cqw]">
                  <Plus className="size-[0.9cqw]" /> Agregar
                </span>
                <span className="flex items-center gap-[0.3cqw] rounded-[0.6cqw] border border-dashed border-[#d1d5db] px-[0.8cqw] py-[0.4cqw]">
                  <Zap className="size-[0.9cqw]" /> Servicios
                </span>
              </span>
            </div>

            {/* Product cards */}
            <div className="mt-[1cqw] grid grid-cols-3 gap-[0.9cqw]">
              {products.map((product, index) => {
                const inSale = index < added;
                const stock = product.stock - (inSale || (sold && index < 2) ? 1 : 0);
                return (
                  <motion.div
                    key={product.name}
                    animate={clicked === index ? { scale: [1, 0.96, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-[0.8cqw] rounded-[0.8cqw] border p-[0.7cqw] transition-colors duration-300 ${
                      clicked === index || inSale ? "border-[#0063FD]/50 bg-[#f5f9ff]" : "border-[#e5e7eb]"
                    }`}
                  >
                    <span className="flex aspect-square w-[3.6cqw] shrink-0 items-center justify-center rounded-[0.6cqw] border border-[#eef0f3] bg-white">
                      <span className="h-[2.8cqw] w-[1cqw] rounded-[0.3cqw]" style={{ backgroundColor: product.color }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[1cqw] font-medium">{product.name}</span>
                      <span className="block text-[1.25cqw] font-bold">
                        {money(product.price)} <span className="text-[0.7cqw] font-normal text-[#9ca3af]">c/u</span>
                      </span>
                      <span
                        className={`mt-[0.2cqw] inline-block rounded-full px-[0.5cqw] text-[0.7cqw] font-medium ${
                          stock <= 2 ? "bg-amber-100 text-amber-700" : "bg-[#f3f4f6] text-[#6b7280]"
                        }`}
                      >
                        Quedan {stock}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Function keys */}
          <div className="flex items-center justify-center gap-[0.9cqw] border-t border-[#eef0f3] py-[0.8cqw] text-[0.9cqw]">
            {fKeys.map(([key, label]) => {
              const active = key === "F8" && selling;
              return (
                <span key={key} className="flex items-center gap-[0.4cqw]">
                  <span
                    className={`rounded-[0.4cqw] border px-[0.4cqw] py-[0.1cqw] text-[0.7cqw] font-bold transition-colors duration-200 ${
                      active ? "border-[#0063FD] bg-[#0063FD] text-white" : "border-[#e5e7eb] bg-[#f9fafb]"
                    }`}
                  >
                    {key}
                  </span>
                  <span className={`font-semibold ${active ? "text-[#0063FD]" : ""}`}>{label}</span>
                </span>
              );
            })}
          </div>

          {/* Sale registered toast */}
          <AnimatePresence>
            {sold && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: "-0.8cqw" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute right-[1.2cqw] top-[4.4cqw] flex items-center gap-[0.6cqw] rounded-[0.8cqw] bg-[#111827] px-[1cqw] py-[0.7cqw] text-[1cqw] text-white shadow-lg"
              >
                <span className="flex size-[1.5cqw] items-center justify-center rounded-full bg-emerald-500">
                  <Check className="size-[1cqw]" strokeWidth={3} />
                </span>
                Venta registrada · <span className="font-semibold">{money(products[0].price + products[1].price)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
