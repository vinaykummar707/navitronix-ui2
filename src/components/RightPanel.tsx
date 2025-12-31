import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useTabsStore from "@/stores/useTabsStore";
import { AVAILABLE_LANGUAGES, getDefaultTextsForFormat } from "@/defaultValues";
import type { DisplayConfig, Screens, ScreenFormat, Screen } from "@/routeConfig";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Label } from "./ui/label";
import { CopyBoardPropertiesAllButton } from "./CopyBoardPropertiesAllButton";
import { LanguageAccordionItem } from "./LanguageAccordionItem";

// ============================================================================
// TYPES
// ============================================================================

interface LanguageConfig {
  lang: string;
  screen: Screen;
  label: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get language label from code [web:62][web:65]
 */
const getLanguageLabel = (langCode: string): string => {
  return AVAILABLE_LANGUAGES.find(l => l.code === langCode)?.label || langCode;
};

/**
 * Filter valid language configurations [web:62][web:66]
 */
const getValidLanguageConfigs = (
  displayConfig: DisplayConfig,
  selectedTab: string
): LanguageConfig[] => {
  return Object.entries(displayConfig)
    .map(([lang, screens]) => {
      const screen = (screens as Screens)[selectedTab];
      if (!screen) return null;

      return {
        lang,
        screen,
        label: getLanguageLabel(lang),
      };
    })
    .filter((config): config is LanguageConfig => config !== null);
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Language badge component [web:62][web:65]
 */
const LanguageBadge: React.FC<{ langCode: string; label: string }> = ({ 
  langCode, 
  label 
}) => (
  <span className="flex items-center gap-4">
    <span
      className="flex text-xs capitalize size-8 shrink-0 items-center bg-indigo-900 justify-center rounded-full border"
      aria-hidden="true"
    >
      {langCode}
    </span>
    <span className="flex flex-col space-y-0.5">
      <span>{label}</span>
    </span>
  </span>
);

/**
 * Copy section header component [web:62]
 */
const CopySection: React.FC<{ selectedTab: string }> = ({ selectedTab }) => (
  <div className="p-4  space-y-4">
    <Label>Copy All To Other Board</Label>
    <CopyBoardPropertiesAllButton current={selectedTab as any} />
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Right panel component with optimized performance [web:64][web:67]
 */
export function RightPanel() {
  const { selectedTab } = useTabsStore();
  const { control } = useFormContext<DisplayConfig>();
  
  // Use useWatch for performance optimization [web:64]
  const displayConfig = useWatch({ 
    control, 
    name: "displayConfig",
    defaultValue: {} 
  });

  // Memoize language configurations to prevent unnecessary recalculations [web:63][web:66]
  const languageConfigs = useMemo(
    () => getValidLanguageConfigs(displayConfig || {}, selectedTab),
    [displayConfig, selectedTab]
  );

  // Early return if no configurations [web:62]
  if (languageConfigs.length === 0) {
    return (
      <section className="w-[280px] shrink-0 flex flex-col gap-4 scrollbar-minimal overflow-auto bg-sidebar border-l">
        <div className="p-4 text-muted-foreground">
          <p className="text-sm">No language configurations available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-[280px] shrink-0 flex flex-col gap-4 scrollbar-minimal overflow-auto bg-sidebar border-l">
      <CopySection selectedTab={selectedTab} />

      <Accordion type="multiple" className="w-full border-y">
        {languageConfigs.map(({ lang, screen, label }) => (
          <LanguageAccordionItem
            key={lang}
            lang={lang}
            label={label}
            selectedTab={selectedTab}
            screen={screen}
          />
        ))}
      </Accordion>
    </section>
  );
}
