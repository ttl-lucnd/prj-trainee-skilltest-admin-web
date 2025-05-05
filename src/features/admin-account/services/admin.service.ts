import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, IGetListResponse } from '@/utils/interfaces';
import {
  IAdminAccount,
  IAdminGetListQuery,
  ICreateAdminBody,
  IUpdateAdminBody,
  IUpdateAdminStatusBody,
} from '../interfaces';

class AdminService extends ApiService {
  createAdmin(body: ICreateAdminBody): Promise<IBodyResponse<IAdminAccount>> {
    return this._create(body);
  }

  updateAdmin(
    id: string,
    body: IUpdateAdminBody,
  ): Promise<IBodyResponse<IUpdateAdminBody>> {
    return this._update(id, body);
  }

  updateAdminStatus(
    id: string,
    body: IUpdateAdminStatusBody,
  ): Promise<IBodyResponse<IUpdateAdminStatusBody>> {
    return this.client.patch(`${this.baseUrl}/${id}/status`, body);
  }

  getAdminList(
    query: IAdminGetListQuery,
  ): Promise<IBodyResponse<IGetListResponse<IAdminAccount>>> {
    return this._getList(query);
  }
}

export const adminService = new AdminService(
  { baseUrl: 'admin/admin-account' },
  axiosService,
);
