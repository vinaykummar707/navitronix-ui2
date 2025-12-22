import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // if you use classnames utility
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import TabsSoftPillsDemo from "@/components/SoftTabs";
import TestingForm from "@/components/TestingForm";
import useTestingFormStore from "@/stores/useTestingFormStore";
import useTabsStore from "@/stores/useTabsStore";
import { Calendar, CheckCircle, ChevronLeft, Clock, Cloud, Code, Cpu, Download, Hash, RefreshCw, Save, Thermometer, Type, Upload, Zap } from "lucide-react";
import { boardInfoConfigs, buttonConfigs, cpuInfoConfigs, firmwareInfoConfigs, operationInfoConfigs, tempInfoConfigs, voltageInfoConfigs } from "@/buttonConfig";
import { OperationButton } from "@/components/OperationButton";
import PidCodeTestingPanel from "@/components/PidCodesTestingPanel";
import DataTestingPanel from "@/components/DataTestingPanel";
import { useNavigate } from "react-router";


const TestingPlayground: React.FC = () => {

    const navigate = useNavigate(); // <-- useNavigate hook


    const { input, radio } = useTestingFormStore();
    const { selectedTab } = useTabsStore();

    useEffect(() => {
        console.log(input, radio, selectedTab)
    })



    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            {/* Topbar */}
            <header className="flex items-center shrink-0 justify-between h-14 px-4 bg-background  border-border border-b">

                <div className="w-[40rem] flex items-center justify-start">
                    <Button size={'sm'} variant={'outline'} onClick={() => navigate("/home")} ><ChevronLeft /> Back</Button>
                </div>
                <div className="font-semibold flex-1 text-sm flex items-center justify-center">Testing Playground</div>
                <div className="w-[40rem] flex items-center gap-2 justify-end">
                    <Button size={'sm'} variant={'outline'}><Download /> Download Logs</Button>
                    <Button size={'sm'} variant={''}><Save /> Save Logs </Button>
                </div>

            </header>




            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel */}


                {/* pis testing section */}
                <section className="flex flex-col flex-1 ">
                    {/* Board Operations Accordions */}

                    <header className=" bg-background px-4 shrink-0 border-border border-b border-r">
                        <TabsSoftPillsDemo />
                    </header>

                    <header className="flex items-center shrink-0 py-4 justify-between h-18   px-4 bg-background  border-border border-b border-r">
                        <TestingForm />
                    </header>





                    <section className="flex-1 flex">
                        <DataTestingPanel />
                        <PidCodeTestingPanel />
                    </section>

                </section>




                <section className="w-[35rem] bg-dotted p-4 overflow-auto  ">

                    <h1>Hello</h1>
                </section>



            </div>
        </div>
    );
};

export default TestingPlayground;