import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useTabsStore from "@/stores/useTabsStore";
import { getBitmapColumns, getColumnsByBoard } from "@/utils/measurements";
import type { DisplayConfig, Screen, ScreenFormat, Position } from "@/routeConfig";
import LEDBitmapSimulator from "./LedSignBoard";
import { useFontFileByLanguage } from "@/utils/getFontFileByLanguage";
import { Button } from "./ui/button";
import { Play, StopCircle } from "lucide-react";





interface DisplayEditorProps {
  language: string;
}

export default function DisplayEditor({ language }: DisplayEditorProps) {
  // --- App State & Form ---
  const { selectedTab } = useTabsStore();

  // react-hook-form context
  const { watch, setValue } = useFormContext<DisplayConfig>();

  const getFontFileByLanguage = useFontFileByLanguage();
  // --- Data Extraction ---
  // For now set language to 'en', or watch it from form if you have a selector for it

  const [isScrollStopped, setIsScrollStopped] = useState(false);

  // Only watch the fields you need!
  const screenConfig = watch(`displayConfig.${language}.${selectedTab}`) as Screen | undefined;
  if (!screenConfig) return null; // Guard for load

  // Form fields
  const routeData = watch("route"); // This is RouteInformation

  // For simplicity, all texts referenced will work if form defaultValues are complete
  // --- Helpers ---
  const stopScroll = false; // Set this as needed, or wire from store/props

  const isSubmitting = false; // Set this if you have a submitting state

  // LEDBitmapSimulatorWrapper memoized
  const LEDBitmapSimulatorWrapper = React.useCallback(
    ({
      fieldKey,
      rows,
      cols,
      textConfig,
      isRouteNumber = false,
      fontFamily,
      stopScroll,
    }: {
      fieldKey: string;
      rows: number;
      cols: number;
      textConfig: any;
      isRouteNumber?: boolean;
      fontFamily: string;
      stopScroll: boolean;
    }) => {
      const currentBitmap = watch(
        `displayConfig.${language}.${selectedTab}.texts.${fieldKey}.bitmap`
      );

      // Memoize onBitmapTextChange per instance
      const handleBitmapTextChange = React.useCallback((text: string) => {
        if (text !== currentBitmap) {
          setValue(
            `displayConfig.${language}.${selectedTab}.texts.${fieldKey}.bitmap`,
            text
          );
          setValue(
            `displayConfig.${language}.${selectedTab}.texts.${fieldKey}.fontWidth`,
            getBitmapColumns(text)
          );
        }
      }, [currentBitmap, fieldKey, language, selectedTab, setValue]);

      return (
        <LEDBitmapSimulator
          stopScroll={stopScroll}
          rows={rows}
          cols={cols}
          text={textConfig}
          isRouteNumber={isRouteNumber}
          fontFamily={fontFamily}
          onBitmapTextChange={handleBitmapTextChange}

        />
      );
    },
    [language, selectedTab, setValue, stopScroll, watch]
  );

  // --- RouteNumberSimulators Inner Component ---
  const RouteNumberSimulators = () => {
    const bitmap1 = watch(
      `displayConfig.${language}.${selectedTab}.texts.routeNumber1.bitmap`
    );
    const bitmap2 = watch(
      `displayConfig.${language}.${selectedTab}.texts.routeNumber2.bitmap`
    );
    const maxCols =
      Math.max(getBitmapColumns(bitmap1), getBitmapColumns(bitmap2)) + 1;
    return (
      <div className="flex flex-col">
        <LEDBitmapSimulatorWrapper
          fieldKey="routeNumber1"
          rows={8}
          cols={maxCols}
          textConfig={screenConfig.texts?.routeNumber1}
          isRouteNumber={true}
          fontFamily={getFontFileByLanguage(
            language,
            "routeNumber1",
            screenConfig.texts.routeNumber1?.fontHeight
          )}
          stopScroll={isScrollStopped}
        />
        <LEDBitmapSimulatorWrapper
          fieldKey="routeNumber2"
          rows={8}
          cols={maxCols}
          textConfig={screenConfig.texts?.routeNumber2}
          isRouteNumber={true}
          fontFamily={getFontFileByLanguage(
            language,
            "routeNumber2",
            screenConfig.texts.routeNumber2?.fontHeight
          )}
          stopScroll={isScrollStopped}
        />
      </div>
    );
  };

  // --- Main Render ---
  if (screenConfig.format === "single") {
    return (
      <div className="flex flex-col-reverse items-start gap-4">
        <div className="mb-2 flex gap-2">
          <Button
            variant={isScrollStopped ? "default" : "outline"}
            onClick={() => setIsScrollStopped(false)}
          >
            <Play />
            Play
          </Button>
          <Button
            variant={!isScrollStopped ? "destructive" : "outline"}
            onClick={() => setIsScrollStopped(true)}
          >
            <StopCircle />
            Pause
          </Button>
        </div>
        <div className="  border-4   ">
          <LEDBitmapSimulatorWrapper
            fieldKey="text"
            rows={screenConfig.height}
            cols={screenConfig.width}
            textConfig={screenConfig.texts?.text}
            fontFamily={getFontFileByLanguage(
              language,
              "text",
              screenConfig.texts.text?.fontHeight
            )}
            stopScroll={isScrollStopped}
          />
        </div>
      </div>
    );
  }

  if (screenConfig.format === "two" || screenConfig.format === "three") {
    const splitRoute = routeData?.splitRoute;
    const routePosition = !splitRoute ? watch(
      `displayConfig.${language}.${selectedTab}.texts.sideText.position`
    ) : watch(
      `displayConfig.${language}.${selectedTab}.texts.routeNumber1.position`
    )
    const flexRowClass =
      routePosition === "Right" ? "flex-row-reverse" : "flex-row";

    const sideTextBitmap = watch(
      `displayConfig.${language}.${selectedTab}.texts.sideText.bitmap`
    );
    console.log(sideTextBitmap);
    const routeBitmap1 = watch(
      `displayConfig.${language}.${selectedTab}.texts.routeNumber1.bitmap`
    );
    const routeBitmap2 = watch(
      `displayConfig.${language}.${selectedTab}.texts.routeNumber2.bitmap`
    );

    const leftCols = splitRoute
      ? Math.max(getBitmapColumns(routeBitmap1), getBitmapColumns(routeBitmap2))
      : getBitmapColumns(sideTextBitmap);

    return (
      <div className="flex flex-col-reverse items-start gap-4">
        <div className="mb-2 flex gap-2">
          <Button
            variant={isScrollStopped ? "default" : "outline"}
            onClick={() => setIsScrollStopped(false)}
          >
            <Play />
            Play
          </Button>
          <Button
            variant={!isScrollStopped ? "destructive" : "outline"}
            onClick={() => setIsScrollStopped(true)}
          >
            <StopCircle />
            Stop
          </Button>
        </div>
        <div className=" border-4  ">
          <div className={`flex ${flexRowClass}`}>
            {splitRoute ? (
              <RouteNumberSimulators />
            ) : (
              <LEDBitmapSimulatorWrapper

                fieldKey="sideText"
                rows={16}
                cols={getBitmapColumns(sideTextBitmap) + 1}
                textConfig={screenConfig.texts?.sideText}
                isRouteNumber={true}
                fontFamily={getFontFileByLanguage(
                  language,
                  "sideText",
                  screenConfig.texts.sideText?.fontHeight
                )}
                stopScroll={isScrollStopped}
              />
            )}

            {screenConfig.format === "two" ? (
              <LEDBitmapSimulatorWrapper
                fieldKey="text"
                rows={screenConfig.height}
                cols={
                  screenConfig.width - leftCols
                }
                textConfig={screenConfig.texts?.text}
                fontFamily={getFontFileByLanguage(
                  language,
                  "text",
                  screenConfig.texts.text?.fontHeight
                )}
                stopScroll={isScrollStopped}
              />
            ) : (
              <div className="flex flex-col">
                <LEDBitmapSimulatorWrapper
                  fieldKey="upperHalfText"
                  rows={screenConfig.height / 2}
                  cols={
                    screenConfig.width -
                    getBitmapColumns(sideTextBitmap)
                  }
                  textConfig={screenConfig.texts?.upperHalfText}
                  fontFamily={getFontFileByLanguage(
                    language,
                    "upperHalfText",
                    screenConfig.texts.upperHalfText?.fontHeight
                  )}
                  stopScroll={isScrollStopped}
                />
                <LEDBitmapSimulatorWrapper
                  fieldKey="lowerHalfText"
                  rows={screenConfig.height / 2}
                  cols={
                    screenConfig.width -
                    getBitmapColumns(sideTextBitmap)
                  }
                  textConfig={screenConfig.texts?.lowerHalfText}
                  fontFamily={getFontFileByLanguage(
                    language,
                    "lowerHalfText",
                    screenConfig.texts.lowerHalfText?.fontHeight
                  )}
                  stopScroll={isScrollStopped}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If format not recognized, render nothing
  return null;
}