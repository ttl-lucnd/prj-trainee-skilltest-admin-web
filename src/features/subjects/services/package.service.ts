import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, ICommonListQuery, IGetListResponse } from '@/utils/interfaces';
import {
    IPackage,
    IPackageFormBody,
} from '../interfaces';

class PackageService extends ApiService {
    createPackage(body: IPackageFormBody): Promise<IBodyResponse<IPackage>> {
        return this._create(body);
    }

    updatePackage(
        id: string,
        body: Partial<IPackageFormBody>,
    ): Promise<IBodyResponse<IPackage>> {
        return this._update(id, body);
    }

    getPackageList(
        query: ICommonListQuery,
    ): Promise<IBodyResponse<IGetListResponse<IPackage>>> {
        return this._getList(query);
    }
}

export const packageService = new PackageService(
    { baseUrl: '/admin/subject-subscription-packages' },
    axiosService,
);
