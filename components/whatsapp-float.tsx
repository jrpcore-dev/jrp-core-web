import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const whatsappUrl =
  "https://wa.me/529861133052?text=Hola%20JRP%20Core%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a JRP Core por WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] inline-flex size-14 items-center justify-center rounded-full border border-white/55 bg-[#20c96b] text-white shadow-[0_16px_38px_-14px_rgba(18,140,75,0.7),inset_0_1px_0_rgba(255,255,255,0.32)] transition-[translate,scale,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#1fbd63] hover:shadow-[0_22px_46px_-14px_rgba(18,140,75,0.72),inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#20c96b]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background active:translate-y-0 active:scale-100 sm:bottom-6 sm:right-6"
    >

      <FaWhatsapp aria-hidden="true" className="relative size-[27px] drop-shadow-sm" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full right-0 mb-3 w-[min(17rem,calc(100vw-2.5rem))] translate-y-2 scale-[0.98] rounded-2xl border border-white/70 bg-background/90 p-4 text-left text-foreground opacity-0 shadow-[0_22px_55px_-24px_oklch(0.18_0.05_258/0.38),inset_0_1px_0_white] backdrop-blur-2xl transition-[opacity,translate,scale] duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold tracking-tight">¿Hablamos?</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#20c96b]/10 text-[#168c4b]">
            <FaWhatsapp className="size-4" />
          </span>
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          Cuéntanos qué necesita tu negocio.
        </span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#168c4b]">
          Escribir por WhatsApp
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </a>
  );
}
