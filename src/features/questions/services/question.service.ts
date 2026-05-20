import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, IGetListResponse } from '@/utils/interfaces';
import {
  IQuestion,
  IQuestionFormBody,
  IQuestionGetListQuery,
} from '../interfaces';
import { ISyncSettingBody, ISyncSettingDetail } from '@/features/common/interface';

class QuestionService extends ApiService {
  getQuestionSetting(): Promise<IBodyResponse<ISyncSettingDetail>> {
    return this.client.get(`${this.baseUrl}/setting`)
  }

  updateQuestionSetting(
    body: ISyncSettingBody,
  ): Promise<IBodyResponse<ISyncSettingDetail>> {
    return this.client.post(`${this.baseUrl}/setting`, body)
  }

  getQuestionList(
    query: IQuestionGetListQuery,
  ): Promise<IBodyResponse<IGetListResponse<IQuestion>>> {
    return this._getList(query);
  }

  syncData(): Promise<IBodyResponse<unknown>> {
    return this.client.post(`${this.baseUrl}/sync-data`)
  }

  updateQuestion(id: string, data: IQuestionFormBody): Promise<IBodyResponse<IQuestion>> {
    return this._update(id, data)
  }

  bulkDelete(ids: string[]): Promise<IBodyResponse<any>> {
    return this.client.delete(`${this.baseUrl}/bulk-delete`, {
      data: { ids }
    })
  }
}

export const questionService = new QuestionService(
  { baseUrl: 'admin/questions' },
  axiosService,
);
