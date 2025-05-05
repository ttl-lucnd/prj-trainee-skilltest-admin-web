import { ApiService } from '@/plugins/axios/api';
import axiosService from '@/plugins/axios';
import { IGetFileUrlQuery } from '../interface';
import { IBodyResponse } from '@/utils/interfaces';

class FileApiService extends ApiService {
  getAdminFileUrl(
    query: IGetFileUrlQuery,
  ): Promise<
    IBodyResponse<{
      signedUrl: string;
      storedName: string;
      s3Key: string;
      filePath: string;
    }>
  > {
    return this.client.get(`${this.baseUrl}/admin/signed-url`, { params: query });
  }
}

export const fileApiService = new FileApiService({ baseUrl: 'files' }, axiosService);
