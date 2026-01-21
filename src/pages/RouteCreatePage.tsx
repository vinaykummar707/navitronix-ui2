import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { RouteHeader } from "@/components/RouteHeader";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";
import SimulationPanel from "@/components/SimulationPanel";
import { defaultValues } from "@/defaultValues";
import type { DisplayConfig } from "@/routeConfig";
import { FormProvider, useForm } from "react-hook-form";
import { LanguageConfigProvider } from "@/context/LanguageConfigContext";
import { useGetApi, usePostApi } from "@/hooks/useApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { ConfirmBackDialog } from "@/components/ConfirmBackDialog";
import { FieldErrorsDialog } from "@/components/FieldErrorsDialog";

const API_URL = "https://api.navitronix.in/navitranix/api/routes";

const ROUTE_REQUIRED_FIELDS: Array<{ key: keyof DisplayConfig["route"], label: string }> = [
  { key: "routeNumber", label: "Route Number" },
  { key: "source", label: "Source" },
  { key: "destination", label: "Destination" },
  { key: "via", label: "Via" },
];

const RouteCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { areaId, depotId, routeId } = useParams();
  const isEdit = routeId !== undefined;

  // ========== React Hook Form ==========
  const methods = useForm<DisplayConfig>({ defaultValues });
  const { handleSubmit, getValues, setValue, reset, formState: { errors } } = methods;

  // ========== Fetch/Edit State ==========
  const { data: editRouteData, isLoading, isError } = useGetApi<DisplayConfig>(
    `/routes/${routeId}`,
    {},
    isEdit
  );

  // ========== Mutations ==========
  const createRouteMutation = usePostApi(
    API_URL,
    () => {
      toast(isEdit ? 'Route Updated Successfully' : 'Route Saved Successfully');
      // You may want to call navigate away on success here
    },
    () => {
      toast(isEdit ? 'Route Update Failed' : 'Route Save Failed');
    }
  );
  const isSubmitting = Boolean(createRouteMutation?.isLoading);

  // ========== Dialog States ==========
  const [jsonDialogOpen, setJsonDialogOpen] = useState(false);
  const [backDialogOpen, setBackDialogOpen] = useState(false);
  const [fieldErrorsOpen, setFieldErrorsOpen] = useState(false);
  const [fieldErrorMessages, setFieldErrorMessages] = useState<string[]>([]);

  // ========== Form/Field Effect ==========
  useEffect(() => {
    if (areaId) setValue("areaId", areaId);
    if (depotId) setValue("depotId", depotId);
  }, [areaId, depotId, setValue]);

  useEffect(() => {
    if (editRouteData) reset(editRouteData);
  }, [editRouteData, reset]);

  // ========== Helpers ==========
  const collectRouteFieldErrors = useCallback((): string[] => {
    const routeErrors = errors.route || {};
    return ROUTE_REQUIRED_FIELDS
      .map(({ key, label }) => {
        const errObj =
          typeof routeErrors === "object" && routeErrors[key]
            ? (routeErrors as any)[key]
            : undefined;
        return errObj?.message || undefined;
      })
      .filter(Boolean) as string[];
  }, [errors.route]);

  // ========== Dialog Handlers ==========
  const handleJsonDialogOpenChange = useCallback(setJsonDialogOpen, []);
  const handleBack = useCallback(() => setBackDialogOpen(true), []);
  const handleCancelBackDialog = useCallback(() => setBackDialogOpen(false), []);
  const handleGoBackWithoutSaving = useCallback(() => {
    setBackDialogOpen(false);
    navigate("https://navitronix.in/home/routes");
  }, [navigate]);
  const handleViewJson = useCallback(() => setJsonDialogOpen(true), []);
  const handleDownloadJson = useCallback(() => {
    const values = getValues();
    const blob = new Blob([JSON.stringify(values, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "route-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [getValues]);

  // ========== Submit Handlers ==========
  // "Core form save": called for Save/Update and SaveAndGoBack
  const onSubmit = useCallback(async (data: DisplayConfig) => {
    await createRouteMutation.mutateAsync(data);
  }, [createRouteMutation]);

  // Used in Save and Go Back (from dialog)
  const handleSaveAndGoBack = useCallback(async () => {
    const errorsArr = collectRouteFieldErrors();
    if (errorsArr.length > 0) {
      setFieldErrorMessages(errorsArr);
      setFieldErrorsOpen(true);
      // keep the back dialog open to let user retry/cancel
      return;
    }
    await handleSubmit(async (data) => {
      await onSubmit(data);
      setBackDialogOpen(false);
      navigate("https://navitronix.in/home/routes");
    })();
  }, [collectRouteFieldErrors, handleSubmit, navigate, onSubmit]);

  // Used in Header Save (calls main submit, triggers error dialog if issue)
  const handleSafeSubmit = useCallback(() => {
    const errorsArr = collectRouteFieldErrors();
    if (errorsArr.length > 0) {
      setFieldErrorMessages(errorsArr);
      setFieldErrorsOpen(true);
      return;
    }
    handleSubmit(onSubmit)();
  }, [collectRouteFieldErrors, handleSubmit, onSubmit]);

  // ========== Render ==========

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const headerActionButton = (
    <Button
      type="submit"
      size="sm"
      variant="default"
      onClick={handleSafeSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <Loader2 className=" h-4 w-4 animate-spin" />
      ) : (
        <Save className=" h-4 w-4" />
      )}
      {isSubmitting ? (isEdit ? "Updating..." : "Saving...") : (isEdit ? "Update Route" : "Save Route")}
    </Button>
  );

  return (
    <LanguageConfigProvider>
      <FormProvider {...methods}>
        <div className="w-screen h-screen flex flex-col overflow-hidden">
          <RouteHeader
            title="Route Simulations"
            onBack={handleBack}
            onViewJson={handleViewJson}
            onDownloadJson={handleDownloadJson}
            onSaveRoute={handleSafeSubmit}
            actionButton={headerActionButton}
          />
          <div className="flex-1 overflow-hidden bg-dotted flex">
            <LeftPanel />
            <SimulationPanel />
            <RightPanel />
          </div>
          {/* JSON Preview Dialog */}
          <Dialog open={jsonDialogOpen} onOpenChange={handleJsonDialogOpenChange}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Form JSON Preview</DialogTitle>
              </DialogHeader>
              <pre className="p-4 rounded scrollbar-minimal text-sm overflow-x-auto max-h-[60vh]">
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
        {/* Confirm Back */}
        <ConfirmBackDialog
          open={backDialogOpen}
          onSaveAndGoBack={handleSaveAndGoBack}
          onGoBackWithoutSaving={handleGoBackWithoutSaving}
          onCancel={handleCancelBackDialog}
          isSaving={isSubmitting}
        />
        {/* Field Errors */}
        <FieldErrorsDialog
          open={fieldErrorsOpen}
          onClose={() => setFieldErrorsOpen(false)}
          errorMessages={fieldErrorMessages}
        />
      </FormProvider>
    </LanguageConfigProvider>
  );
};

export default RouteCreatePage;