// other imports remain unchanged...

import type { DisplayConfig, FontWeight, Position, RouteInformation, ScreenFormat, ScrollType } from "./routeConfig";

// ... existing code ...

// Define an empty version for initialization
export const defaultRoute: RouteInformation = {
    routeNumber: "",
    source: "",
    destination: "",
    via: "",
    splitRoute: false,
    routeNumber1: "",
    routeNumber2: "",
    separation: "",
    showRt: false,
    showSpm: false,
    showBoth: false,
};



export const defaultValues: DisplayConfig = {
    route: defaultRoute,
    displayConfig: {
        en: {
            front: {
                format: "single", texts: {
                    text: {
                        text: "", bitmap: "", fontWidth: 12, scrollType: "Fixed", position: "Center",
                        scrollSpeed: 1, fontSize: 24, fontWeight: "Regular", fontHeight: 12, x_offset: 0, y_offset: 0, spacing: 1
                    }
                }
            },
            side: {
                format: "single", texts: {
                    text: {
                        text: "", bitmap: "", fontWidth: 12, scrollType: "Fixed", position: "Center",
                        scrollSpeed: 1, fontSize: 24, fontWeight: "Regular", fontHeight: 12, x_offset: 0, y_offset: 0, spacing: 1
                    }
                }
            },
            rear: {
                format: "single", texts: {
                    text: {
                        text: "", bitmap: "", fontWidth: 12, scrollType: "Fixed", position: "Center",
                        scrollSpeed: 1, fontSize: 24, fontWeight: "Regular", fontHeight: 12, x_offset: 0, y_offset: 0, spacing: 1
                    }
                }
            },
            internal: {
                format: "single", texts: {
                    text: {
                        text: "", bitmap: "", fontWidth: 12, scrollType: "Fixed", position: "Center",
                        scrollSpeed: 1, fontSize: 24, fontWeight: "Regular", fontHeight: 12, x_offset: 0, y_offset: 0, spacing: 1
                    }
                }
            },
        },
    },
    version: "",
    areaId: "",
    depotId: "",
    specialMessages: [],
};



export const scrollTypes: ScrollType[] = [
    "Left To Right",
    "Right To Left",
    "Fixed",
    "Flicker",
];
export const positions: Position[] = ["Left", "Right", "Center"];
export const fontWeights: FontWeight[] = ["Regular", "Bold"];
export const screenFormats: ScreenFormat[] = ["single", "two", "three"];


export const getDefaultTextConfig = () => ({
    text: "",
    bitmap: "",
    fontWidth: 12,
    scrollType: "Fixed" as ScrollType,
    position: "Center" as Position,
    scrollSpeed: 1,
    fontSize: 24,
    fontWeight: "Regular" as FontWeight,
    fontHeight: 12,
    x_offset: 0,
    y_offset: 0,
    spacing: 1,
  });


  // Provide correct text config for each screen format
export function getDefaultTextsForFormat(format: ScreenFormat) {
    const base = getDefaultTextConfig();
    if (format === "single") {
      return { text: { ...base } };
    }
    if (format === "two") {
      return {
        sideText: { ...base },
        text: { ...base },
      };
    }
    if (format === "three") {
      return {
        sideText: { ...base },
        upperHalfText: { ...base },
        lowerHalfText: { ...base },
      };
    }
    // fallback
    return { text: { ...base } };
  }


  // Usage: { format, texts: getDefaultTextsForFormat(format) }

export function getDefaultScreen(format: ScreenFormat = "single") {
    return {
      format,
      texts: getDefaultTextsForFormat(format),
    };
  }