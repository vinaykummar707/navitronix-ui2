import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DisplayConfig, Screens, Screen, ScreenFormat } from "@/routeConfig";

const AVAILABLE_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" },
  { code: "ta", label: "Tamil" },
  // ...add more as needed
];

const DEFAULT_SCREEN: Screen = {
  format: "single",
  texts: {
    text: {
      text: "",
      fontWeight: "Regular",
      scrollType: "Fixed",
      fontSize: 22,
      fontWidth: 12,
      fontHeight: 12,
      position: "Center",
      scrollSpeed: 1,
      x_offset: 0,
      y_offset: 0,
      spacing: 1
    }
  }
};

const getDefaultScreens = (): Screens => ({
  front: { ...DEFAULT_SCREEN },
  side: { ...DEFAULT_SCREEN },
  rear: { ...DEFAULT_SCREEN },
  internal: { ...DEFAULT_SCREEN }
});

export const LanguagesSelector: React.FC = () => {
  const { control, setValue } = useFormContext<DisplayConfig>();

  // Watch for the current displayConfig
  const displayConfig = useWatch({
    control,
    name: "displayConfig"
  }) || {};

  // The order in the selects; if less than 3, fill with "none"
  const selectedLanguages = Object.keys(displayConfig).concat(Array(3).fill("none")).slice(0, 3);

  // Utility: Handle a language select change
  const handleLanguageChange = (idx: number, newLang: string) => {
    const current = Object.keys(displayConfig);
    const newSelectedLanguages = [...selectedLanguages];
    const prevLang = newSelectedLanguages[idx];

    // If same, do nothing
    if (prevLang === newLang) return;

    // Update the selection
    newSelectedLanguages[idx] = newLang;

        // Remove selections marked "none" or empty
    const cleanLangs = newSelectedLanguages.filter(l => l !== "none");

 

    // Build a newDisplayConfig with only the currently selected 3
    const newDisplayConfig: Record<string, Screens> = {};
    for (const code of cleanLangs) {
      if (displayConfig[code]) {
        newDisplayConfig[code] = displayConfig[code];
      } else {
        newDisplayConfig[code] = getDefaultScreens();
      }
    }
    setValue("displayConfig", newDisplayConfig, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="grid grid-cols-1  gap-4">
      {[0, 1, 2].map((idx) => (
        <div key={idx} className="flex w-full gap-4 flex-col">
          <label className=" text-sm font-semibold">Language {idx + 1}</label>
          <Select
          
            value={selectedLanguages[idx] || ""}
            onValueChange={val => handleLanguageChange(idx, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem  key="none" value="none">
                None
              </SelectItem>
              {AVAILABLE_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};