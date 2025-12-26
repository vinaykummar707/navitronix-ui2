import type { ReactNode } from "react";
import { LanguagesSelector } from "./LanguagesSelector";
import { RouteInfoForm } from "./RouteInfoForm";
import { Separator } from "./ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Languages, Route } from "lucide-react";

export function LeftPanel() {
    return <section className="w-[300px] shrink-0 p-4 flex flex-col gap-4 scrollbar-minimal   overflow-auto bg-sidebar border-r">

        <p className="text-sm">PID Testing</p>
        <Accordion
            
            type="multiple"
            className="w-full rounded-md border"
        >

            <AccordionItem className="bg-accent/40" value={'Route Information'} >
                <AccordionTrigger className="px-4  text">
                    <span className='flex items-center gap-4'>
                        <Route className='size-4 shrink-0' />
                        <span>Route Information</span>
                    </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground  px-4">
                    <RouteInfoForm />

                </AccordionContent>
            </AccordionItem>

            <AccordionItem className="bg-accent/40" value={'Language Selection'} >
                <AccordionTrigger className="px-4  text">
                <span className='flex items-center gap-4'>
                        <Languages className='size-4 shrink-0' />
                        <span>Languages Selection</span>
                    </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground  px-4">
                    <LanguagesSelector />


                </AccordionContent>
            </AccordionItem>

        </Accordion>

    </section>;
}