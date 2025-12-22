import React from "react";
import useTabsStore from "@/stores/useTabsStore";
import { useFormContext, useWatch, set, useFieldArray } from "react-hook-form";
import { TextPropertiesForm } from "@/components/TextPropertiesForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { screenFormats, getDefaultTextsForFormat } from "@/defaultValues";
import type { DisplayConfig, Screens, Screen, ScreenFormat } from "@/routeConfig";

export function RightPanel() {
  const { selectedTab } = useTabsStore(); // e.g. "front", "side", etc.
  const { control, setValue, watch } = useFormContext<DisplayConfig>();
  const displayConfig = useWatch({ control, name: "displayConfig" }) || {};

  return (
    <section className="w-[320px] flex flex-col overflow-auto bg-sidebar border-l p-4">
      {Object.entries(displayConfig).map(([lang, screens]) => {
        const screen = (screens as Screens)[selectedTab];
        if (!screen) return null;

        // format change
        const formatField = `displayConfig.${lang}.${selectedTab}.format` as const;
        const textsField = `displayConfig.${lang}.${selectedTab}.texts` as const;
        const currentFormat = watch(formatField);

        // Generate items list for editing texts (just as in previous answer)
        const items = (() => {
          if (currentFormat === "single") {
            return [{ label: "Text", name: `displayConfig.${lang}.${selectedTab}.texts.text` }];
          }
          if (currentFormat === "two") {
            return [
              { label: "Side Text", name: `displayConfig.${lang}.${selectedTab}.texts.sideText` },
              { label: "Text", name: `displayConfig.${lang}.${selectedTab}.texts.text` },
            ];
          }
          if (currentFormat === "three") {
            return [
              { label: "Side Text", name: `displayConfig.${lang}.${selectedTab}.texts.sideText` },
              { label: "Upper Half Text", name: `displayConfig.${lang}.${selectedTab}.texts.upperHalfText` },
              { label: "Lower Half Text", name: `displayConfig.${lang}.${selectedTab}.texts.lowerHalfText` },
            ];
          }
          return [];
        })();

        return (
          <div key={lang} className="mb-4 border-b">
            <h3 className="text-sm font-semibold mb-2">{lang.toUpperCase()}</h3>
            <div className="mb-2">
              <Select
                value={currentFormat}
                onValueChange={(next: ScreenFormat) => {
                  setValue(formatField, next, { shouldDirty: true, shouldValidate: true });
                  setValue(textsField, getDefaultTextsForFormat(next), { shouldDirty: true, shouldValidate: true });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {screenFormats.map(fmt => (
                    <SelectItem key={fmt} value={fmt}>
                      {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {items.map(({ label, name }) => (
              <div key={name} className="mb-3  p-2 rounded">
                <TextPropertiesForm name={name} heading={label} />
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}