import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { screenFormats } from "@/defaultValues";
import type { ScreenFormat } from "@/routeConfig";

interface FormatSelectProps {
  format: ScreenFormat;
  onChange: (next: ScreenFormat) => void;
  langCode?: string; // Add langCode prop
}

export function FormatSelect({ format, onChange, langCode = "en" }: FormatSelectProps) {
  // Show all formats for English, only "single" and "two" for others
  const filteredFormats =
    langCode === "en"
      ? screenFormats
      : screenFormats.filter(fmt => fmt === "single" || fmt === "two");

  return (
    <>
      <Label>Choose Simulation Format</Label>
      <Select value={format} onValueChange={onChange}>
        <SelectTrigger className="w-full">
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
    </>
  );
}