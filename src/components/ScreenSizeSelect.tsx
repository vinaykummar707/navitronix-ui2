import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useFormContext } from "react-hook-form";
import { DEFAULT_SCREEN_HEIGHTS, DEFAULT_SCREEN_WIDTHS, type ScreenHeight, type ScreenWidth, type DisplayConfig } from "@/routeConfig";
import { Label } from "./ui/label";

type Props = {
  fieldPrefix: string; // e.g. "displayConfig.en.front"
};

export const ScreenSizeSelect: React.FC<Props> = ({ fieldPrefix }) => {
  const { watch, setValue } = useFormContext<DisplayConfig>();
  const height: ScreenHeight = watch(`${fieldPrefix}.height`);
  const width: ScreenWidth = watch(`${fieldPrefix}.width`);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-4">
        <Label>Height</Label>
        <Select
          value={String(height ?? "")}
          onValueChange={val =>
            setValue(`${fieldPrefix}.height`, Number(val) as ScreenHeight, { shouldDirty: true, shouldValidate: true })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Height" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_SCREEN_HEIGHTS.map(h => (
              <SelectItem key={h} value={String(h)}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <Label>Width</Label>
        <Select
          value={String(width ?? "")}
          onValueChange={val => 
            setValue(`${fieldPrefix}.width`, Number(val) as ScreenWidth, { shouldDirty: true, shouldValidate: true })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Width" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_SCREEN_WIDTHS.map(w => (
              <SelectItem key={w} value={String(w)}>{w}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};