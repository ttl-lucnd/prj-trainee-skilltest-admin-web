import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, IGetListResponse } from '@/utils/interfaces';
import {
  IVocabulary,
  IVocabularyGetListQuery,
  IVocabularySetting,
  IUpdateVocabularySettingBody,
} from '../interfaces';

class VocabularyService extends ApiService {
  getVocabularySetting(): Promise<IBodyResponse<IVocabularySetting>> {
    return this.client.get(`${this.baseUrl}/setting`)
  }

  updateVocabularySetting(
    body: IUpdateVocabularySettingBody,
  ): Promise<IBodyResponse<IVocabularySetting>> {
    return this.client.post(`${this.baseUrl}/setting`, body)
  }

  getVocabularyList(
    query: IVocabularyGetListQuery,
  ): Promise<IBodyResponse<IGetListResponse<IVocabulary>>> {
    return this._getList(query);
  }

  syncData(): Promise<IBodyResponse<unknown>> {
    return this.client.post(`${this.baseUrl}/sync-data`)
  }
}

export const vocabularyService = new VocabularyService(
  { baseUrl: 'admin/vocabularies' },
  axiosService,
);
