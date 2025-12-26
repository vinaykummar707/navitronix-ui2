import type { ScreenFormat } from "@/routeConfig";

export function getTextItemsForFormat(format: ScreenFormat, lang: string, tab: string) {
  const base = `displayConfig.${lang}.${tab}.texts`;
  if (format === "single") {
    return [{ label: "Text", name: `${base}.text` }];
  }
  if (format === "two") {
    return [
      { label: "Route Number", name: `${base}.sideText` },
      { label: "Text", name: `${base}.text` },
    ];
  }
  if (format === "three") {
    return [
      { label: "Route Number", name: `${base}.sideText` },
      { label: "Upper Half Text", name: `${base}.upperHalfText` },
      { label: "Lower Half Text", name: `${base}.lowerHalfText` },
    ];
  }
  return [];
}