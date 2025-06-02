import { ICommonListQuery } from '@/utils/interfaces';

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

export interface IQuestionGetListQuery extends ICommonListQuery {
  subjectId?: string;
  arrange?: number;
}

export enum QuestionOrderBy {
  ARRANGE = 'arrange',
  SUBJECT = 'subject.name',
}