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
import { CopyBoardPropertiesAllButton } from "./CopyBoardPropertiesAllButton";
import { ScreenSizeSelect } from "./ScreenSizeSelect";

export function RightPanel() {
  const { selectedTab } = useTabsStore();
  const { control, setValue, watch } = useFormContext<DisplayConfig>();
  const displayConfig = useWatch({ control, name: "displayConfig" }) || {};

  return (
    <section className="w-[340px] shrink-0 flex flex-col gap-4  scrollbar-minimal overflow-auto bg-sidebar border-l p-4">
      <Label className="capitalize"> {selectedTab} Board Settings</Label>

      <Label className="">Copy To Board</Label>

      <CopyBoardPropertiesAllButton current={selectedTab as any}/>

      <Label>Simulation Settings</Label>


      <Accordion   type="multiple"  className="w-full rounded-md border" >
        {Object.entries(displayConfig).map(([lang, screens]) => {
          const screen = (screens as Screens)[selectedTab];
          if (!screen) return null;

          const formatField = `displayConfig.${lang}.${selectedTab}.format` as const;
          const textsField = `displayConfig.${lang}.${selectedTab}.texts` as const;
          const height = `displayConfig.${lang}.${selectedTab}.height` as const;
          const width = `displayConfig.${lang}.${selectedTab}.width` as const;
          const currentFormat: ScreenFormat = watch(formatField);
          const items = getTextItemsForFormat(currentFormat, lang, selectedTab);

          return (
            <AccordionItem className="bg-accent/0" value={lang} key={lang}>
              <AccordionTrigger className="px-4">
              <span className='flex items-center gap-4'>
                <Languages className='size-4 shrink-0' />
                <span>{AVAILABLE_LANGUAGES.find(l => l.code === lang)?.label || lang}</span>
              </span>
                
                </AccordionTrigger>
              <AccordionContent className=" flex flex-col gap-4 px-4">
              <ScreenSizeSelect fieldPrefix={`displayConfig.${lang}.${selectedTab}`}/>
                <FormatSelect
                langCode= {lang}
                  format={currentFormat}
                  onChange={next => {
                    setValue(formatField, next, { shouldDirty: true, shouldValidate: true });
                    setValue(textsField, getDefaultTextsForFormat(next), { shouldDirty: true, shouldValidate: true });
                    setValue(height, 16, { shouldDirty: true, shouldValidate: true });
                    setValue(width, 96, { shouldDirty: true, shouldValidate: true });
                  }}
                />
                <Label>Copy This Simulation</Label>
                <CopyBoardPropertiesButton lang={lang} current={selectedTab as any} />
                <Label>Text Properties</Label>
                <TextPropertiesAccordion  items={items} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}