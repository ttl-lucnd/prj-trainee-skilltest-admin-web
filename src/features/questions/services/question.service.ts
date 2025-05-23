import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, IGetListResponse } from '@/utils/interfaces';
import {
  IQuestion,
  IQuestionGetListQuery,
  IQuestionSetting,
  IUpdateQuestionSettingBody,
} from '../interfaces';

class QuestionService extends ApiService {
  getQuestionSetting(): Promise<IBodyResponse<IQuestionSetting>> {
    return this.client.get(`${this.baseUrl}/setting`)
  }

  updateQuestionSetting(
    body: IUpdateQuestionSettingBody,
  ): Promise<IBodyResponse<IQuestionSetting>> {
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
}

export const questionService = new QuestionService(
  { baseUrl: 'admin/questions' },
  axiosService,
);
