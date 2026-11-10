import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ProductBarber } from "@/components/product-barber";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Barbería | Gestión de citas y comisiones | JRP Core",
  description:
    "Organiza citas, servicios, ventas y comisiones de tu barbería con una solución conectada para todo el equipo.",
};

export default function BarberiaPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <ProductBarber />
        <ContactForm defaultInterest="barberia" />
      </main>
    </>
  );
}
