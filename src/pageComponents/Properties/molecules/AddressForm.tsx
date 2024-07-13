"use client";
import { FormInput } from "@/components/FormInput/FormInput";
import { Form, FormField } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import {
  addressValidationSchema,
  type AddressFormValues,
} from "./AddressForm.schema";
import { Input } from "@/components/ui/input";
import { Option } from "@/components/Search/Autocomplete";
import { AutoComplete } from "@/components/Search/Autocomplete";
import { MiniMap, MiniMapProps } from "@/components/Map/Minimap";
import { useStepper } from "@/components/ui/stepper";
import { StepperFormActions } from "@/components/Stepper/StepperFormActions";
import { Skeleton } from "@/components/ui/skeleton";

export type AddressFormProps = {
  addressFormValues: AddressFormValues;
  updateAddressFormValues: (data: AddressFormValues) => void;
};

export function AddressForm({
  addressFormValues,
  updateAddressFormValues,
}: AddressFormProps) {
  const { nextStep } = useStepper();
  const { t } = useTranslation();
  const { toast } = useToast();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressValidationSchema(t)),
    defaultValues: addressFormValues,
  });
  const fullAddress = form.watch("fullAddress");
  const [debounced] = useDebounce(fullAddress, 1000);

  const { data } = api.map.geoCode.useQuery(
    { query: debounced },
    {
      enabled: debounced.length > 6 && fullAddress === debounced,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const options: Option[] =
    data?.features?.map((feature: { properties: { full_address: any; }; }) => ({
      value: feature.properties.full_address,
      label: feature.properties.full_address,
    })) ?? [];

  // Move the logic inside useEffect to a separate function
  const updateForm = (value: string) => {
    const matched_feature = data?.features.find(
      (feature: { properties: { full_address: string; }; }) => feature.properties.full_address === value
    );

    if (matched_feature) {
      const context = matched_feature.properties.context;
      const geometry = matched_feature.geometry;

      const formFieldMapping = {
        fullAddress: value,
        addressLine1: context.address?.name,
        city: context.neighborhood?.name?.split(" ")[0] || context.place?.name,
        state: context.region?.region_code,
        zip: context.postcode?.name,
        country: context.country?.name,
        longitude: geometry?.coordinates[0],
        latitude: geometry?.coordinates[1],
      } as AddressFormValues;
      for (const [field, value] of Object.entries(formFieldMapping)) {
        if (value) {
          form.setValue(field as keyof AddressFormValues, value);
        }
      }
      updateAddressFormValues(formFieldMapping);
    }
  };

  // onSubmit should be triggered if all fields are validated. There is a case
  // when the user manually types the address without validation. As a result,
  // there is no geo coordinate associated with the input. We handle this in the
  // if check.
  const onSubmit = async (data: AddressFormValues) => {
    // missing longitude means the user haven't used autocomplete feature
    if (!data.longitude) {
      if (data.addressLine1) {
        toast({
          title: t("toastCommon.errorTitle"),
          description: t("toastCommon.errorAddressAutofill"),
          variant: "default",
          duration: 9000,
        });
      } else {
        toast({
          title: t("toastCommon.errorTitle"),
          description: t("toastCommon.errorMissingAddressFields"),
          variant: "default",
          duration: 9000,
        });
      }
    } else {
      updateAddressFormValues(data);
      nextStep();
      toast({
        title: t("toastCommon.successTitle"),
        description: t("toastCommon.successDescription"),
        variant: "default",
        duration: 3000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <div className="mx-auto my-5 flex w-full lg:flex-row flex-col flex-1 items-center justify-center gap-4">
          <div className="min-w-[450px] m-w-[650px] mr-10">
            <div className="mb-10">
              <AutoComplete
                options={options}
                emptyMessage="No results."
                placeholder="Type to autofill your address"
                isLoading={false}
                onValueComplete={(value) => {
                  updateForm(value.value);
                }}
                value={{ label: fullAddress, value: fullAddress }}
                onValueChange={(value) => {
                  form.setValue("fullAddress", value.value);
                }}
                disabled={false}
              />
            </div>
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormInput label={t("address.addressLine1")}>
                  <Input {...field} autoComplete="address-line1" />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormInput label={t("address.addressLine2")}>
                  <Input {...field} autoComplete="address-line2" />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormInput label={t("address.city")}>
                  <Input {...field} autoComplete="address-level2" />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormInput label={t("address.state")}>
                  <Input {...field} autoComplete="address-level1" />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormInput label={t("address.zip")}>
                  <Input {...field} autoComplete="postal-code" />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormInput label={t("address.country")}>
                  <Input {...field} autoComplete="country-name" />
                </FormInput>
              )}
            />
          </div>

          <div className="w-[500px]">
            {addressFormValues.longitude && addressFormValues.latitude ? (
              <MiniMap
                longitude={addressFormValues.longitude}
                latitude={addressFormValues.latitude}
                zoom={14}
              />
            ): <Skeleton className="h-[500px] w-[500px] animate-none" ><div className="h-full flex flex-col items-center justify-center">Select autofill address to show minimap</div></Skeleton>}
          </div>
        </div>
        <StepperFormActions />
      </form>
    </Form>
  );
}
