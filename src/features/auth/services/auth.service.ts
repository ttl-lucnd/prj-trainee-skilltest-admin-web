import { ApiService } from '@/plugins/axios/api';
import axiosService from '@/plugins/axios';
import { IBodyResponse } from '@/utils/interfaces';
import { IGoogleLoginResponse, ILoginGoogleBody } from '../interfaces';

class AuthService extends ApiService {
  login(body: ILoginGoogleBody): Promise<IBodyResponse<IGoogleLoginResponse>> {
    return this.client.post(`${this.baseUrl}/login`, body);
  }

  logout() {
    return this.client.post(`${this.baseUrl}/logout`);
  }
  registerDeviceToken(firebaseToken: string, deviceId: string) {
    return this.client.post(`${this.baseUrl}/notification-token`, {
      firebaseToken,
      deviceId,
    });
  }

  getGoogleLoginUrl(
    redirectUri: string,
    state?: string,
  ): Promise<IBodyResponse<{ loginUrl: string }>> {
    return this.client.get(`${this.baseUrl}/google-login-url`, {
      params: {
        redirectUri,
        state,
      },
    });
  }
}

export const authService = new AuthService({ baseUrl: 'admin/auth' }, axiosService);
