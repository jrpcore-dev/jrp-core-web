import { StackTable } from "@/components/stack-table";

/** Slim band between Services and Process: the stack as a compact periodic table. */
export function StackSection() {
  return (
    <section
      id="tecnologias"
      aria-label="Tecnologías con las que trabajamos"
      className="relative scroll-mt-16 border-y border-border/70 bg-canvas px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <StackTable />
      </div>
    </section>
  );
}
