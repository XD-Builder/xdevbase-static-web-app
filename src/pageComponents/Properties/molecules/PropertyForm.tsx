"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormInput } from "@/components/FormInput/FormInput";
import { StepperFormActions } from "@/components/Stepper/StepperFormActions";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStepper } from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import {
  PropertyFormValues,
  propertyValidationSchema,
} from "./PropertyForm.schema";

export type PropertyFormProps = {
  propertyFormValues: PropertyFormValues;
  updatePropertyFormValues: (data: PropertyFormValues) => void;
};

export function PropertyForm({
  propertyFormValues,
  updatePropertyFormValues,
}: PropertyFormProps) {
  const { nextStep } = useStepper();
  const { t } = useTranslation();
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyValidationSchema(t)),
    defaultValues: propertyFormValues,
  });

  function onSubmit(data: PropertyFormValues) {
    updatePropertyFormValues(data);
    nextStep();
    toast({
      title: t("toastCommon.successTitle"),
      description: t("toastCommon.successDescription"),
      variant: "default",
      duration: 3000,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto my-5 flex w-full flex-col flex-1 items-center justify-center gap-4">
          <div className="min-w-[450px] m-w-[650px] mr-10">
            <FormField
              control={form.control}
              name="propertyName"
              render={({ field }) => (
                <FormInput label={t("address.propertyName")}>
                  <Input
                    {...field}
                    placeholder={t("address.propertyNamePlaceHolder")}
                  />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="propertyDescription"
              render={({ field }) => (
                <FormInput label={t("address.propertyDescription")}>
                  <Textarea
                    placeholder={t("address.propertyDescriptionPlaceHolder")}
                    className="min-w-[700px] min-h-[300px]"
                    {...field}
                  />
                </FormInput>
              )}
            />
          </div>
        </div>
        <StepperFormActions />
      </form>
    </Form>
  );
}
