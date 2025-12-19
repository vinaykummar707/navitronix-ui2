import PcbCreationDialog from "@/dialogs/PcbCreationDialog";

// PCBs page as Home's child route
export default function PcbsPage() {
    return (
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-semibold">Pcb Devices</h2>
        <PcbCreationDialog />
      </div>
    )
  }