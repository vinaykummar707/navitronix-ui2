import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useFormContext, useWatch } from "react-hook-form";
import type { DisplayConfig, Screens } from "@/routeConfig";
import { AVAILABLE_LANGUAGES } from "@/defaultValues";

const BOARD_SIDES = ["front", "rear", "side", "internal"] as const;
type BoardSide = typeof BOARD_SIDES[number];

type Props = {
  lang?: string;
  current: BoardSide;
};

export const CopyBoardPropertiesAllButton: React.FC<Props> = ({ lang, current }) => {
  const { getValues, setValue } = useFormContext<DisplayConfig>();
  const [target, setTarget] = useState<BoardSide | "">("");



  // MAIN CHANGE: For each language, copy THEIR "current" config to THEIR target
  const handleCopyToAllLanguages = () => {
    if (!target) return;
    const displayConfig = getValues(`displayConfig`);
    if (!displayConfig) return;

    AVAILABLE_LANGUAGES.forEach(l => {
      const langBoards = displayConfig[l.code];
      if (langBoards && langBoards[current] && langBoards[target]) {
        const fromData = langBoards[current];
        setValue(
          `displayConfig.${l.code}.${target}`,
          JSON.parse(JSON.stringify(fromData)),
          { shouldDirty: true }
        );
      }
    });
  };

  // Disable copying to self
  const availableTargets = BOARD_SIDES.filter(side => side !== current);

  return (
    <div className="flex flex-col gap-4 items-center ">
      <Select value={target} onValueChange={setTarget}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Board" />
        </SelectTrigger>
        <SelectContent>
          {availableTargets.map(side => (
            <SelectItem key={side} value={side}>
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="default"
        className="w-full"
        onClick={handleCopyToAllLanguages}
        disabled={!target}
      >
        Copy Simulations
      </Button>
    </div>
  );
};