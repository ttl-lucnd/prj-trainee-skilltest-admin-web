import yup from '@/plugins/yup';
import { shortStringSchema } from '@/plugins/yup/utils';
import { Regex } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';

const questionSettingSchema = yup.object({
  sheetLink: yup.string().matches(Regex.SHEET_URL, 'questions.error.sheetLink').required(),
  lastReadRow: yup.number().min(1).required(),
});

export const questionSettingYupResolver = yupResolver(questionSettingSchema);

export const questionFilterSchema = yup.object({
  keyword: shortStringSchema.optional().nullable(),
  subjectIds: yup.array().of(shortStringSchema).optional().nullable(),
  arranges: yup.array().of(yup.number().min(1)).optional().nullable(),
});

export const questionFilterYupResolver = yupResolver(questionFilterSchema);
