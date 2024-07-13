"use client";
import React, { useState } from "react";
import { AddressForm } from "./molecules/AddressForm";
import { useTranslation } from "react-i18next";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { Home, MapPinned, Send, SquarePen } from "lucide-react";
import { PropertyForm } from "./molecules/PropertyForm";
import { SubmissionForm } from "./molecules/SubmissionForm";
import { AddressFormValues } from "./molecules/AddressForm.schema";
import { PropertyFormValues } from "./molecules/PropertyForm.schema";
import { ImageFile, ImageUpload } from "./molecules/ImageUpload";
import { useRouter } from "next/navigation";

const steps = [
  {
    label: "Address",
    description: "autofill your address",
    icon: MapPinned,
  },
  {
    label: "Description",
    description: "describe the property",
    icon: SquarePen,
  },
  {
    label: "Upload",
    description: "upload property photos",
    icon: Home,
  },
  {
    label: "Review",
    description: "Review information for submission",
    icon: Send,
  },
] satisfies StepItem[];

/**
 * The properties page allows the user to view properties.
 */
export function PropertiesCreate() {
  const { t } = useTranslation();
  const router = useRouter();

  // Step 1
  const [addressFormValues, setAddressFormValues] = useState<AddressFormValues>(
    {
      fullAddress: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      longitude: undefined,
      latitude: undefined,
    }
  );
  const updateAddressFormValues = (data: AddressFormValues) => {
    setAddressFormValues(data);
  };

  // Step 2
  const [propertyFormValues, setPropertyFormValues] =
    useState<PropertyFormValues>({
      propertyName: "",
      propertyDescription: "",
    });
  const updatePropertyFormValues = (data: PropertyFormValues) => {
    setPropertyFormValues(data);
  };

  // Step 3
  const [imageFiles, updateImageFiles] = useState<ImageFile[]>([]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <AddressForm
                  addressFormValues={addressFormValues}
                  updateAddressFormValues={updateAddressFormValues}
                />
              </Step>
            );
          }
          if (index === 1) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <PropertyForm
                  propertyFormValues={propertyFormValues}
                  updatePropertyFormValues={updatePropertyFormValues}
                />
              </Step>
            );
          }
          if (index === 2) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ImageUpload
                  imageFiles={imageFiles}
                  updateImageFiles={updateImageFiles}
                />
              </Step>
            );
          }

          return (
            <Step key={stepProps.label} {...stepProps}>
              <SubmissionForm
                router={router}
                addressFormValues={addressFormValues}
                propertyFormValues={propertyFormValues}
                imageFiles={imageFiles}
              />
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
