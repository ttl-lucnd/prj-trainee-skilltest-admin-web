import { ICommonListQuery } from '@/utils/interfaces';
import { SYNC_DATA_STATUS } from '../common/constants';

export enum TranslateLanguages {
  EN = 'en',
  VI = 'vi',
}

export type TranslatedContent = {
  originalLanguage: string;
} & {
  [key in TranslateLanguages]: string;
};

export interface IVocabulary {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  vocabulary: TranslatedContent,
  subjectId: string,
  pronunciation: string,
  description: TranslatedContent,
  image?: string;
  subject?: {
    name: string,
    id: string,
  },
}

export interface IVocabularySetting {
  id: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  sheetLink: string,
  lastReadRow: number,
  lastSyncDataAt?: Date;
  status?: SYNC_DATA_STATUS;
}

export interface IVocabularyGetListQuery extends ICommonListQuery {
  subjectId?: string;
}

export interface IUpdateVocabularySettingBody {
  sheetLink: string;
  lastReadRow: number;
}

const meaningOrderBy = Object.fromEntries(
  Object.entries(TranslateLanguages).map(([key, lang]) => [
    `MEANING_${key}`,
    `vocabulary.${lang}`,
  ]),
) as Record<`MEANING_${keyof typeof TranslateLanguages}`, string>;

export const VocabularyOrderBy = {
  ...meaningOrderBy,
  VOCABULARY: 'vocabulary.originalLanguage',
  PRONUNCIATION: 'pronunciation',
} as const;