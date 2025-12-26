import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import { usePostApi } from "@/hooks/useApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";



const RouteCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const API_URL = "https://api.navitronix.in/navitranix/api/routes";
    const { areaId, depotId } = useParams();

    const methods = useForm<DisplayConfig>({ defaultValues: defaultValues });
    const { handleSubmit, getValues, setValue } = methods;




    // Mutation hook for creating routes
    const createRouteMutation = usePostApi(
        API_URL,
        (data) => {
            // onSuccess
            console.log("Route created successfully!", data);
            toast.success('Route Saved Successfully')
            // Optionally navigate or show a success UI
        },
        (error) => {
            // onError
            console.error("Route creation failed", error);
            toast.error("Route Failed To Save")
            // Optionally notify user
        },
    );

    // <-- Ensure form gets updated params into displayConfig -->
    useEffect(() => {
        if (areaId) setValue("areaId", areaId);     // If top-level
        if (depotId) setValue("depotId", depotId);
        // If they are inside displayConfig object:
        // if (areaId) setValue("displayConfig.areaId", areaId);
        // if (depotId) setValue("displayConfig.depotId", depotId);
    }, [areaId, depotId, setValue]);

        // Dialog state for JSON preview
        const [jsonDialogOpen, setJsonDialogOpen] = useState(false);

    // Header button handlers (fill these as needed for your app)
    const handleViewJson = () => {
        // Implement logic to view JSON modal/panel
        setJsonDialogOpen(true);
    };

    const handleDownloadJson = () => {
        const values = getValues();
        const blob = new Blob([JSON.stringify(values, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "route-config.json";
        a.click();
        URL.revokeObjectURL(url);
    };


    const onSubmit = (data: DisplayConfig) => {
        console.log("Form Data", data);
        // Do your API call or state update
        createRouteMutation.mutate(data);
    };

    return (
        <LanguageConfigProvider>
            <FormProvider {...methods}>
                <div className="w-screen h-screen flex  flex-col overflow-hidden">
                    <RouteHeader
                        title="Route Simulations"
                        onBack={() => navigate("https://navitronix.in/home/routes")}
                        onViewJson={handleViewJson}
                        onDownloadJson={handleDownloadJson}
                        onSaveRoute={handleSubmit(onSubmit)}
                    />
                    <div className="flex-1 overflow-hidden bg-dotted flex">
                        
                        <LeftPanel />
                        <SimulationPanel />
                        <RightPanel />

                       

                    </div>
                     {/* ----- JSON Preview Dialog ----- */}
                <Dialog open={jsonDialogOpen} onOpenChange={setJsonDialogOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Form JSON Preview</DialogTitle>
                    </DialogHeader>
                    <pre className="p-4 bg-muted rounded text-sm overflow-x-auto max-h-[60vh]">
                      {JSON.stringify(getValues(), null, 2)}
                    </pre>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                </div>
            </FormProvider>
        </LanguageConfigProvider>
    );
};

export default RouteCreatePage;