"use client";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTestingFormStore from "@/stores/useTestingFormStore";
import { Button } from "./ui/button";

export default function TestingForm() {
    const formSchema = z.object({ input: z.string(), radio: z.string() });

    // Pull initial state and actions from the store
    const { input: inputInit, radio: radioInit, setForm: setStoreForm, reset: resetStore } = useTestingFormStore();
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: inputInit,   // <-- initialize from store
            radio: radioInit,   // <-- initialize from store
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    function onReset() {

        form.reset();
        form.clearErrors();
    }

    // Sync form changes back to the store
    const watchInput = form.watch("input");
    const watchRadio = form.watch("radio");

    useEffect(() => {
        setStoreForm({ input: watchInput });
    }, [watchInput, setStoreForm]);

    useEffect(() => {
        setStoreForm({ radio: watchRadio });
    }, [watchRadio, setStoreForm]);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="w-full"
        >
            <div className="flex w-full gap-2 items-center  ">
                <Controller
                    control={form.control}
                    name="input"
                    disabled = {watchRadio === 'read'}

                    render={({ field, fieldState }) => (
                        <Field
                            className="shadow-none bg-background flex-1"
                            data-invalid={fieldState.invalid}
                        >

                            {/* <FieldLabel className="flex @5xl:hidden w-auto!">
                Value
              </FieldLabel> */}

                            <Input
                                key="text-input-0"
                                placeholder={watchRadio === 'read' ? "Disabled Input" : "Type your desired value"}
                                type="text"
                                className="shadow-none "
                                {...field}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="radio"
                    render={({ field, fieldState }) => (
                        <Field
                            className="w-auto"
                            data-invalid={fieldState.invalid}
                        >
                            <FieldLabel className="hidden w-auto!">Radio Group</FieldLabel>

                            <RadioGroup
                                key="radio-0"
                                id="radio"
                                className="flex gap-1  h-9"
                                value={field.value}
                                name={field.name}
                                onValueChange={field.onChange}
                            >
                                <FieldLabel
                                    key="read"
                                    className="flex items-center  rounded-md border p-4  space-x-2"
                                    htmlFor="radio-read"
                                >
                                    <RadioGroupItem value="read" id="radio-read" />
                                    <div className="grid gap-2 leading-none">
                                        <FieldLabel htmlFor="radio-read" className="font-normal ">
                                            Read
                                        </FieldLabel>
                                    </div>
                                </FieldLabel>

                                <FieldLabel
                                    key="write"
                                    className="flex items-center rounded-md border p-4  space-x-2"
                                    htmlFor="radio-write"
                                >
                                    <RadioGroupItem value="write" id="radio-write" />
                                    <div className="grid gap-2 leading-none">
                                        <FieldLabel htmlFor="radio-write" className="font-normal ">
                                            Write
                                        </FieldLabel>
                                    </div>
                                </FieldLabel>
                            </RadioGroup>

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Button  onClick={onReset} variant={'destructive'}>Reset</Button>
            </div>
        </form>
    );
}
