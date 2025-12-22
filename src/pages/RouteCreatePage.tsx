import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { RouteHeader } from "@/components/RouteHeader";
import useTestingFormStore from "@/stores/useTestingFormStore";
import useTabsStore from "@/stores/useTabsStore";
import { LeftPanel } from "@/components/LeftPanel";
import { SimulationPanel } from "@/components/SimulationPanel";
import { RightPanel } from "@/components/RightPanel";
// other imports remain unchanged...

// ... existing code ...

const RouteCreatePage: React.FC = () => {
    const navigate = useNavigate();

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
        <div className="flex flex-col h-screen text-foreground">
            {/* Topbar */}
            <RouteHeader
                title="Testing Playground"
                onBack={() => navigate("/home")}
                onViewJson={handleViewJson}
                onDownloadJson={handleDownloadJson}
                onSaveRoute={handleSaveRoute}
            />

            <div className="flex flex-1 overflow-hidden">
                <section className="flex-1 bg-dotted flex">
                    <LeftPanel />
                    <SimulationPanel />
                    <RightPanel />
                </section>
            </div>
        </div>
    );
};

export default RouteCreatePage;