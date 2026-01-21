import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ConfirmBackDialogProps {
  open: boolean;
  onSaveAndGoBack: () => void;
  onGoBackWithoutSaving: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const ConfirmBackDialog: React.FC<ConfirmBackDialogProps> = ({
  open,
  onSaveAndGoBack,
  onGoBackWithoutSaving,
  onCancel,
  isSaving = false,
}) => (
  <Dialog open={open} onOpenChange={open => { if (!open) onCancel(); }}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure you want to go back?</DialogTitle>
      </DialogHeader>
      <DialogDescription >
        Do you want to save this route before going back?
      </DialogDescription>
      <DialogFooter className="flex flex-row gap-2  mt-4">
        <Button
          onClick={onSaveAndGoBack}
          variant="default"
          className="flex-1"
          disabled={isSaving}
        >
          <Save className=" h-4 w-4" />
          {isSaving ? "Saving..." : "Save and Go Back"}
        </Button>
        
        <DialogClose asChild>
          <Button
          onClick={onGoBackWithoutSaving}
          variant="destructive"
          className="flex-1"
          disabled={isSaving}
        >
          Go Back Without Saving
        </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);