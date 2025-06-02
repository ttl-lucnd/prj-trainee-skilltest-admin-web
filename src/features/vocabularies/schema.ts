import yup from '@/plugins/yup';
import { shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';

export const vocabularyFilterSchema = yup.object({
  keyword: shortStringSchema.optional().nullable(),
  subjectIds: yup.array().of(shortStringSchema).optional().nullable(),
});

export const vocabularyFilterYupResolver = yupResolver(vocabularyFilterSchema);
