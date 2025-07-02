import yup from '@/plugins/yup';
import { shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { IQuestionFormBody, MAX_ARRANGE } from './interfaces';

export const questionFilterSchema = yup.object({
  keyword: shortStringSchema.optional().nullable(),
  subjectIds: yup.array().of(shortStringSchema).optional().nullable(),
  arranges: yup.array().of(yup.number().min(1)).optional().nullable(),
});

export const questionFilterYupResolver = yupResolver(questionFilterSchema);

const updateQuestionSchema = yup.object({
  question: shortStringSchema.required().label('question'),
  description: shortStringSchema.required().label('romaji'),
  subjectId: shortStringSchema.required().label('subject'),
  arrange: yup
    .number()
    .transform((_, originalValue) => {
      const parsed = parseInt(originalValue, 10);
      return isNaN(parsed) ? undefined : parsed;
    })
    .required()
    .min(1)
    .max(MAX_ARRANGE)
    .label('arrange'),

  original: yup
    .boolean()
    .transform((_, originalValue) => originalValue === 'true')
    .required()
    .label('original'),

  answer: yup
    .boolean()
    .transform((_, originalValue) => originalValue === 'true')
    .required()
    .label('answer'),

  image: yup.string().optional().label('image'),
});

export const updateQuestionYupResolver = yupResolver<IQuestionFormBody>(updateQuestionSchema);
