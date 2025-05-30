import { ICommonListQuery } from '@/utils/interfaces';
import { SYNC_DATA_STATUS } from '../common/constants';

export interface IQuestion {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  question: string;
  answer: boolean;
  description: string;
  image: string;
  subjectId: string;
  arrange: number;
  original: boolean;
  subject: {
    name: string;
    id: string;
  },
}

export interface IQuestionSetting {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  sheetLink: string;
  lastReadRow: number;
  lastSyncDataAt?: Date;
  status?: SYNC_DATA_STATUS;
}

export interface IQuestionGetListQuery extends ICommonListQuery {
  subjectId?: string;
  arrange?: number;
}

export interface IUpdateQuestionSettingBody {
  sheetLink: string;
  lastReadRow: number;
}

export enum QuestionOrderBy {
  ARRANGE = 'arrange',
  SUBJECT = 'subject.name',
}