"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isAuthError } from "@supabase/supabase-js";
import { type TFunction } from "i18next";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { FormInput } from "@/components/FormInput/FormInput";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/server/supabase/supabaseClient";
import { type ZodReturnType } from "@/utils/types";

/**
 * Register via email requires the user to provide an email and password.
 * The password must be at least 8 characters long and contain at least one uppercase letter,
 * one lowercase letter, and one special character. The password and password confirmation must match.
 */
const registerValidationSchema = (translate: TFunction) =>
  z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, translate("common.passwordLengthValidation"))
        .regex(/[A-Z]/, translate("common.passwordUppercaseValidation"))
        .regex(/[a-z]/, translate("common.passwordLowercaseValidation"))
        .regex(/[0-9]/, translate("common.passwordNumberValidation"))
        .regex(
          /[^A-Za-z0-9]/,
          translate("common.passwordSpecialCharacterValidation")
        ),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: translate("common.passwordConfirmationValidation"),
      path: ["passwordConfirmation"],
    });

type RegisterFormValues = ZodReturnType<typeof registerValidationSchema>;

const translations = {
  en: {
    hello: "Hello",
    confirmYourEmailAddress: "Confirm your email address.",
    resetYourEmail: "Reset your email.",
    confirmYourEmailAddressDescription:
      "Please confirm your email address by clicking the button below.",
    resetYourEmailDescription:
      "Click the button below to reset your email address.",
    buttonText: "Continue",
    orCopyAndPaste: "or copy and paste this URL into your browser:",
  },
  "zh-CN": {
    hello: "你好",
    confirmYourEmailAddress: "确认您的电子邮件地址。",
    resetYourEmail: "重置您的电子邮件。",
    confirmYourEmailAddressDescription:
      "请点击下面的按钮确认您的电子邮件地址。",
    resetYourEmailDescription: "点击下面的按钮以重置您的电子邮件地址。",
    buttonText: "继续",
    orCopyAndPaste: "或者复制并粘贴此URL到您的浏览器: ",
  },
};

export function UserAuthForm() {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidationSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { error } = await supabase().auth.signUp({
        ...data,
        options: {
          data: translations[i18n.language as "en" | "zh-CN"],
        },
      });

      if (error) {
        toast({
          title: t("toastCommon.errorTitle"),
          description: error.message,
          variant: "destructive",
          duration: 9000,
        });
      } else {
        toast({
          title: t("register.checkYourEmailForConfirmation"),
          description: t("common.confirmYourEmail"),
          variant: "default",
          duration: 9000,
        });
      }
    } catch (e) {
      if (isAuthError(e)) {
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
    <Form {...form}>
      <form
        className="grid gap-6"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInput label={t("common.emailLabel")}>
              <Input {...field} />
            </FormInput>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormInput label={t("common.passwordLabel")}>
              <Input {...field} type="password" />
            </FormInput>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormInput label={t("common.passwordConfirmLabel")}>
              <Input {...field} type="password" />
            </FormInput>
          )}
        />
        <Button loading={form.formState.isSubmitting} type="submit">
          {t("register.submitButton")}
        </Button>
      </form>
    </Form>
  );
}
