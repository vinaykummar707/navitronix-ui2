import type { ReactNode } from "react";
import { LanguagesSelector } from "./LanguagesSelector";
import { RouteInfoForm } from "./RouteInfoForm";
import { Separator } from "./ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Languages, Route } from "lucide-react";

export function LeftPanel() {
    return <section className="w-[280px] shrink-0 flex flex-col gap-4 scrollbar-minimal   overflow-auto bg-sidebar border-r">

        <Accordion

            type="multiple"
            className="w-full border-b"
        >

            <AccordionItem className="" value={'Route Information'} >
                <AccordionTrigger className="px-4 flex items-center py-3 text">
                    {/* <span className='flex items-center gap-4'>
                        <Route className='size-4 shrink-0' />
                        <span>Route Information</span>
                    </span> */}
                    <span className='flex items-center gap-4'>
                        <span
                            className='flex size-8 shrink-0 items-center bg-pink-900 justify-center rounded-full border'
                            aria-hidden='true'
                        >
                            <Route className='size-4' />
                        </span>
                        <span className='flex flex-col '>
                            <span>Route Information</span>
                        </span>
                    </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4">
                    <RouteInfoForm />

                </AccordionContent>
            </AccordionItem>

            <AccordionItem className="" value={'Language Selection'} >
                <AccordionTrigger className="px-4 py-3 items-center text">
                <span className='flex items-center gap-4'>
                        <span
                            className='flex size-8 shrink-0 items-center bg-pink-900 justify-center rounded-full border'
                            aria-hidden='true'
                        >
                            <Languages className='size-4' />
                        </span>
                        <span className='flex flex-col space-y-0.5'>
                            <span>Languages Selection</span>
                        </span>
                    </span>
                </AccordionTrigger>
                <AccordionContent className=" text-muted-foreground px-4">
                    <LanguagesSelector />


                </AccordionContent>
            </AccordionItem>

        </Accordion>

    </section>;
}