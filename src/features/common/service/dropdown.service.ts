import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, IGetListResponse } from '@/utils/interfaces';
import { ISubjectDropdown } from '../interface';
import { DEFAULT_LIMIT_FOR_DROPDOWN } from '@/utils';

class CommonService extends ApiService {
    getSubjectDropdown(): Promise<IBodyResponse<IGetListResponse<ISubjectDropdown>>> {
        return this.client.get(`${this.baseUrl}/subject`, { params: { limit: DEFAULT_LIMIT_FOR_DROPDOWN } })
    };

    getArrangeDropdown(): Promise<IBodyResponse<IGetListResponse<number>>> {
        return this.client.get(`${this.baseUrl}/arrange`, { params: { limit: DEFAULT_LIMIT_FOR_DROPDOWN } })
    };
}

export const commonService = new CommonService(
    { baseUrl: 'admin/dropdown' },
    axiosService,
);
