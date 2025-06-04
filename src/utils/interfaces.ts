import { AxiosResponse } from 'axios';
import { HttpStatus, OrderDirection } from './constants';

export interface IErrorItem {
  errorField: string;
  errorKey: string;
  errorMessage?: string;
  errorCode: HttpStatus;
  order?: number;
}

export interface IBodyResponse<T> extends AxiosResponse {
  success: boolean;
  code: HttpStatus;
  isRequestError?: boolean;
  message: string;
  data: T;
  errors?: IErrorItem[];
  errorCode?: string;
}

export interface ICommonListQuery {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
  keyword?: string;
}

export interface IGetListResponse<T> {
  items: T[];
  totalItems: number;
}

export interface IIconProps {
  size?: number;
  className?: string;
  fill?: string;
  stroke?: string;
}

export interface IFileDetail {
  id?: number;
  originalName?: string;
  storedName?: string;
  mimeType?: string;
  extension?: string;
  url?: string;
  updatedAt?: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}
