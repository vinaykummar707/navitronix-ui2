import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePostApi } from "@/hooks/useApi";


const formSchema = z.object({
    serial_number: z.coerce.string(),
    command: z.string(),
    height: z.coerce.number(),
    width: z.coerce.number(),
    address: z.string(),
    board_type: z.string(),
  });


export type IPcbCreationForm = z.infer<typeof formSchema>;



export default function PcbCreationForm() {
  

  const form = useForm<IPcbCreationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial_number: "",
      command: "",
      height: 0,
      width: 0,
      address: "",
      board_type: "",
    },
  });


  
  // Create the mutation hook
  const { mutate, isLoading, isSuccess, isError, error } = usePostApi<IPcbCreationForm, IPcbCreationForm>(
    "/deviceControl",
    (data) => {
      // Optionally handle success, show toast/snackbar etc.
      console.log("Device Control Success:", data);
    },
    (err) => {
      // Optionally handle error, show toast/snackbar etc.
      console.error("Device Control Error:", err);
    }
  );
  
  const onSubmit = (data: IPcbCreationForm) => {
    mutate(data);
  };

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-8  @container"
    >
      <div className="grid grid-cols-12 gap-4">
        <Controller
          control={form.control}
          name="serial_number"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Serial Number</FieldLabel>

              <Input
                key="number-input-2"
                placeholder="Enter Serial Number"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="command"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Command</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="Enter Board Command"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="height"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Height</FieldLabel>

              <Input
                key="number-input-3"
                placeholder="Type Height"
                type="number"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="width"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Width</FieldLabel>

              <Input
                key="number-input-1"
                placeholder="Type Width"
                type="number"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Address</FieldLabel>

              <Select
                key="select-0"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select Address" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="41" value="41">
                    41
                  </SelectItem>

                  <SelectItem key="42" value="42">
                    42
                  </SelectItem>

                  <SelectItem key="43" value="43">
                    43
                  </SelectItem>

                  <SelectItem key="44" value="44">
                    44
                  </SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="board_type"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Side</FieldLabel>

              <Select
                key="select-1"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select Side" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="F" value="F">
                    Front
                  </SelectItem>

                  <SelectItem key="R" value="R">
                    Rear
                  </SelectItem>

                  <SelectItem key="S" value="S">
                    Side
                  </SelectItem>

                  <SelectItem key="I" value="I">
                    Internal
                  </SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

      </div>
     <Button type="submit" className="w-full" variant="default">Save</Button>

    </form>
  );
}
