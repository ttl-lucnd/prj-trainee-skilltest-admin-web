import yup from '@/plugins/yup';
import { shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';

export const questionFilterSchema = yup.object({
  keyword: shortStringSchema.optional().nullable(),
  subjectIds: yup.array().of(shortStringSchema).optional().nullable(),
  arranges: yup.array().of(yup.number().min(1)).optional().nullable(),
});

export const questionFilterYupResolver = yupResolver(questionFilterSchema);
