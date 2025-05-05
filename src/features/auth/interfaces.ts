import { AuthProvider } from './constants';

export interface ILoginGoogleBody {
  provider: AuthProvider.GOOGLE;
  googlePayload: {
    token: string;
    redirectUri: string;
  };
}

export interface IProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  iamUserId: number;
  name: string;
  role: string;
  status: string;
  allowedIps: string[];
};

export interface IToken {
  token: string;
  expiresIn: number;
  expiredAt: string;
}

export interface IGoogleLoginResponse {
  profile: IProfile;
  accessToken: IToken;
  refreshToken: IToken;
}
