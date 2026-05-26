import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, ICommonListQuery, IGetListResponse } from '@/utils/interfaces';
import {
  ISaleDetail,
  ISubscription,
} from '../interfaces';

class SubscriptionService extends ApiService {
  getSubscriptionList(
    query: ICommonListQuery,
  ): Promise<IBodyResponse<IGetListResponse<ISubscription>>> {
    return this._getList(query);
  }

  getSaleDetailList(
    id: string,
    query: ICommonListQuery,
  ): Promise<IBodyResponse<IGetListResponse<ISaleDetail>>> {
    return this.client.get(`${this.baseUrl}/${id}`, {
      params: query,
    });
  }

}

export const subscriptionService = new SubscriptionService(
  { baseUrl: 'admin/subscription-payments' },
  axiosService,
);
