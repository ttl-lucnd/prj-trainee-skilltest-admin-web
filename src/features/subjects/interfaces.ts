import { SubscriptionPlatform } from "@/utils";

export interface ISubject {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  name: string;
  logo: string;
  image: string;
  haveQuestion?: boolean;
  haveVocabulary?: boolean;
}

export interface IPackage {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  name: string;
  price: number;
  subjectId: string;
  durationDays: number;
  platform: SubscriptionPlatform;
  productId: string;
  description?: string;
  canDelete?: boolean;
}

export interface IPackageFormBody {
  name: string;
  price: number;
  subjectId: string;
  durationDays: number;
  platform: SubscriptionPlatform;
  productId: string;
  description?: string;
}

export interface ISubjectFormBody {
  name: string;
  logo?: string;
  image?: string;
}

export enum FormType {
  CREATE = 'create',
  UPDATE = 'update',
}
