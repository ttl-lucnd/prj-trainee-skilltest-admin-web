import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, ICommonListQuery, IGetListResponse } from '@/utils/interfaces';
import {
  IAdminAccount,
  IUpdateAdminBody,
} from '../interfaces';

class AdminService extends ApiService {
  createAdmin(body: IUpdateAdminBody): Promise<IBodyResponse<IAdminAccount>> {
    return this._create(body);
  }

  updateAdmin(
    id: string,
    body: IUpdateAdminBody,
  ): Promise<IBodyResponse<IAdminAccount>> {
    return this._update(id, body);
  }

  getAdminList(
    query: ICommonListQuery,
  ): Promise<IBodyResponse<IGetListResponse<IAdminAccount>>> {
    return this._getList(query);
  }
}

export const adminService = new AdminService(
  { baseUrl: 'admin/admin-account' },
  axiosService,
);
