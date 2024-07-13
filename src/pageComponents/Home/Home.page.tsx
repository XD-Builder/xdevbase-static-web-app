"use client";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { resizeForPropertyImages } from "@/utils/image";
import React, { SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { Property } from 'csstype';

export function HomePage() {
  return <Previews />;
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 300,
  padding: 4,
  boxSizing: "border-box" as Property.BoxSizing,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Previews() {
  const CloseIcon = Icons["close"];
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [resizedImages, setResizedImages] = useState<
    (File & { preview: string })[]
  >([]);
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
        const objectUri = Object.assign(uri, {
          preview: URL.createObjectURL(uri),
        });
        setResizedImages((prev) => [...prev, objectUri]);
      };
      resizeForPropertyImages(uniqueFiles, setUri);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      resizedImages.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [resizedImages]);

  return (
    <section className="container">
      <EmptyPlaceholder
        {...getRootProps({ className: "dropzone" })}
        className="min-h-[200px] bg-secondary"
      >
        <input {...getInputProps()} />
        <p>Drag N drop image files here, or click to select files</p>
        <p>
          Maximum allowed files count is 12. Files will be resized to 1024x1024 for storage.
        </p>
      </EmptyPlaceholder>
      <div className="flex flex-row flex-wrap mt-4">
        {files.map((file: File & { preview: string }) => (
          <div style={thumb} key={file.name}>
            <div style={thumbInner} className="relative">
              <Button
                onClick={(e) => {
                  setFiles(files.filter((f) => f.name !== file.name))}
                }
                className="absolute right-0 top-0 opacity-60 hover:opacity-100"
              >
                <CloseIcon />
              </Button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id={file.name}
                src={file.preview}
                style={img}
                alt="user-upload-image"
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
          </div>
        ))
      }
      </div>
    </section>
  );
}