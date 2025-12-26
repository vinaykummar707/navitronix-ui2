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
    showRt: true,
    showSpm: false,
    showBoth: false,
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
    text: "SAMPLE TEXT",
    bitmap: "",
    fontWidth: 12,
    scrollType: "Fixed" as ScrollType,
    position: "Center" as Position,
    scrollSpeed: 1,
    fontWeight: "Regular" as FontWeight,
    fontHeight: 12,
});

export const getDefaultTextConfigRouteNumber = () => ({
    text: "123",
    bitmap: "",
    fontWidth: 12,
    scrollType: "Fixed" as ScrollType,
    position: "Center" as Position,
    scrollSpeed: 1,
    fontWeight: "Regular" as FontWeight,
    fontHeight: 12,
});


// Provide correct text config for each screen format
export function getDefaultTextsForFormat(format: ScreenFormat) {
    const base = getDefaultTextConfig();
    const base2 = getDefaultTextConfigRouteNumber();
    if (format === "single") {
        return { text: { ...base } };
    }
    if (format === "two") {
        return {
            sideText: { ...base2 },
            text: { ...base },
        };
    }
    if (format === "three") {
        return {
            sideText: { ...base2 },
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


export const AVAILABLE_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "as", label: "Assamese" },
    { code: "bn", label: "Bengali" },
    { code: "gu", label: "Gujarati" },
    { code: "kn", label: "Kannada" },
    { code: "ml", label: "Malayalam" },
    { code: "mr", label: "Marathi" },
    { code: "or", label: "Odia" },
    { code: "pa", label: "Punjabi" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
    { code: "ur", label: "Urdu" },
    { code: "ks", label: "Kashmiri" },
    { code: "kok", label: "Konkani" },
    { code: "mai", label: "Maithili" },
    { code: "mn", label: "Manipuri" },         // ISO code 'mni', sometimes 'mn' (Manipur)
    { code: "ne", label: "Nepali" },
    { code: "sa", label: "Sanskrit" },
    { code: "sd", label: "Sindhi" },
    { code: "si", label: "Sinhala" },
    { code: "bho", label: "Bhojpuri" },
    { code: "doi", label: "Dogri" },
    { code: "gom", label: "Goan Konkani" },
    { code: "sat", label: "Santali" },
    { code: "mni", label: "Meitei (Manipuri)" },
    { code: "brx", label: "Bodo" },
    { code: "raj", label: "Rajasthani" },
    { code: "chy", label: "Chhattisgarhi" },
    // Add or adjust as per your app and available data/fonts
];


export const defaultValues: DisplayConfig = {
    route: defaultRoute,
    displayConfig: {
        en: {
            front: getDefaultScreen('single'),
            side: getDefaultScreen('single'),
            rear: getDefaultScreen('single'),
            internal: getDefaultScreen('single')
        },
    },
    version: "1.0",
    areaId: "",
    depotId: "",
    specialMessages: [],
};
