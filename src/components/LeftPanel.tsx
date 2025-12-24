import type { ReactNode } from "react";
import { LanguagesSelector } from "./LanguagesSelector";
import { RouteInfoForm } from "./RouteInfoForm";
import { Separator } from "./ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function LeftPanel() {
    return <section className="w-[320px] shrink-0 p-4 flex flex-col gap-4 scrollbar-minimal   overflow-auto bg-sidebar border-r">

        <p className="text-sm">PID Testing</p>
        <Accordion
            type="multiple"
            className="w-full rounded-md border"
        >

            <AccordionItem className="bg-accent/40" value={'Route Information'} >
                <AccordionTrigger className="px-5  text">Route Information</AccordionTrigger>
                <AccordionContent className="text-muted-foreground  px-5">
                    <RouteInfoForm />

                </AccordionContent>
            </AccordionItem>

            <AccordionItem className="bg-accent/40" value={'Language Selection'} >
                <AccordionTrigger className="px-5  text">Language Selection</AccordionTrigger>
                <AccordionContent className="text-muted-foreground  px-5">
                <LanguagesSelector />


                </AccordionContent>
            </AccordionItem>

        </Accordion>

    </section>;
}