import { use } from "react";
import DisplayEditor from "./DisplayEditor";
import TabsSoftPillsDemo from "./SoftTabs";
import type { DisplayConfig } from "@/routeConfig";
import { useFormContext } from "react-hook-form";

export default function SimulationPanel() {

  const {watch} = useFormContext<DisplayConfig>();
  const displayConfig = watch(`displayConfig`);
  const languages = Object.keys(displayConfig || {});

  return <section className="flex-1 px-8 py-4 flex flex-col overflow-auto scrollbar-minimal gap-4 bg-dotted">
    <TabsSoftPillsDemo/>

    {languages.map((lang) => (
      <DisplayEditor key={lang} language={lang} />
    ))}

  </section>;
}