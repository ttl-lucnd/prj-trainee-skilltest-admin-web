import { ApiService } from '@/plugins/axios/api';
import axiosService from '@/plugins/axios';
import { IBodyResponse } from '@/utils/interfaces';

class FileApiService extends ApiService {
  uploadFile(file: File): Promise<IBodyResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post(`${this.baseUrl}/upload-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export const fileApiService = new FileApiService({ baseUrl: 'admin/common' }, axiosService);
