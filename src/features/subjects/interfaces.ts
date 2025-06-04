export interface ISubject {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  name: string;
  monthlyFee: number;
  logo: string;
  image: string;
  haveQuestion?: boolean;
  haveVocabulary?: boolean;
}

export interface ISubjectFormBody {
  name: string;
  monthlyFee: number;
  logo?: string;
  image?: string;
}

export enum SubjectFormType {
  CREATE = 'create',
  UPDATE = 'update',
}
