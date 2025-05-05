import { ICommonListQuery } from '@/utils/interfaces';
import { AdminStatus } from './constants';

export interface IAdminAccount {
  id: string;
  iamUserId: number;
  name: string;
  role: string;
  status: string;
  allowedIps: string[];
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  iamUser: {
    id: number;
    lastLoginAt: string | null;
  };
  createdByAccount: {
    id: number;
    iamUserId: number;
    name: string;
  };
  updatedByAccount: {
    id: number;
    iamUserId: number;
    name: string;
  };
}

export interface IAdminGetListQuery extends ICommonListQuery {
  name?: string;
}

export interface ICreateAdminBody {
  name: string;
  email: string;
  role: string;
  allowedIps: string[];
}

export interface IUpdateAdminStatusBody {
  status: AdminStatus;
}

export interface IUpdateAdminBody {
  role: string;
  allowedIps: string[];
}

export interface IAdminDropdown {
  id: number;
  name: string;
  iamUserId: number;
  status: string;
}
