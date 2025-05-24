import { FileUploadStatus } from '@/components/form/upload';

export interface IGetFileUrlQuery {
  resourceType: string;
  contentType: string;
  originalName: string;
}

export interface IFile {
  id?: number;
  s3Key?: string;
  storedName?: string;
  originalName?: string;
  extension?: string;
  mimeType?: string;
  url?: string;
  status?: FileUploadStatus;
}

export interface ISubjectDropdown {
  id: string,
  name: string,
}