import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { RouteHeader } from "@/components/RouteHeader";
import useTestingFormStore from "@/stores/useTestingFormStore";
import useTabsStore from "@/stores/useTabsStore";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";
import type { RouteInformation, DisplayConfig, FontWeight, Position, ScreenFormat, ScrollType } from "@/routeConfig";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues } from "@/defaultValues";
import { RouteInfoForm } from "@/components/RouteInfoForm";
import { LanguagesSelector } from "@/components/LanguagesSelector";
import { Separator } from "@/components/ui/separator";
import SimulationPanel from "@/components/SimulationPanel";
import { LanguageConfigProvider } from "@/context/LanguageConfigContext";




const RouteCreatePage: React.FC = () => {
    const navigate = useNavigate();



    const methods = useForm<DisplayConfig>({ defaultValues: defaultValues });

    const { handleSubmit } = methods;


    const onSubmit = (data: DisplayConfig) => {
        console.log("Form Data", data);
        // Do your API call or state update
    };

    const { selectedTab } = useTabsStore();


    // Header button handlers (fill these as needed for your app)
    const handleViewJson = () => {
        // Implement logic to view JSON modal/panel
    };
    const handleDownloadJson = () => {
        // Implement logic to download JSON
    };
    const handleSaveRoute = () => {
        // Implement logic to save route
    };

    return (

        // <FormProvider {...methods}>
        //     <form onSubmit={handleSubmit(onSubmit)} className="h-screen flex flex-col overflow-hidden">
        //         {/* Topbar */}
        //         <RouteHeader
        //             title="Testing Playground"
        //             onBack={() => navigate("/home")}
        //             onViewJson={handleViewJson}
        //             onDownloadJson={handleDownloadJson}
        //             onSaveRoute={handleSubmit(onSubmit)}
        //         />

        //         {/* App Body: Each panel gets its own scrolling */}
        //         <div className="flex flex-1 min-h-0">
        //             <section className="flex-1 flex">
        //                 <LeftPanel />
        //                 <SimulationPanel />
        //                 <RightPanel />
        //             </section>
        //         </div>
        //     </form>
        // </FormProvider>
        <LanguageConfigProvider>

       
         <FormProvider {...methods}>
        <div className="w-screen h-screen flex  flex-col overflow-hidden">
            <RouteHeader
                title="Testing Playground"
                onBack={() => navigate("/home")}
                onViewJson={handleViewJson}
                onDownloadJson={handleDownloadJson}
                onSaveRoute={handleSubmit(onSubmit)}
            />
            <form className="flex-1 overflow-hidden bg-dotted flex">

                <LeftPanel/>
                <SimulationPanel/>
                <RightPanel/>
                
            </form>
        </div>
        </FormProvider>
        </LanguageConfigProvider>
    );
};

export default RouteCreatePage;