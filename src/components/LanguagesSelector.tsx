import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DisplayConfig, Screens, Screen, ScreenFormat } from "@/routeConfig";
import { AVAILABLE_LANGUAGES } from "@/defaultValues";
import { Button } from "./ui/button";
import { X } from "lucide-react";



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

// ... existing imports and constants ...

// Helper: gets next available code with suffix (e.g., "en", "en2", "en3")
function getNextLanguageKey(baseCode: string, existingKeys: string[]): string {
  if (!existingKeys.includes(baseCode)) return baseCode;
  let counter = 2;
  // Keep incrementing suffix until unique
  while (existingKeys.includes(`${baseCode}${counter}`)) counter++;
  return `${baseCode}${counter}`;
}

// Helper: extract base code ("en3" => "en")
function getBaseCode(code: string) {
  return code.replace(/\d+$/, "");
}

// export const LanguagesSelector: React.FC = () => {
//   const { control, setValue } = useFormContext<DisplayConfig>();
//   const displayConfig = useWatch({
//     control,
//     name: "displayConfig"
//   }) || {};

//   // Use an array for the selected languages (allow duplicates)
//   const selectedLanguages = Array.isArray(displayConfig)
//     ? displayConfig
//     : Object.keys(displayConfig).length > 0
//       ? Object.entries(displayConfig).map(([code, screens]) => ({ code, screens }))
//       : [{ code: "none", screens: getDefaultScreens() }];

//   // Handle language change at index
//   const handleLanguageChange = (idx: number, newLang: string) => {
//     const updated = selectedLanguages.map((entry, i) =>
//       i === idx
//         ? {
//             ...entry,
//             code: newLang
//           }
//         : entry
//     );
//     setValue(
//       "displayConfig",
//       Object.fromEntries(updated.map(entry => [entry.code, entry.screens])),
//       { shouldValidate: true, shouldDirty: true }
//     );
//   };

//   // Add a new row (default language "none")
//   const handleAddLanguage = () => {
//     const newEntry = { code: "none", screens: getDefaultScreens() };
//     const updated = [...selectedLanguages, newEntry];
//     setValue(
//       "displayConfig",
//       Object.fromEntries(updated.map(entry => [entry.code, entry.screens])),
//       { shouldValidate: true, shouldDirty: true }
//     );
//   };

//   // Remove row at index (unless it's the only one left)
//   const handleRemoveLanguage = (idx: number) => {
//     if (selectedLanguages.length === 1) return;
//     const updated = selectedLanguages.filter((_, i) => i !== idx);
//     setValue(
//       "displayConfig",
//       Object.fromEntries(updated.map(entry => [entry.code, entry.screens])),
//       { shouldValidate: true, shouldDirty: true }
//     );
//   };

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {selectedLanguages.map((entry, idx) => (
//         <div key={idx} className="flex w-full gap-2 items-end">
//           <div className="flex flex-col flex-1 gap-1">
//             <label className="text-sm font-semibold">Language {idx + 1}</label>
//             <Select
//               value={entry.code}
//               onValueChange={val => handleLanguageChange(idx, val)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select language" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem key="none" value="none">
//                   None
//                 </SelectItem>
//                 {AVAILABLE_LANGUAGES.map(lang => (
//                   <SelectItem key={lang.code} value={lang.code}>
//                     {lang.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <Button
//           variant={'outline'}
//           type="button"
//             onClick={() => handleRemoveLanguage(idx)}
//             disabled={selectedLanguages.length === 1}
//             aria-label="Remove language"
//           >
//             <X/>
//           </Button>
//         </div>
//       ))}
//       <Button
//        type="button"
//         onClick={handleAddLanguage}
//       >
//         Add Language
//       </Button>
//     </div>
//   );
// };

// // ... rest of file ...

export const LanguagesSelector: React.FC = () => {
  const { control, setValue } = useFormContext<DisplayConfig>();
  const displayConfig = useWatch({
    control,
    name: "displayConfig"
  }) || {};

  // Always make array of keys for rendering order
  const languageKeys = Object.keys(displayConfig).length
    ? Object.keys(displayConfig)
    : ["none"];

  // On language or row change
  const handleLanguageChange = (idx: number, newBaseCode: string) => {
    const prevLangKey = languageKeys[idx];
    // Remove the old key, prepare list of others
    const otherKeys = languageKeys.filter((_, i) => i !== idx);

    // Compute new key (with suffix if needed)
    const newLangKey = getNextLanguageKey(newBaseCode, otherKeys);

    // Build new config object...
    const newDisplayConfig: Record<string, Screens> = {};
    languageKeys.forEach((langKey, i) => {
      if (i === idx) {
        newDisplayConfig[newLangKey] =
          displayConfig[langKey] ?? getDefaultScreens();
      } else {
        newDisplayConfig[langKey] = displayConfig[langKey];
      }
    });

    setValue("displayConfig", newDisplayConfig, { shouldValidate: true, shouldDirty: true });
  };

  const handleAddLanguage = () => {
    // Default to first language or "none"
    const baseCode = "none";
    const newKey = getNextLanguageKey(baseCode, languageKeys);
    setValue(
      "displayConfig",
      { ...displayConfig, [newKey]: getDefaultScreens() },
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const handleRemoveLanguage = (idx: number) => {
    if (languageKeys.length === 1) return;
    const newDisplayConfig = { ...displayConfig };
    delete newDisplayConfig[languageKeys[idx]];
    setValue("displayConfig", newDisplayConfig, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {languageKeys.map((langKey, idx) => (
        <div key={langKey} className="flex w-full gap-2 items-end">
          <div className="flex flex-col flex-1 gap-1">
            <label className="text-sm font-semibold">Language {idx + 1}</label>
            <Select
              value={getBaseCode(langKey) || "none"}
              onValueChange={val => handleLanguageChange(idx, val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="none" value="none">
                  None
                </SelectItem>
                {AVAILABLE_LANGUAGES.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
                    <Button
          variant={'outline'}
          type="button"
            onClick={() => handleRemoveLanguage(idx)}
            disabled={languageKeys.length === 1}
            aria-label="Remove language"
          >
            <X/>
          </Button>
        </div>
      ))}
         <Button
         type="button"
          onClick={handleAddLanguage}
        >
          Add Language
        </Button>
    </div>
  );
};