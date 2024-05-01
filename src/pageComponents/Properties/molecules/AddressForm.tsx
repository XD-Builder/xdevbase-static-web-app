"use client";
import { FormInput } from "@/components/FormInput/FormInput";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Option } from "@/components/Search/Autocomplete";
import { AutoComplete } from "@/components/Search/Autocomplete";
import { MiniMap, MiniMapProps } from "@/components/Map/Minimap";

export function AddressForm() {
  const [autofillValue, setAutofillValue] = useState<Option>();
  const [minimapProps, setMinimapProps] = useState<MiniMapProps>();
  // Form related
  const { t } = useTranslation();
  const { toast } = useToast();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressValidationSchema(t)),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const [debouncedValue] = useDebounce(autofillValue, 3000);
  console.log(
    "address",
    autofillValue?.value,
    "debouncedValue",
    debouncedValue?.value
  );

  const { data } = api.map.geoCode.useQuery(
    { query: debouncedValue?.value ?? "" },
    {
      enabled:
        debouncedValue &&
        debouncedValue?.value.length > 6 &&
        autofillValue?.value == debouncedValue?.value,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const options: Option[] =
    data?.features?.map((feature) => ({
      value: feature.properties.full_address,
      label: feature.properties.full_address,
    })) ?? [];

  // Move the logic inside useEffect to a separate function
  const updateForm = (value: string) => {
    const matched_feature = data?.features.find(
      (feature) => feature.properties.full_address === value
    );

    if (matched_feature) {
      const context = matched_feature.properties.context;

      const formFieldMapping = {
        addressLine1: context.address?.name,
        city: context.neighborhood?.name?.split(" ")[0] || context.place?.name,
        state: context.region?.region_code,
        zip: context.postcode?.name,
        country: context.country?.name,
      };

      if (matched_feature.geometry) {
        const [longitude, latitude] = matched_feature.geometry.coordinates;
        setMinimapProps({
          longitude,
          latitude,
          zoom: 14,
        });
        console.log(minimapProps)
      }

      for (const [field, value] of Object.entries(formFieldMapping)) {
        if (value) {
          form.setValue(field as keyof AddressFormValues, value);
        }
      }
    }
  };

  const onSubmit = async (data: AddressFormValues) => {
    console.log("saving the data");
    const error = { message: "error" };
    console.log(data);

    if (error) {
      toast({
        title: t("toastCommon.errorTitle"),
        description: error.message,
        variant: "destructive",
        duration: 9000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <div className="mx-auto flex w-full lg:flex-row flex-col flex-1 items-center justify-left gap-4">
          <div className="flex-grow min-w-[450px] mr-10">
            <div className="mt-6 mb-10">
              <AutoComplete
                options={options}
                emptyMessage="No results."
                placeholder="Type to autofill your address"
                isLoading={false}
                onValueComplete={(value) => {
                  updateForm(value.value);
                }}
                value={autofillValue}
                onValueChange={(value) => {
                  setAutofillValue(value);
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
            <Separator className="my-5" />
          </div>

          <div className="w-[500px]">
            {minimapProps && <MiniMap {...minimapProps} />}
          </div>
        </div>

        <Button loading={form.formState.isSubmitting} type="submit">
          {t("common.continueButton")}
        </Button>
        <div className="mx-auto flex w-full flex-1 items-center justify-left gap-4"></div>
      </form>
    </Form>
  );
}
