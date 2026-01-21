import React, { useState, useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import useTabsStore from "@/stores/useTabsStore";
import {
  ensureMin,
  ensureNumber,
  getBitmapColumns,
} from "@/utils/measurements";
import type { DisplayConfig, Screen } from "@/routeConfig";
import LEDBitmapSimulator from "./LedSignBoard";
import { useFontFileByLanguage } from "@/utils/getFontFileByLanguage";
import { Button } from "./ui/button";
import { Play, StopCircle } from "lucide-react";

interface DisplayEditorProps {
  language: string;
}

/**
 * Extracted LED Wrapper to prevent re-creation on every parent render
 */
const LEDWrapper = ({ 
  fieldKey, rows, cols, textConfig, isRouteNumber = false, 
  fontFamily, stopScroll, basePath, watch, setValue 
}: any) => {
  const fieldPath = `${basePath}.texts.${fieldKey}`;
  const currentBitmap = watch(`${fieldPath}.bitmap`);

  const handleBitmapChange = useCallback((text: string) => {
    if (text !== currentBitmap) {
      setValue(`${fieldPath}.bitmap`, text);
      setValue(`${fieldPath}.fontWidth`, getBitmapColumns(text));
    }
  }, [currentBitmap, fieldPath, setValue]);

  return (
    <LEDBitmapSimulator
      stopScroll={stopScroll}
      rows={rows}
      cols={cols}
      text={textConfig}
      isRouteNumber={isRouteNumber}
      fontFamily={fontFamily}
      onBitmapTextChange={handleBitmapChange}
    />
  );
};

export default function DisplayEditor({ language }: DisplayEditorProps) {
  const { selectedTab } = useTabsStore();
  const { watch, setValue } = useFormContext<DisplayConfig>();
  const getFontFileByLanguage = useFontFileByLanguage();
  const [isScrollStopped, setIsScrollStopped] = useState(false);

  const basePath = `displayConfig.${language}.${selectedTab}`;
  const screenConfig = watch(basePath) as Screen | undefined;
  const routeData = watch("route");

  if (!screenConfig) return null;

  const commonProps = {
    stopScroll: isScrollStopped,
    basePath,
    watch,
    setValue,
  };

// ... existing code ...

const renderPlaybackControls = () => (
  <div className="flex gap-2">
    <Button
      variant={isScrollStopped ? "default" : "destructive"}
      onClick={() => setIsScrollStopped(!isScrollStopped)}
    >
      {isScrollStopped ? (
        <>
          <Play className="h-4 w-4" /> Play
        </>
      ) : (
        <>
          <StopCircle className="h-4 w-4" /> Pause
        </>
      )}
    </Button>
  </div>
);

// ... rest of code ...

  // Layout Logic for Multi-screen formats
  const renderMultiLayout = () => {
    const splitRoute = routeData?.splitRoute;
    const sideTextBitmap = watch(`${basePath}.texts.sideText.bitmap`);
    const routeBitmap1 = watch(`${basePath}.texts.routeNumber1.bitmap`);
    const routeBitmap2 = watch(`${basePath}.texts.routeNumber2.bitmap`);

    const routePosition = !splitRoute 
      ? watch(`${basePath}.texts.sideText.position`) 
      : watch(`${basePath}.texts.routeNumber1.position`);

    const leftCols = ensureMin(
      splitRoute 
        ? Math.max(getBitmapColumns(routeBitmap1), getBitmapColumns(routeBitmap2)) 
        : getBitmapColumns(sideTextBitmap),
      96
    );

    const availableWidth = ensureNumber(screenConfig.width, 10) - leftCols;

    return (
      <div className={`flex ${routePosition === "Right" ? "flex-row-reverse" : "flex-row"}`}>
        {splitRoute ? (
          <div className="flex flex-col">
            {["routeNumber1", "routeNumber2"].map((key) => (
              <LEDWrapper
                key={key}
                {...commonProps}
                fieldKey={key}
                rows={(screenConfig.height || 16) / 2}
                cols={leftCols + 1}
                textConfig={screenConfig.texts?.[key]}
                isRouteNumber={true}
                fontFamily={getFontFileByLanguage(language, key, screenConfig.texts?.[key]?.fontHeight)}
              />
            ))}
          </div>
        ) : (
          <LEDWrapper
            {...commonProps}
            fieldKey="sideText"
            rows={screenConfig.height || 16}
            cols={leftCols + 1}
            textConfig={screenConfig.texts?.sideText}
            isRouteNumber={true}
            fontFamily={getFontFileByLanguage(language, "sideText", screenConfig.texts?.sideText?.fontHeight)}
          />
        )}

        {screenConfig.format === "two" ? (
          <LEDWrapper
            {...commonProps}
            fieldKey="text"
            rows={screenConfig.height || 16}
            cols={ensureMin(availableWidth, 96)}
            textConfig={screenConfig.texts?.text}
            fontFamily={getFontFileByLanguage(language, "text", screenConfig.texts?.text?.fontHeight)}
          />
        ) : (
          <div className="flex flex-col">
            {["upperHalfText", "lowerHalfText"].map((key) => (
              <LEDWrapper
                key={key}
                {...commonProps}
                fieldKey={key}
                rows={(screenConfig.height || 16) / 2}
                cols={ensureMin(availableWidth, 96)}
                textConfig={screenConfig.texts?.[key]}
                fontFamily={getFontFileByLanguage(language, key, screenConfig.texts?.[key]?.fontHeight)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col  items-start gap-4">
      {renderPlaybackControls()}
      <div className="border-4">
        {screenConfig.format === "single" ? (
          <LEDWrapper
            {...commonProps}
            fieldKey="text"
            rows={screenConfig.height || 16}
            cols={ensureNumber(screenConfig.width, 96)}
            textConfig={screenConfig.texts?.text}
            fontFamily={getFontFileByLanguage(language, "text", screenConfig.texts?.text?.fontHeight)}
          />
        ) : (
          renderMultiLayout()
        )}
      </div>
    </div>
  );
}
