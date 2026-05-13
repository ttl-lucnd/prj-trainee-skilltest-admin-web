import { SupportLanguage } from './constants';
import { isJson, isStringify } from './helpers';
import { storage } from './storage';

export enum LOCAL_STORAGE_KEY {
  LOGIN_USER = 'loginUser',
  ACCESS_TOKEN = 'accessToken',
  CURRENT_LANGUAGE = 'currentLanguage',
  FIREBASE_TOKEN = 'firebase-token',
  DEVICE_ID = 'deviceId',
  PUBLIC_IP_ADDRESS = 'publicIpAddress',
}

class LocalStorageAuthService {
  // LOGIN USER
  setUser(user: any): void {
    if (!user) {
      storage.set(LOCAL_STORAGE_KEY.LOGIN_USER, '');
    }
    if (!isStringify(user)) {
      return;
    }
    storage.set(LOCAL_STORAGE_KEY.LOGIN_USER, JSON.stringify(user));
  }

  setCurrentLanguage(language?: string) {
    storage.set(LOCAL_STORAGE_KEY.CURRENT_LANGUAGE, language || SupportLanguage.EN);
  }

  setFirebaseToken(firebaseToken: string | null) {
    if (!firebaseToken) {
      storage.removeItem(LOCAL_STORAGE_KEY.FIREBASE_TOKEN);
    } else {
      storage.set(LOCAL_STORAGE_KEY.FIREBASE_TOKEN, firebaseToken);
    }
  }

  setDeviceId(deviceId: string | null) {
    if (!deviceId) {
      storage.removeItem(LOCAL_STORAGE_KEY.DEVICE_ID);
    } else {
      storage.set(LOCAL_STORAGE_KEY.DEVICE_ID, deviceId);
    }
  }

  getUser(): any {
    const loginUser = storage.get(LOCAL_STORAGE_KEY.LOGIN_USER);
    if (!loginUser || !isJson(loginUser)) return null;
    return JSON.parse(loginUser) as unknown;
  }

  getAccessToken() {
    return storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  }

  getFirebaseToken() {
    return storage.get(LOCAL_STORAGE_KEY.FIREBASE_TOKEN);
  }

  getCurrentLanguage() {
    return storage.get(LOCAL_STORAGE_KEY.CURRENT_LANGUAGE);
  }

  getDeviceId() {
    return storage.get(LOCAL_STORAGE_KEY.DEVICE_ID);
  }

  getPublicIpAddress() {
    return storage.get(LOCAL_STORAGE_KEY.PUBLIC_IP_ADDRESS);
  }

  setPublicIpAddress(ipAddress: string | null) {
    if (!ipAddress) {
      storage.removeItem(LOCAL_STORAGE_KEY.PUBLIC_IP_ADDRESS);
    } else {
      storage.set(LOCAL_STORAGE_KEY.PUBLIC_IP_ADDRESS, ipAddress);
    }
  }
  resetAll(): void {
    this.setUser(null);
    this.setFirebaseToken(null);
    // Do not remove deviceId
  }
}

const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
