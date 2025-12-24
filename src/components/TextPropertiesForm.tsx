import React from "react";
import { useFormContext } from "react-hook-form";
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

import { ScrollTypes, Positions, FontWeights } from "@/routeConfig";
import { IMEInput } from "./IMEInput";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ArrowRight, ChevronsLeft, ChevronsLeftRight, ChevronsRight } from "lucide-react";

type Props = {
  name: string; // i.e. 'displayConfig.en.front.texts.text'
  heading?: string;
};

export const TextPropertiesForm: React.FC<Props> = ({ name, heading }) => {
  const { register, control, formState: { errors }, setValue, watch } = useFormContext<DisplayConfig>();
  // get value for select inputs
  const prefix = name ? name + "." : "";

  const langCode = name.split(".")[1];

  // For deep errors
  function getError(field: string) {
    return field.split('.').reduce((o, k) => o?.[k], errors as any)?.message;
  }

  // You could show a heading if wanted
  return (
    <FieldGroup  className=" px-2 pb-4 ">
      <div className="grid grid-cols-1 gap-2">
      <Field className="">
        <FieldLabel htmlFor={prefix + "text"}>Text</FieldLabel>
        {/* Use IMEInput for transliteration */}
        <IMEInput
            id={prefix + "text"}
            langCode={langCode}
            value={watch(prefix + "text")}
            onChange={(val) => setValue(prefix + "text", val, { shouldDirty: true, shouldValidate: true })}
            placeholder="Type in English..."
          />
        <FieldError>{getError(prefix + "text")}</FieldError>
      </Field>

    

      

      <Field>
        <FieldLabel htmlFor={prefix + "fontHeight"}>Font Height</FieldLabel>
        <Input type="number" id={prefix + "fontHeight"} {...register(prefix + "fontHeight", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "fontHeight")}</FieldError>
      </Field>

    


      <Field>
        <FieldLabel htmlFor={prefix + "scrollSpeed"}>Scroll Speed</FieldLabel>
        <Input type="number" id={prefix + "scrollSpeed"} {...register(prefix + "scrollSpeed", { valueAsNumber: true })} />
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