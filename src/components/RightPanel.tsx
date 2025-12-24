import React from "react";
import useTabsStore from "@/stores/useTabsStore";
import { useFormContext, useWatch } from "react-hook-form";
import { AVAILABLE_LANGUAGES, getDefaultTextsForFormat } from "@/defaultValues";
import type { DisplayConfig, Screens, ScreenFormat } from "@/routeConfig";
import { CopyBoardPropertiesButton } from "./CopyBoardPropertiesButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Label } from "./ui/label";
import { FormatSelect } from "./FormatSelect";
import { TextPropertiesAccordion } from "./TextPropertiesAccordion";
import { getTextItemsForFormat } from "./getTextItemsForFormat";
import { Languages } from "lucide-react";

export function RightPanel() {
  const { selectedTab } = useTabsStore();
  const { control, setValue, watch } = useFormContext<DisplayConfig>();
  const displayConfig = useWatch({ control, name: "displayConfig" }) || {};


  // Helper: extract base code ("en3" => "en")
function getBaseCode(code: string) {
  return code.replace(/\d+$/, "");
}

  return (
    <section className="w-[320px] shrink-0 flex flex-col gap-4 overflow-auto bg-sidebar border-l p-4">
      <Label>Simulation Settings</Label>
      <Accordion type="multiple"  className="w-full rounded-md border" >
        {Object.entries(displayConfig).map(([lang, screens]) => {
          const screen = (screens as Screens)[selectedTab];
          if (!screen) return null;

          const formatField = `displayConfig.${lang}.${selectedTab}.format` as const;
          const textsField = `displayConfig.${lang}.${selectedTab}.texts` as const;
          const currentFormat: ScreenFormat = watch(formatField);
          const items = getTextItemsForFormat(currentFormat, lang, selectedTab);

          return (
            <AccordionItem className="bg-accent/50" value={lang} key={lang}>
              <AccordionTrigger className="px-5">
              <span className='flex items-center gap-4'>
                <Languages className='size-4 shrink-0' />
                <span>{AVAILABLE_LANGUAGES.find(l => l.code === getBaseCode(lang))?.label || getBaseCode(lang)}</span>
              </span>
                
                </AccordionTrigger>
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