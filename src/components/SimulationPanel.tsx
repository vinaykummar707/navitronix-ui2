import { use } from "react";
import DisplayEditor from "./DisplayEditor";
import TabsSoftPillsDemo from "./SoftTabs";
import type { DisplayConfig } from "@/routeConfig";
import { useFormContext } from "react-hook-form";

export default function SimulationPanel() {

  const {watch} = useFormContext<DisplayConfig>();
  const displayConfig = watch(`displayConfig`);
  const languages = Object.keys(displayConfig || {});

  return <section className="flex-1 p-4 flex flex-col items-center gap-4 bg-dotted">
    <TabsSoftPillsDemo/>

    {languages.map((lang) => (
      <DisplayEditor key={lang} language={lang} />
    ))}

  </section>;
}