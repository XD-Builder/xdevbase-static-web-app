import Resizer from "react-image-file-resizer";

export const resizeForPropertyImages = (files: File[], setUri: (uri:  File)=> void) => {
  files.forEach((file) => {
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      "JPEG",
      80,
      0,
      (uri) => {
        setUri(uri as File);
      },
      "file"
    );
  });
};
