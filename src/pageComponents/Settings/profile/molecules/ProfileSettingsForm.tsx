"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type TFunction } from "i18next";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { api } from "@/trpc/react";

import { FormInput } from "@/components/FormInput/FormInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { type ZodReturnType } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isError } from "@tanstack/react-query";

export const profileSchema = (translate: TFunction) =>
  z.object({
    username: z
      .string()
      .min(6, translate("profileValidation.usernameLengthValidation"))
      .max(20, translate("profileValidation.usernameLengthValidation"))
      .regex(
        /^[a-zA-Z0-9]*$/,
        translate("profileValidation.usernameAlphaNumericValidation")
      ),
    fullName: z
      .string()
      .min(6, translate("profileValidation.fullNameLengthValidation"))
      .max(40, translate("profileValidation.fullNameLengthValidation")),
  });

type RegisterFormValues = ZodReturnType<typeof profileSchema>;

export function ProfileSettingsForm() {
  const { data: user } = api.auth.getProfile.useQuery();
  const { mutateAsync } = api.auth.updateProfile.useMutation({
    onSuccess: () => {
      toast({
        title: t("toastCommon.successTitle"),
        description: t("updateProfile.profileUpdatedSuccessfully"),
        variant: "topDescructive",
        duration: 9000,
      });
    },
  });

  const { toast } = useToast();
  const { t } = useTranslation();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      username: user?.username ?? "",
      fullName: user?.fullName ?? "",
    },
  });

  const onSubmit = async ({ username, fullName }: RegisterFormValues) => {
    try {
      if (username == user?.username) {
        await mutateAsync({ fullName });
      } else {
        await mutateAsync({ username, fullName });
      }
    } catch (e) {
      if (isError(e)) {
        toast({
          title: t("toastCommon.errorTitle"),
          description: e.message,
          variant: "destructive",
          duration: 9000,
        });
      }
    }
  };

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <Form {...form}>
        <form
          className="grid w-[400px] gap-0"
          onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        >
          <CardHeader>
            <CardTitle>{t("updateProfile.title")}</CardTitle>
            <CardDescription>{t("updateProfile.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInput label={t("common.userNameLabel")}>
                  <Input {...field} type="text" />
                </FormInput>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormInput label={t("common.fullNameLabel")}>
                  <Input {...field} type="text" />
                </FormInput>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button loading={form.formState.isSubmitting} type="submit">
              {t("common.submitButton")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}