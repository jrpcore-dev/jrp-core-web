import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  SiElectron,
  SiExpo,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/*
 * Tech stack data shared by the services browser frame and the stack band.
 * Colors are brand colors tuned to read on white.
 */
export const technologies = {
  "next.js": { label: "Next.js", description: "sitios web rápidos y fáciles de encontrar", icon: SiNextdotjs, color: "#0f172a" },
  react: { label: "React", description: "pantallas cómodas de usar", icon: SiReact, color: "#149ECA" },
  "react-native": { label: "React Native", description: "apps para iPhone y Android", icon: SiExpo, color: "#0f172a" },
  electron: { label: "Electron", description: "programas instalables para Windows y Mac", icon: SiElectron, color: "#47848F" },
  tailwind: { label: "Tailwind", description: "diseño limpio y consistente", icon: SiTailwindcss, color: "#0EA5C6" },
  javascript: { label: "JavaScript", description: "interactividad en cada pantalla", icon: SiJavascript, color: "#C9A800" },
  typescript: { label: "TypeScript", description: "software confiable y fácil de crecer", icon: SiTypescript, color: "#3178C6" },
  "node.js": { label: "Node.js", description: "conecta tus herramientas y servicios", icon: SiNodedotjs, color: "#4E8F3A" },
  postgresql: { label: "PostgreSQL", description: "tu información segura y ordenada", icon: SiPostgresql, color: "#336791" },
  mysql: { label: "MySQL", description: "bases de datos confiables y probadas", icon: SiMysql, color: "#4479A1" },
  sqlite: { label: "SQLite", description: "datos locales, funciona sin internet", icon: SiSqlite, color: "#0F80CC" },
  python: { label: "Python", description: "automatizaciones y reportes", icon: SiPython, color: "#3776AB" },
} satisfies Record<string, { label: string; description: string; icon: IconType; color: string }>;

export type TechName = keyof typeof technologies;

/** Stack behind each service. */
export const serviceStacks = {
  web: { label: "Página web", stack: ["next.js", "react", "tailwind", "javascript"] },
  pos: { label: "Punto de venta", stack: ["react", "typescript", "electron", "node.js", "postgresql", "sqlite"] },
  automation: { label: "Automatización", stack: ["node.js", "python", "javascript"] },
  crm: { label: "CRM", stack: ["react", "next.js", "node.js", "postgresql", "mysql"] },
} satisfies Record<string, { label: string; stack: readonly TechName[] }>;

/**
 * Bottom strip of the services browser window: just the logos of the stack,
 * as small raised tiles (name on hover), plus an optional action on the right.
 */
export function StackIcons({ techs, action }: { techs: readonly TechName[]; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-t border-border/80 bg-[#f7f8fb] px-4 py-3 sm:px-5">
      <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label="Tecnologías de este servicio">
        {techs.map((name) => {
          const { label, icon: Icon, color } = technologies[name];
          return (
            <li key={name} className="group relative">
              <span
                title={label}
                className="flex size-9 items-center justify-center rounded-xl bg-white sm:size-10 ring-1 ring-inset ring-border transition-transform duration-300 ease-out group-hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 1px 0 #e4e8ef, 0 2px 0 #e4e8ef, 0 3px 0 #d8dde6, 0 8px 14px -10px rgb(15 23 42 / 0.3)",
                }}
              >
                <Icon aria-hidden="true" className="size-5" style={{ color }} />
                <span className="sr-only">{label}</span>
              </span>
              {/* Name tag on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[#0b1120] px-2 py-1 font-mono text-[10.5px] text-white opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
      {action}
    </div>
  );
}
