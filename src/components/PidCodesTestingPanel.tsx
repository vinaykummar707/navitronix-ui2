import React from "react";
import {
  boardInfoConfigs,
  cpuInfoConfigs,
  firmwareInfoConfigs,
  tempInfoConfigs,
  voltageInfoConfigs,
  operationInfoConfigs,
} from "../buttonConfig";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { OperationButton } from "./OperationButton";

// Group accordion meta info in a config array
const ACCORDION_SECTIONS = [
  { value: "Board Information", label: "Board Info", configs: boardInfoConfigs },
  { value: "CPU Metrics", label: "CPU Metrics", configs: cpuInfoConfigs },
  { value: "Firmware", label: "Firmware", configs: firmwareInfoConfigs },
  { value: "Temperature", label: "Temperature", configs: tempInfoConfigs },
  { value: "voltage", label: "Voltage", configs: voltageInfoConfigs },
  { value: "operation", label: "Operations", configs: operationInfoConfigs },
];

const PidCodeTestingPanel: React.FC = () => (
  <section className="flex-1 overflow-auto bg-sidebar  flex flex-col gap-4 p-6 border-border border-r ">
    <p className=" test-sm">PID Codes Testing</p>
    <Accordion  type="single" collapsible className="w-full bg-accent/40 rounded-md border" defaultValue="Board Information">
      {ACCORDION_SECTIONS.map(({ value, label, configs }) => (
        <AccordionItem value={value} key={value}>
          <AccordionTrigger className="px-5">{label}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground grid gap-2 grid-cols-2 px-5">
            {configs.map((config) => (
              <OperationButton key={config.id} config={config} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default PidCodeTestingPanel;