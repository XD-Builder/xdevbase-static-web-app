"use client";

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
import { ImageUploadInput } from "@/components/ImageUploadInput/ImageUploadInput";
import { IMAGE_FILE_NAMES, SUPPORTED_IMAGE_FORMATS } from "@/utils/constant";
import { uploadUserFiles } from "@/utils/uploadFile";
import { assert } from "@/utils/assert";
import { generateUserImagePath } from "@/server/supabase/storagePath";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFunction } from "i18next";

export const profileSchema = (t: TFunction) =>
  z.object({
    username: z
      .string()
      .min(6, t("profileValidation.usernameLengthValidation"))
      .max(20, t("profileValidation.usernameLengthValidation"))
      .regex(
        /^[a-zA-Z0-9]*$/,
        t("profileValidation.usernameAlphaNumericValidation")
      ),
    fullName: z
      .string()
      .min(6, t("profileValidation.fullNameLengthValidation"))
      .max(40, t("profileValidation.fullNameLengthValidation")),
    avatarToUpload: z
      .custom<Blob>((val) => val instanceof Blob)
      .refine(
        (files) => files?.size <= 1 * 1024 * 5024,
        t("profileValidation.avatarFileSizeValidation")
      )
      .refine(
        (files) => SUPPORTED_IMAGE_FORMATS.has(files?.type),
        t("profileValidation.avatarFileTypeValidation")
      )
      .optional(),
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
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      username: user?.username ?? "",
      fullName: user?.fullName ?? "",
      avatarToUpload: undefined,
    },
  });

  const onSubmit = async ({
    avatarToUpload,
    username,
    fullName,
  }: RegisterFormValues) => {
    let avatarUrl: string | undefined | null;
    try {
      if (avatarToUpload) {
        assert(!!user, t("commonValidation.userMustBeLoggedIn"));
        const { url, error } = await uploadUserFiles(
          generateUserImagePath({
            userId: user.id,
            imageFileName: IMAGE_FILE_NAMES.AVATAR,
          }),
          avatarToUpload
        );
        if (error) throw error;

        avatarUrl = url;
      } else if (avatarToUpload === null) {
        avatarUrl = null;
      }

      if (username == user?.username) {
        await mutateAsync({ fullName, avatarUrl });
      } else {
        await mutateAsync({ username, fullName, avatarUrl });
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
    <Card>
      <Form {...methods}>
        <form
          className="grid w-[400px] gap-0"
          onSubmit={(e) => void methods.handleSubmit(onSubmit)(e)}
        >
          <CardHeader>
            <CardTitle>{t("updateProfile.title")}</CardTitle>
            <CardDescription>{t("updateProfile.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormInput label={t("common.avatarLabel")}>
              <div className="h-[200px] w-[200px]">
                <ImageUploadInput
                  name="avatarToUpload"
                  control={methods.control}
                  defaultImageUrl={user?.avatarUrl ?? undefined}
                  aspectRatio={1 / 1}
                  cropImageAspectRatio={1 / 1}
                  dimensionsRestrictions={{
                    maxHeight: 200,
                    minHeight: 50,
                    maxWidth: 200,
                    minWidth: 50,
                  }}
                  restoreButton={false}
                  circleCrop={true}
                />
              </div>
            </FormInput>
            <br />
            <FormField
              control={methods.control}
              name="username"
              render={({ field }) => (
                <FormInput label={t("common.userNameLabel")}>
                  <Input {...field} type="text" />
                </FormInput>
              )}
            />
            <FormField
              control={methods.control}
              name="fullName"
              render={({ field }) => (
                <FormInput label={t("common.fullNameLabel")}>
                  <Input {...field} type="text" />
                </FormInput>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button loading={methods.formState.isSubmitting} type="submit">
              {t("common.submitButton")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
