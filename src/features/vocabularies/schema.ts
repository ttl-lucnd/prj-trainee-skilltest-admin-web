import yup from '@/plugins/yup';
import { longStringSchema, shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { IVocabularyFormBody } from './interfaces';

export const vocabularyFilterSchema = yup.object({
  keyword: shortStringSchema.optional().nullable(),
  subjectIds: yup.array().of(shortStringSchema).optional().nullable(),
});

export const vocabularyFilterYupResolver = yupResolver(vocabularyFilterSchema);

const updateVocabularySchema = yup.object({
  vocabulary: shortStringSchema.required().label('vocabulary'),
  pronunciation: shortStringSchema.required().label('pronunciation'),
  description: longStringSchema.required().label('description'),
  subjectId: shortStringSchema.required().label('subject'),
  image: yup.string().optional().label('image'),
});

export const updateVocabularyYupResolver = yupResolver<IVocabularyFormBody>(updateVocabularySchema);