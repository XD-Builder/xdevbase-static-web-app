import { useEffect } from "react";

import { StepperFormActions } from "@/components/Stepper/StepperFormActions";
import { useStepper } from "@/components/ui/stepper";

export const CompletionView = () => {
  const { hasCompletedAllSteps } = useStepper();

  // if hasCompletedAllSteps, redirect to properties page after 5 seconds
  useEffect(() => {
    if (hasCompletedAllSteps) {
      // submitting the form to the
      setTimeout(() => {
        window.location.href = "/properties";
      }, 5000);
    }
  });

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">
            Congrats! The property is created! 🎉. Redirecting you back to the
            properties page in 5 seconds.
          </h1>
        </div>
      )}
      <StepperFormActions />
    </>
  );
};
