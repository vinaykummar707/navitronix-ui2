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
    <section className="w-[280px] shrink-0 flex flex-col gap-4  scrollbar-minimal overflow-auto bg-sidebar border-l ">

      <div className="p-4 text-muted-foreground space-y-4">
        <Label className="">Copy To Board</Label>

        <CopyBoardPropertiesAllButton current={selectedTab as any} />
      </div>




      <Accordion type="multiple"  className="w-full  border-y " >
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
            <AccordionItem className="" value={lang} key={lang}>
              <AccordionTrigger className="px-4 py-3">
                {/* <span className='flex items-center gap-4'>
                <Languages className='size-4 shrink-0' />
                <span>{AVAILABLE_LANGUAGES.find(l => l.code === lang)?.label || lang}</span>
              </span> */}

                <span className='flex items-center gap-4'>
                  <span
                    className='flex text-xs capitalize size-8 shrink-0 items-center bg-indigo-900 justify-center rounded-full border'
                    aria-hidden='true'
                  >
                    {lang}
                  </span>
                  <span className='flex flex-col space-y-0.5'>
                    <span>{AVAILABLE_LANGUAGES.find(l => l.code === lang)?.label || lang}</span>
                  </span>
                </span>

              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground  flex flex-col pt-2 pb-4 gap-4 px-4">
                <ScreenSizeSelect fieldPrefix={`displayConfig.${lang}.${selectedTab}`} />
                <FormatSelect
                  langCode={lang}
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
                <TextPropertiesAccordion items={items} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}