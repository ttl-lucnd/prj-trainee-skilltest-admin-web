import { FileUploadStatus } from '@/components/form/upload';
import { SYNC_DATA_STATUS } from './constants';

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

export interface ISyncSettingBody {
  sheetLink: string;
  lastReadRow: number;
}

export interface ISyncSettingDetail {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  sheetLink: string;
  lastReadRow: number;
  lastSyncDataAt?: Date;
  status?: SYNC_DATA_STATUS;
}