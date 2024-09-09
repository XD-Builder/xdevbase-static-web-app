"use client";
import { t } from "i18next";
import { NextRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { StepperFormActions } from "@/components/Stepper/StepperFormActions";
import { generatePropertiesImagePath } from "@/server/supabase/storagePath";
import { api } from "@/trpc/react";
import { assert } from "@/utils/assert";
import { uploadUserFiles } from "@/utils/uploadFile";

import { AddressFormValues } from "./AddressForm.schema";
import { ImageFile } from "./ImageUpload";
import { PropertyFormValues } from "./PropertyForm.schema";

export type SubmissionFormProps = {
  propertyFormValues: PropertyFormValues;
  addressFormValues: AddressFormValues;
  imageFiles: ImageFile[];
  router: NextRouter;
};

export const SubmissionForm = ({
  propertyFormValues,
  addressFormValues,
  imageFiles,
  router,
}: SubmissionFormProps) => {
  const { data: user } = api.auth.getProfile.useQuery();
  assert(!!user, t("commonValidation.userMustBeLoggedIn"));

  const {
    mutateAsync,
    isLoading,
    error,
    isSuccess,
    isPaused,
    isError,
    isIdle,
  } = api.properties.createProperty.useMutation();
  const {
    mutateAsync: updateSignedImageURLs,
    isLoading: isLoadingImages,
    error: errorImages,
    isSuccess: isSuccessImages,
  } = api.properties.updateSignedImageURLs.useMutation();

  const [isRedirect, setIsRedirect] = useState(false);

  // Required because it is needed to submit all objects to the db and storage.
  const isFirstRender = useRef(true);
  useEffect(() => {
    const submitForm = async () => {
      try {
        const { id: propertyId } = await mutateAsync({
          propertyFormValues,
          addressFormValues,
        });

        const signedImageURLs = await Promise.all(
          imageFiles.map(async (file) => {
            const imagePath = generatePropertiesImagePath({
              userId: user.id,
              propertyId,
              imageFileName: file.name,
            });
            const response = await uploadUserFiles(imagePath, file);
            if (response.error) {
              console.warn(response.error.message);
            } else {
              return response.url;
            }
          })
        ).then((urls) => urls.filter((url) => url !== undefined));
        console.log("called signed image url");

        const response = await updateSignedImageURLs({
          signedImageUrls: signedImageURLs,
          propertyId,
        });
        console.log(response);

        setIsRedirect(true);
        setTimeout(() => {
          router.push("/properties");
        }, 5000);
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    };

    if (isFirstRender.current) {
      submitForm();
      isFirstRender.current = false;
    }
  }, []);

  console.log({
    isSuccess,
    isPaused,
    isError,
    isLoading,
    isSuccessImages,
    isLoadingImages,
    isRedirect,
    error,
    errorImages,
  });

  return (
    <div>
      {isLoading && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">
            Creating your property. Please wait while we process your
            submission.
          </h1>
        </div>
      )}
      {isLoadingImages && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">
            Uploading your images. Please wait while we process your submission.
          </h1>
        </div>
      )}
      {!isRedirect &&
        !isLoading &&
        !error &&
        !isLoadingImages &&
        !errorImages && (
          <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
            <h1 className="text-xl">Processing...</h1>
          </div>
        )}
      {isRedirect && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">
            Congrats! The property is created! 🎉. Redirecting you back to the
            properties page in 5 seconds.
          </h1>
        </div>
      )}
      {(error || errorImages) && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">
            Submission Failed. There is an error processing your submission.
            Please contact support@xdevbase.com
          </h1>
        </div>
      )}
      <StepperFormActions />
    </div>
  );
};
