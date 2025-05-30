import yup from '@/plugins/yup';
import { shortStringSchema } from '@/plugins/yup/utils';
import { MAX_INTEGER, Regex } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';

const vocabularySettingSchema = yup.object({
  sheetLink: yup.string().matches(Regex.SHEET_URL, 'vocabularies.error.sheetLink').required(),
  lastReadRow: yup.number().min(1).max(MAX_INTEGER).required(),
});

export const vocabularySettingYupResolver = yupResolver(vocabularySettingSchema);

export const vocabularyFilterSchema = yup.object({
  keyword: shortStringSchema.optional().nullable(),
  subjectIds: yup.array().of(shortStringSchema).optional().nullable(),
});

export const vocabularyFilterYupResolver = yupResolver(vocabularyFilterSchema);
