import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TextPropertiesForm } from "@/components/TextPropertiesForm";

interface Item {
  label: string;
  name: string;
}

export function TextPropertiesAccordion({ items }: { items: Item[] }) {
  if (!items.length) return null;
  return (
    <Accordion type="single" collapsible className="w-full rounded-md border" defaultValue="Basic">
      {items.map(({ label, name }) => (
        <AccordionItem className="bg-accent/70" value={label} key={label}>
          <AccordionTrigger className="px-4">{label}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground flex flex-col p-2">
            <TextPropertiesForm name={name} heading={label} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}