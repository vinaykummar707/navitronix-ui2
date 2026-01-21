import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import type { DisplayConfig } from "@/routeConfig";
import { FieldErrorsDialog } from "./FieldErrorsDialog";

export const RouteInfoForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useFormContext<DisplayConfig>();

  const splitRoute = watch('route.splitRoute')



  return (
    <div className="grid grid-cols-1 gap-4">
      {splitRoute && <><Field>
        <FieldLabel htmlFor="route.routeNumber1">Route Number 1</FieldLabel>
        <Input id="route.routeNumber1" placeholder="Alternate or split route number 1"

          {...register("route.routeNumber1", {
            setValueAs: (value) => value.toUpperCase(),
          })}
          autoComplete="off" />
        {errors?.route?.routeNumber1 && (
          <FieldError>{errors.route.routeNumber1.message}</FieldError>
        )}
      </Field>
        <Field>
          <FieldLabel htmlFor="route.routeNumber2">Route Number 2</FieldLabel>
          <Input id="route.routeNumber2" placeholder="Alternate or split route number 2"
            {...register("route.routeNumber2", {
              setValueAs: (value) => value.toUpperCase(),
            })}
            autoComplete="off" />
          {errors?.route?.routeNumber2 && (
            <FieldError>{errors.route.routeNumber2.message}</FieldError>
          )}
        </Field></>}
      {!splitRoute && <Field>
        <FieldLabel htmlFor="route.routeNumber">Route Number</FieldLabel>
        <Input id="route.routeNumber" placeholder="Enter main route number"
          {...register("route.routeNumber", { required: "Route number is required" })}
          autoComplete="off" />
        {/* Optionally: <FieldDescription>XXXXX</FieldDescription> */}
        {errors?.route?.routeNumber && (
          <FieldError>{errors.route.routeNumber.message}</FieldError>
        )}
      </Field>}
      <Field>
        <FieldLabel htmlFor="route.source">Source</FieldLabel>
        <Input id="route.source" placeholder="Start location"
          {...register("route.source", { required: "Source is required" })}
          autoComplete="off" />
        {errors?.route?.source && (
          <FieldError>{errors.route.source.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="route.destination">Destination</FieldLabel>
        <Input id="route.destination" placeholder="End location"
          {...register("route.destination", { required: "Destination is required" })}
          autoComplete="off" />
        {errors?.route?.destination && (
          <FieldError>{errors.route.destination.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="route.via">Via</FieldLabel>
        <Input id="route.via" placeholder="Intermediate stops/routes"
          {...register("route.via", { required: "Via is required" })}
          autoComplete="off" />
        {errors?.route?.via && (
          <FieldError>{errors.route.via.message}</FieldError>
        )}
      </Field>


      {/* <Field orientation="horizontal">
        <Checkbox
          id="route.splitRoute"
          checked={!!watch("route.splitRoute")}
          onCheckedChange={v => setValue("route.splitRoute", Boolean(v))}
        />
        <FieldLabel htmlFor="route.splitRoute">Split Route</FieldLabel>
      </Field> */}

      {/* <Field orientation="horizontal">
          <Checkbox
            id="route.showSpm"
            checked={!!watch("route.showSpm")}
            onCheckedChange={v => setValue("route.showSpm", Boolean(v))}
          />
          <FieldLabel htmlFor="route.showSpm">Show Spm</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="route.showBoth"
            checked={!!watch("route.showBoth")}
            onCheckedChange={v => setValue("route.showBoth", Boolean(v))}
          />
          <FieldLabel htmlFor="route.showBoth">Show Both</FieldLabel>
        </Field> */}

      
    </div>
  );
};