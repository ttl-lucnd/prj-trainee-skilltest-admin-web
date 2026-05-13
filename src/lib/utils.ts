import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Options = {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  signedUrl: string;
};

export const uploadFile = (file: File, params: Options) => {
  const { onUploadProgress, signedUrl } = params;
  return new Promise<AxiosResponse>((resolve, reject) => {
    // upload file
    const config = {
      headers: { 'content-type': file.type },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        onUploadProgress?.(progressEvent);
      },
    };
    const reader = new FileReader();
    reader.onload = async function (e) {
      const arrayBuffer = e?.target?.result;
      try {
        const uploadResponse = await axios.create(config).put(signedUrl, arrayBuffer);
        resolve(uploadResponse);
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file!'));
    };
    reader.readAsArrayBuffer(file);
  });
};
