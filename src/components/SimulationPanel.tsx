import DisplayEditor from "./DisplayEditor";
import TabsSoftPillsDemo from "./SoftTabs";

export default function SimulationPanel() {
  return <section className="flex-1 p-4 flex flex-col gap-4 bg-dotted">
    <TabsSoftPillsDemo/>
    <DisplayEditor/>
  </section>;
}