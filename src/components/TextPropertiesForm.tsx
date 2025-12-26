import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import type { DisplayConfig, TextConfig, ScrollType, Position, FontWeight } from "@/routeConfig";

import { ScrollTypes, Positions, FontWeights, SCROLL_SPEED_PRESETS } from "@/routeConfig";
import { IMEInput } from "./IMEInput";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ArrowRight, ChevronsLeft, ChevronsLeftRight, ChevronsRight } from "lucide-react";
import AutoTextGenerator from "./AutoTextGenerator";

type Props = {
  name: string; // i.e. 'displayConfig.en.front.texts.text'
  heading?: string;
};

export const TextPropertiesForm: React.FC<Props> = ({ name, heading }) => {
  const { register, control, formState: { errors }, setValue, watch } = useFormContext<DisplayConfig>();
  // get value for select inputs
  const prefix = name ? name + "." : "";

  const langCode = name.split(".")[1];
  const route = useWatch({ control, name: "route" }) ?? {};

  // Generate example text combos
  const autoTextCombinations = [
    [route.routeNumber, route.source, route.destination, route.via].filter(Boolean).join(" - "),
    [route.source, route.destination].filter(Boolean).join(" - "),
    [route.routeNumber, route.source].filter(Boolean).join(" - "),
    [route.routeNumber, route.destination].filter(Boolean).join(" - "),
    [route.source, route.via, route.destination].filter(Boolean).join(" - "),
    [route.routeNumber, route.source, route.destination].filter(Boolean).join(" - "),
    [route.destination, route.source].filter(Boolean).join(" - "),
  ]
    .filter(
      (str, idx, arr) =>
        !!str && str.replace(/-/g, "").trim() !== "" &&   // No empty strings
        arr.indexOf(str) === idx                          // Remove duplicates
    );

  // For deep errors
  function getError(field: string) {
    return field.split('.').reduce((o, k) => o?.[k], errors as any)?.message;
  }

  // You could show a heading if wanted
  return (
    <FieldGroup className=" px-2 pb-4 ">
      <div className="grid grid-cols-1 gap-4">
        <Field className="">
          <FieldLabel htmlFor={prefix + "text"}>Text</FieldLabel>
          {/* Use IMEInput for transliteration */}
          <div className="grid grid-cols-1 gap-2">
            <IMEInput
              id={prefix + "text"}
              langCode={langCode}
              value={watch(prefix + "text")}
              onChange={(val) => setValue(prefix + "text", val, { shouldDirty: true, shouldValidate: true })}
              placeholder="Type in English..."
            />
            <AutoTextGenerator
              route={route}
              targetLang={langCode}
              onSelect={val => setValue(prefix + "text", val, { shouldDirty: true, shouldValidate: true })}
            />
          </div>
          <FieldError>{getError(prefix + "text")}</FieldError>
        </Field>





        <Field>
          <FieldLabel htmlFor={prefix + "fontHeight"}>Font Height</FieldLabel>
          <Input type="number" id={prefix + "fontHeight"} {...register(prefix + "fontHeight", { valueAsNumber: true })} />
          <FieldError>{getError(prefix + "fontHeight")}</FieldError>
        </Field>



        <Field>
          <FieldLabel htmlFor={prefix + "scrollSpeed"}>Scroll Speed</FieldLabel>
          <Select
            value={
              String(watch(prefix + "scrollSpeed") ?? "")
            }
            onValueChange={val => setValue(prefix + "scrollSpeed", Number(val), { shouldDirty: true, shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select scroll speed" />
            </SelectTrigger>
            <SelectContent>
              {SCROLL_SPEED_PRESETS.map(preset => (
                <SelectItem key={preset.value} value={String(preset.value)}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{getError(prefix + "scrollSpeed")}</FieldError>
        </Field>


        <Field>
          <FieldLabel htmlFor={prefix + "fontWeight"}>Font Weight</FieldLabel>
          <Select
            value={watch(prefix + "fontWeight")}
            onValueChange={v => setValue(prefix + "fontWeight", v as FontWeight)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font weight" />
            </SelectTrigger>
            <SelectContent>
              {FontWeights.map((fw) => (
                <SelectItem key={fw} value={fw}>{fw}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{getError(prefix + "fontWeight")}</FieldError>
        </Field>



        <Field>
          <FieldLabel htmlFor={prefix + "scrollType"}>Scroll Type</FieldLabel>
          <Select
            value={watch(prefix + "scrollType")}
            onValueChange={v => setValue(prefix + "scrollType", v as ScrollType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select scroll type" />
            </SelectTrigger>
            <SelectContent>
              {ScrollTypes.map((st) => (
                <SelectItem key={st} value={st}>{st}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{getError(prefix + "scrollType")}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor={prefix + "position"}>Position</FieldLabel>
          <Select
            value={watch(prefix + "position")}
            onValueChange={v => setValue(prefix + "position", v as Position)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {Positions.map((pos) => (
                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{getError(prefix + "position")}</FieldError>
        </Field>
      </div>
    </FieldGroup>
  );
};