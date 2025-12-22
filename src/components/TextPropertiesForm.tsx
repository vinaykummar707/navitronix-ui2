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

type Props = {
  name: string; // i.e. 'displayConfig.en.front.texts.text'
  heading?: string;
};

export const TextPropertiesForm: React.FC<Props> = ({ name, heading }) => {
  const { register, control, formState: { errors }, setValue, watch } = useFormContext<DisplayConfig>();
  // get value for select inputs
  const prefix = name ? name + "." : "";

  // For deep errors
  function getError(field: string) {
    return field.split('.').reduce((o, k) => o?.[k], errors as any)?.message;
  }

  // You could show a heading if wanted
  return (
    <FieldGroup  className="bg-accent p-4   rounded-xl">
      {heading && <FieldLabel className="font-bold mb-2">{heading}</FieldLabel>}
      <div className="grid grid-cols-2 gap-1">
      <Field className="">
        <FieldLabel htmlFor={prefix + "text"}>Text</FieldLabel>
        <Input id={prefix + "text"} {...register(prefix + "text")} />
        <FieldError>{getError(prefix + "text")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "bitmap"}>Bitmap</FieldLabel>
        <Input id={prefix + "bitmap"} {...register(prefix + "bitmap")} />
        <FieldError>{getError(prefix + "bitmap")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "fontWidth"}>Font Width</FieldLabel>
        <Input type="number" id={prefix + "fontWidth"} {...register(prefix + "fontWidth", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "fontWidth")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "fontHeight"}>Font Height</FieldLabel>
        <Input type="number" id={prefix + "fontHeight"} {...register(prefix + "fontHeight", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "fontHeight")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "fontSize"}>Font Size</FieldLabel>
        <Input type="number" id={prefix + "fontSize"} {...register(prefix + "fontSize", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "fontSize")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "spacing"}>Spacing</FieldLabel>
        <Input type="number" id={prefix + "spacing"} {...register(prefix + "spacing", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "spacing")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "scrollSpeed"}>Scroll Speed</FieldLabel>
        <Input type="number" id={prefix + "scrollSpeed"} {...register(prefix + "scrollSpeed", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "scrollSpeed")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "x_offset"}>X Offset</FieldLabel>
        <Input type="number" id={prefix + "x_offset"} {...register(prefix + "x_offset", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "x_offset")}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor={prefix + "y_offset"}>Y Offset</FieldLabel>
        <Input type="number" id={prefix + "y_offset"} {...register(prefix + "y_offset", { valueAsNumber: true })} />
        <FieldError>{getError(prefix + "y_offset")}</FieldError>
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