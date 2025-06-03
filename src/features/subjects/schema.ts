import yup from '@/plugins/yup';
import { shortStringSchema } from '@/plugins/yup/utils';
import { MAX_INTEGER } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISubjectFormBody } from './interfaces';

const createSubjectSchema = yup.object({
  name: shortStringSchema.required().label('subject'),
  monthlyFee: yup.number().min(0).max(MAX_INTEGER).required(),
  logo: yup.string().optional(),
  image: yup.string().optional(),
});

export const createSubjectYupResolver = yupResolver<ISubjectFormBody>(createSubjectSchema);