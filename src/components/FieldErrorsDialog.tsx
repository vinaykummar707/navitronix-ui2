import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface FieldErrorsDialogProps {
  open: boolean;
  onClose: () => void;
  errorMessages: string[];
}

export const FieldErrorsDialog: React.FC<FieldErrorsDialogProps> = ({
  open,
  onClose,
  errorMessages,
}) => (
  <Dialog open={open} onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Missing Required Fields
          </span>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        The following required fields must be filled to save the route, "RouteNumber, Source, Destination, Via"
      </DialogDescription>
      
      <DialogFooter className="flex flex-row mt-">
        <DialogClose asChild>
          <Button variant="default" className="flex-1" onClick={onClose}>
            OK
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);