import React from "react";
import useTabsStore from "@/stores/useTabsStore";
import { useFormContext, useWatch } from "react-hook-form";
import { getDefaultTextsForFormat } from "@/defaultValues";
import type { DisplayConfig, Screens, ScreenFormat } from "@/routeConfig";
import { CopyBoardPropertiesButton } from "./CopyBoardPropertiesButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Label } from "./ui/label";
import { FormatSelect } from "./FormatSelect";
import { TextPropertiesAccordion } from "./TextPropertiesAccordion";
import { getTextItemsForFormat } from "./getTextItemsForFormat";

export function RightPanel() {
  const { selectedTab } = useTabsStore();
  const { control, setValue, watch } = useFormContext<DisplayConfig>();
  const displayConfig = useWatch({ control, name: "displayConfig" }) || {};

  return (
    <section className="w-[320px] flex flex-col gap-4 overflow-auto bg-sidebar border-l p-4">
      <Label>Simulation Settings</Label>
      <Accordion type="single" collapsible className="w-full rounded-md border" defaultValue="">
        {Object.entries(displayConfig).map(([lang, screens]) => {
          const screen = (screens as Screens)[selectedTab];
          if (!screen) return null;

          const formatField = `displayConfig.${lang}.${selectedTab}.format` as const;
          const textsField = `displayConfig.${lang}.${selectedTab}.texts` as const;
          const currentFormat: ScreenFormat = watch(formatField);
          const items = getTextItemsForFormat(currentFormat, lang, selectedTab);

          return (
            <AccordionItem className="bg-accent/50" value={lang} key={lang}>
              <AccordionTrigger className="px-5">{lang}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground flex flex-col gap-4 px-4">
                <FormatSelect
                  format={currentFormat}
                  onChange={next => {
                    setValue(formatField, next, { shouldDirty: true, shouldValidate: true });
                    setValue(textsField, getDefaultTextsForFormat(next), { shouldDirty: true, shouldValidate: true });
                  }}
                />
                <Label>Copy Simulation</Label>
                <CopyBoardPropertiesButton lang={lang} current={selectedTab as any} />
                <Label>Text Properties</Label>
                <TextPropertiesAccordion items={items} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}