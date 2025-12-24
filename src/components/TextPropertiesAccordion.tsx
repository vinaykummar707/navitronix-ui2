import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TextPropertiesForm } from "@/components/TextPropertiesForm";
import { ALargeSmall, Text } from "lucide-react";



interface Item {
  label: string;
  name: string;
}

export function TextPropertiesAccordion({ items }: { items: Item[] }) {
  if (!items.length) return null;
  return (
    <Accordion type="multiple" className="w-full rounded-md border" >
      {items.map(({ label, name }) => (
        <AccordionItem className="" value={label} key={label}>
          <AccordionTrigger className="px-4">
          <span className='flex items-center gap-4'>
                <ALargeSmall className='size-4 shrink-0' />
                <span>{label} Properties</span>
              </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground flex flex-col p-2">
            <TextPropertiesForm name={name} heading={label} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}