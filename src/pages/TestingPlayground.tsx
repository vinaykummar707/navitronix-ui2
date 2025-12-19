import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // if you use classnames utility
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import TabsSoftPillsDemo from "@/components/SoftTabs";

const TestingPlayground: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            {/* Topbar */}
            <header className="flex items-center justify-between h-16 px-6 bg-sidebar text-primary-foreground border-border border-b">
                <div className="font-semibold text-lg">Testing Playground</div>
                <Button variant="secondary" size="sm">
                    Action
                </Button>
            </header>



           
            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel */}

                {/* pis testing section */}
                <section className="w-[16rem] bg-sidebar overflow-auto border-r border-border">
                    {/* Board Operations Accordions */}
                    <section className="w-full flex flex-col gap-2">
                        {/* Basic Operations */}
                        <div className="flex-1 min-w-[16rem]">
                            <Accordion className="" type="single" collapsible>
                                <AccordionItem  value="basic">
                                    <AccordionTrigger className="px-4" >Basic</AccordionTrigger>
                                    <AccordionContent className="px-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button variant="outline"><span role="img" aria-label="data">🗃️</span> Data</Button>
                                            <Button variant="outline"><span role="img" aria-label="link">🔗</span> Link</Button>
                                            <Button variant="outline"><span role="img" aria-label="reset">🔄</span> Reset</Button>
                                            <Button variant="outline"><span role="img" aria-label="test">✏️</span> Test</Button>
                                            <Button variant="outline"><span role="img" aria-label="led-open">💡</span> Led Open</Button>
                                            <Button variant="outline"><span role="img" aria-label="led-close">💡</span> Led Close</Button>
                                            <Button variant="outline" className="col-span-2"><span role="img" aria-label="delete">🗑️</span> Delete</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* DTC Codes */}
                        <div className="flex-1 min-w-[12rem]">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="dtc-codes">
                                    <AccordionTrigger>DTC Codes</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-2">
                                            <Button variant="outline" className="justify-start"><span role="img" aria-label="hv">🔼</span> High Voltage</Button>
                                            <Button variant="outline" className="justify-start"><span role="img" aria-label="lv">🔽</span> Low Voltage</Button>
                                            <Button variant="outline" className="justify-start"><span role="img" aria-label="heat">✨</span> Over Heat</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* DTC Count Codes */}
                        <div className="flex-1 min-w-[16rem]">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="dtc-count">
                                    <AccordionTrigger>DTC Count Codes</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="mb-2">
                                            <label className="block text-sm">Write Value</label>
                                            <Input placeholder="Input value here" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button variant="ghost" className="justify-start"><span role="img" aria-label="hv">🔼</span> High Voltage</Button>
                                            <Button variant="ghost" className="justify-start"><span role="img" aria-label="lv">🔽</span> Low Voltage</Button>
                                            <Button variant="ghost" className="justify-start"><span role="img" aria-label="heat">✨</span> Over Heat</Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        {/* Intensity */}
                        <div className="flex-1 min-w-[16rem]">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="intensity">
                                    <AccordionTrigger>Intensity</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="mb-2">
                                            <label className="block text-sm">Mode</label>
                                            <div className="flex flex-col gap-2">
                                                <label className="flex items-center gap-2">
                                                    <input type="radio" name="intensityMode" value="auto" /> Auto
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="radio" name="intensityMode" value="manual" /> Manual
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-sm">Write Value</label>
                                            <Input placeholder="Input value here" />
                                        </div>
                                        <Button variant="ghost" className="justify-start w-full"><span role="img" aria-label="intensity">✨</span> Intensity</Button>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>
                </section>


                <section className="flex-1 bg-dotted p-4 overflow-auto  ">
                   <TabsSoftPillsDemo/>
                </section>



                {/* Right Panel */}
                <section className="w-[20rem] bg-sidebar p-4 border-border border-l overflow-auto">
                    <div className="text-muted-foreground font-medium mb-2">Right Panel</div>
                    {/* Right content goes here */}
                </section>
            </div>
        </div>
    );
};

export default TestingPlayground;