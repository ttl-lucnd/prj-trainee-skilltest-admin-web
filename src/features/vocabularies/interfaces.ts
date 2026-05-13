import { ICommonListQuery } from '@/utils/interfaces';

export enum TranslateLanguages {
  EN = 'en',
  ZH = 'zh',
  KO = 'ko',
  VI = 'vi',
  ID = 'id',
  TL = 'tl',
  TH = 'th',
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

export interface IVocabularyGetListQuery extends ICommonListQuery {
  subjectId?: string;
}

const meaningOrderBy = Object.fromEntries(
  Object.entries(TranslateLanguages).map(([key, lang]) => [
    `VOCABULARY_${key}`,
    `vocabulary.${lang}`,
  ]),
) as Record<`MEANING_${keyof typeof TranslateLanguages}`, string>;

export const VocabularyOrderBy = {
  ...meaningOrderBy,
  VOCABULARY_ORIGINALLANGUAGE: 'vocabulary.originalLanguage',
  PRONUNCIATION: 'pronunciation',
} as const;

export interface IVocabularyFormBody {
  vocabulary: string;
  pronunciation: string;
  description: string;
  subjectId: string;
  image?: string;
}