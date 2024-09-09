"use client";
import { t } from "i18next";
import React, { FormEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { Icons } from "@/components/Icons";
import { StepperFormActions } from "@/components/Stepper/StepperFormActions";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { useToast } from "@/components/ui/use-toast";
import { resizeForPropertyImages } from "@/utils/image";

// Image types
export type ImageFile = File & { preview: string };
export type ImageUploadProps = {
  imageFiles: ImageFile[];
  updateImageFiles: (files: ImageFile[]) => void;
};

export function ImageUpload({
  imageFiles,
  updateImageFiles,
}: ImageUploadProps) {
  const { nextStep } = useStepper();
  const { toast } = useToast();
  const CloseIcon = Icons["close"];
  const [files, setFiles] = useState<ImageFile[]>(imageFiles);
  const [resizedImages, setResizedImages] = useState<ImageFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 12,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      const allFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const uniqueFiles = allFiles.reduce(
        (acc, item) => {
          return acc.filter((file) => file.name === item.name).length > 0
            ? acc
            : [...acc, item];
        },
        [...files]
      );

      setFiles(uniqueFiles);

      // Reset to zero. Always resize at the client as it's cheap there.
      setResizedImages([]);
      const setUri = (uri: File) => {
        // empty preview for now.
        const objectUri = Object.assign(uri, {
          preview: "",
        });
        setResizedImages((prev) => [...prev, objectUri]);
      };
      resizeForPropertyImages(uniqueFiles, setUri);
    },
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    const finalImageFiles = resizedImages.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    updateImageFiles(finalImageFiles);
    nextStep();
    toast({
      title: t("toastCommon.successTitle"),
      description: t("toastCommon.successDescription"),
      variant: "default",
      duration: 3000,
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="min-h-[200px] bg-secondary flex flex-col items-center justify-center"
      >
        <input {...getInputProps()} />
        <p>Drag N drop image files here, or click to select files</p>
        <p>
          Maximum allowed files count is 12. Files will be resized to 1024x1024
          for storage.
        </p>
      </div>
      <div className="flex flex-row flex-wrap mt-4">
        {files.map((file: File & { preview: string }) => (
          <div
            key={file.name}
            className="inline-flex mb-8 mr-8 w-[280px] h-[280px]"
          >
            {/* Relative display so the child components button can stay at top right of the image */}
            <div className="relative flex">
              <Button
                onClick={(e) => {
                  setFiles(files.filter((f) => f.name !== file.name));
                }}
                className="absolute right-0 top-0 opacity-60 hover:opacity-100"
              >
                <CloseIcon />
              </Button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id={file.name}
                src={file.preview}
                alt="user-upload-image"
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="block w-auto h-full"
              />
            </div>
          </div>
        ))}
      </div>
      <StepperFormActions />
    </form>
  );
}
