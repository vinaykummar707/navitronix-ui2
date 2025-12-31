import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import type { DisplayConfig } from "@/routeConfig";
import { AVAILABLE_LANGUAGES } from "@/defaultValues";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BOARD_SIDES = ["front", "rear", "side", "internal"] as const;
type BoardSide = typeof BOARD_SIDES[number];

type Props = {
  lang?: string;
  current: BoardSide;
};

export const CopyBoardPropertiesAllButton: React.FC<Props> = ({ lang, current }) => {
  const { getValues, setValue } = useFormContext<DisplayConfig>();
  const [selectedBoards, setSelectedBoards] = useState<BoardSide[]>([]);
  const [open, setOpen] = useState(false);

  const handleCopyToAllLanguages = () => {
    if (selectedBoards.length === 0) return;
    const displayConfig = getValues(`displayConfig`);
    if (!displayConfig) return;

    AVAILABLE_LANGUAGES.forEach(l => {
      const langBoards = displayConfig[l.code];
      if (langBoards && langBoards[current]) {
        const fromData = langBoards[current];
        
        selectedBoards.forEach(target => {
          if (langBoards[target]) {
            setValue(
              `displayConfig.${l.code}.${target}`,
              JSON.parse(JSON.stringify(fromData)),
              { shouldDirty: true }
            );
          }
        });
      }
    });

    toast.success("Simulations copied!", {
      description: `Simulation properties copied to ${selectedBoards.length} board(s) across all languages.`,
    });
  };

  const toggleBoard = (board: BoardSide) => {
    setSelectedBoards(prev =>
      prev.includes(board)
        ? prev.filter(b => b !== board)
        : [...prev, board]
    );
  };

  const removeBoard = (board: BoardSide) => {
    setSelectedBoards(prev => prev.filter(b => b !== board));
  };

  const availableTargets = BOARD_SIDES.filter(side => side !== current);

  return (
    <div className="flex flex-col gap-4 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10"
          >
            <div className="flex gap-1 flex-wrap flex-1">
              {selectedBoards.length > 0 ? (
                selectedBoards.map(board => (
                  <Badge
                    key={board}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {board.charAt(0).toUpperCase() + board.slice(1)}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBoard(board);
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">Select boards...</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search boards..." />
            <CommandList>
              <CommandEmpty>No board found.</CommandEmpty>
              <CommandGroup>
                {availableTargets.map(board => {
                  const isSelected = selectedBoards.includes(board);
                  return (
                    <CommandItem
                      key={board}
                      value={board}
                      onSelect={() => toggleBoard(board)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {board.charAt(0).toUpperCase() + board.slice(1)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="default"
        className="w-full"
        onClick={handleCopyToAllLanguages}
        disabled={selectedBoards.length === 0}
      >
        Copy Simulations to {selectedBoards.length} Board(s)
      </Button>
    </div>
  );
};
