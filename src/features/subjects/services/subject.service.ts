import axiosService from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IBodyResponse, ICommonListQuery, IGetListResponse } from '@/utils/interfaces';
import {
  ISubject,
  ISubjectFormBody,
} from '../interfaces';

class SubjectService extends ApiService {
  createSubject(body: ISubjectFormBody): Promise<IBodyResponse<ISubject>> {
    return this._create(body);
  }

  updateSubject(
    id: string,
    body: Partial<ISubjectFormBody>,
  ): Promise<IBodyResponse<ISubject>> {
    return this._update(id, body);
  }

  getSubjectList(
    query: ICommonListQuery,
  ): Promise<IBodyResponse<IGetListResponse<ISubject>>> {
    return this._getList(query);
  }
}

export const subjectService = new SubjectService(
  { baseUrl: 'admin/subject' },
  axiosService,
);
