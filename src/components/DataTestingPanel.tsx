import React, { useState } from "react";
import {
  boardInfoConfigs,
  cpuInfoConfigs,
  firmwareInfoConfigs,
  tempInfoConfigs,
  voltageInfoConfigs,
  operationInfoConfigs,
  basicOperationConfigs,
  dtcOperationConfigs,
  intensityConfig,
} from "../buttonConfig";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { OperationButton } from "./OperationButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

// Group accordion meta info in a config array
const ACCORDION_SECTIONS = [
  { value: "Basic", label: "Basic", configs: basicOperationConfigs },
  { value: "DTC Codes", label: "DTC Codes", configs: dtcOperationConfigs },
  { value: "DTC Count Codes", label: "DTC Count Codes", configs: dtcOperationConfigs },
];

const DataTestingPanel: React.FC = () => {
  const [intensityMode, setIntensityMode] = useState<"auto" | "manual">("auto");
  const [sliderValue, setSliderValue] = useState<number[]>([50]); // Shadcn slider is array type

  const handleSliderChange = (value: number[]) => setSliderValue(value);

  // Only object from intensityConfig
  const intensityBtnConfig = intensityConfig[0];

  return (
    <section className="w-[30rem] flex flex-col gap-4 overflow-auto bg-background p-6 border-border border-r ">
      <p className="text-sm">PID Testing</p>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-md border"
        defaultValue="Basic"
      >
        {ACCORDION_SECTIONS.map(({ value, label, configs }) => (
          <AccordionItem className="bg-accent/40" value={value} key={value}>
            <AccordionTrigger className="px-5  text">{label}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground grid gap-2 grid-cols-2 px-5">
              {configs.map((config) => (
                <OperationButton key={config.id} config={config} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Intensity Accordian Section */}
        <AccordionItem className="bg-accent/40" value="Intensity">
          <AccordionTrigger className="px-5">Intensity</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 px-5 py-2">
              <RadioGroup
                value={intensityMode}
                onValueChange={v => setIntensityMode(v as "auto" | "manual")}
                className="flex flex-row gap-8"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="auto" id="auto-radio" />
                  <label htmlFor="auto-radio" className="text-sm">Auto</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="manual" id="manual-radio" />
                  <label htmlFor="manual-radio" className="text-sm">Manual</label>
                </div>
              </RadioGroup>
              {intensityMode === "manual" && (
                <div className="flex flex-col gap-4">
                  <label className="text-xs text-muted-foreground">Intensity Value ({sliderValue[0]})</label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                    className=""
                  />
                  
                </div>
              )}
              <OperationButton
                config={{
                  ...intensityBtnConfig,
                  payload: { intensity: sliderValue[0] }
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default DataTestingPanel;