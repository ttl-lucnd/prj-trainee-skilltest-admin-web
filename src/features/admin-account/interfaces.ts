import { AdminRole } from './constants';

export interface IAdminAccount {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  name: string;
  email: string;
  role: AdminRole
}

export interface IUpdateAdminBody {
  name: string;
  email: string;
}

export enum AdminFormType {
  CREATE = 'create',
  UPDATE = 'update',
}
