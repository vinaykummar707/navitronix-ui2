import React from "react";
// You might need to adjust import paths as needed
import { Button } from "@/components/ui/button";
import useTestingFormStore from "@/stores/useTestingFormStore";
import { useGetApi, usePostApi } from "@/hooks/useApi";
import type { ButtonConfig } from "@/buttonConfig";



interface OperationButtonProps {
  config: ButtonConfig;
}

export const OperationButton: React.FC<OperationButtonProps> = ({ config }) => {
  const radio = useTestingFormStore((state) => state.radio);

  // Prepare hooks. For demo, always enabled for GET, mutate for POST.
  const { data, isLoading, error, refetch } = useGetApi(
    config.endpoint,
    undefined,
    false // Don't fetch until triggered
  );
  const postMutation = usePostApi(config.endpoint);

  // Handle Button Click
  const handleClick = () => {
    if (radio === "read") {
      refetch();
    } else if (radio === "write") {
      postMutation.mutate(config.payload || {});
    }
  };



  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      disabled={config.disabled || isLoading || postMutation.isLoading}
      className="flex items-center gap-2"
    >
      <config.icon  className="w-4 h-4" />
      {config.label}
    </Button>
  );
};

// (optional) Example usage for rendering all buttons
// export const AllOperationButtons = () => (
//   <div className="flex gap-2">
//     {buttonConfigs.map((config) => (
//       <OperationButton key={config.id} config={config} />
//     ))}
//   </div>
// );