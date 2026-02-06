import React from "react";
import { useFormContext } from "react-hook-form";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Label } from "./ui/label";
import { FormatSelect } from "./FormatSelect";
import { TextPropertiesAccordion } from "./TextPropertiesAccordion";
import { CopyBoardPropertiesButton } from "./CopyBoardPropertiesButton";
import { ScreenSizeSelect } from "./ScreenSizeSelect";
import { getTextItemsForFormat } from "./getTextItemsForFormat";
import { getDefaultTextsForFormat } from "@/defaultValues";
import type { DisplayConfig, Screen, ScreenFormat } from "@/routeConfig";
import { LanguageBadge } from "./LanguageBadge";

// ============================================================================
// TYPES
// ============================================================================

interface LanguageAccordionItemProps {
  lang: string;
  label: string;
  selectedTab: string;
  screen: Screen;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Individual language accordion item [web:62][web:65]
 * Extracted for better separation of concerns and performance
 */
export const LanguageAccordionItem: React.FC<LanguageAccordionItemProps> = ({
  lang,
  label,
  selectedTab,
  screen,
}) => {
  const { setValue, watch } = useFormContext<DisplayConfig>();

  // Construct field paths
  const formatField = `displayConfig.${lang}.${selectedTab}.format` as const;
  const textsField = `displayConfig.${lang}.${selectedTab}.texts` as const;
  const heightField = `displayConfig.${lang}.${selectedTab}.height` as const;
  const widthField = `displayConfig.${lang}.${selectedTab}.width` as const;

  const currentFormat: ScreenFormat = watch(formatField);
  
  // Get text items for current format
  const textItems = getTextItemsForFormat(currentFormat, lang, selectedTab);

  /**
   * Handle format change with proper form updates [web:64]
   */
  const handleFormatChange = (nextFormat: ScreenFormat) => {
    
    setValue(formatField, nextFormat, { 
      shouldDirty: true, 
      shouldValidate: true 
    });
    
    setValue(textsField, getDefaultTextsForFormat(nextFormat), { 
      shouldDirty: true, 
      shouldValidate: true 
    });

//how to get height and width value from using heightField and widthField and reset them to default values when format changes
    const currentHeight = watch(heightField);
    const currentWidth = watch(widthField);
    
    // Reset dimensions
    setValue(heightField, currentHeight, { 
      shouldDirty: true, 
      shouldValidate: true 
    });
    
    setValue(widthField, currentWidth, { 
      shouldDirty: true, 
      shouldValidate: true 
    });
  };

  return (
    <AccordionItem value={lang}>
      <AccordionTrigger className="px-4 py-3">
        <LanguageBadge langCode={lang} label={label} />
      </AccordionTrigger>

      <AccordionContent className="flex flex-col pt-2 pb-4 gap-4 px-4">
        {/* Screen Size Configuration */}
        <ScreenSizeSelect fieldPrefix={`displayConfig.${lang}.${selectedTab}`} />

        {/* Format Selection */}
        <FormatSelect
          langCode={lang}
          format={currentFormat}
          onChange={handleFormatChange}
        />

        {/* Copy Controls */}
        <div className="space-y-4">
          <Label>Copy This Simulation</Label>
          <CopyBoardPropertiesButton lang={lang} current={selectedTab as any} />
        </div>

        {/* Text Properties */}
        <div className="space-y-4">
          <Label>Text Properties</Label>
          <TextPropertiesAccordion items={textItems} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
