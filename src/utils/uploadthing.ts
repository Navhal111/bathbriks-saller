import { generateUploadButton, generateUploadDropzone, generateUploader, generateReactHelpers } from "@uploadthing/react";

export const Uploader: ReturnType<typeof generateUploader> = generateUploader();
export const UploadButton: ReturnType<typeof generateUploadButton> = generateUploadButton();
export const UploadDropzone: ReturnType<typeof generateUploadDropzone> = generateUploadDropzone();

export const { useUploadThing, uploadFiles } = generateReactHelpers();

