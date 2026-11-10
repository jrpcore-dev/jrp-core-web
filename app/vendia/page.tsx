import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ProductVendia } from "@/components/product-vendia";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Vendia | Punto de venta para comercios | JRP Core",
  description:
    "Conoce Vendia: punto de venta para comercios con caja, inventario, recargas y reportes en una sola operación.",
};

export default function VendiaPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <ProductVendia />
        <ContactForm defaultInterest="vendia" />
      </main>
    </>
  );
}
