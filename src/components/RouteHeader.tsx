import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, Download, Save } from "lucide-react";

type RouteHeaderProps = {
  title: string;
  onBack: () => void;
  onViewJson?: () => void;
  onDownloadJson?: () => void;
  onSaveRoute?: () => void;
  className?: string;
};

export function RouteHeader({
  title,
  onBack,
  onViewJson,
  onDownloadJson,
  onSaveRoute,
  className = "",
}: RouteHeaderProps) {
  return (
    <header
      className={`flex items-center shrink-0 justify-between h-16 px-4 bg-sidebar border-border border-b ${className}`}
    >
      <div className="w-[40rem] flex items-center justify-start">
        <Button size="sm" variant="secondary" onClick={onBack}>
          <ChevronLeft /> Back
        </Button>
      </div>
      <div className="font-semibold flex-1 text-sm flex items-center justify-center">
        {title}
      </div>
      <div className="w-[40rem] flex items-center gap-2 justify-end">
        <Button size="sm" variant="secondary" onClick={onViewJson}>
          <Eye /> View Json
        </Button>
        <Button size="sm" variant="secondary" onClick={onDownloadJson}>
          <Download /> Download Json
        </Button>
        <Button type="submit" size="sm" variant="" onClick={onSaveRoute}>
          <Save /> Save Route
        </Button>
      </div>
    </header>
  );
}