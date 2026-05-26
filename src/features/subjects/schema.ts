import yup from '@/plugins/yup';
import { longStringSchema, shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPackageFormBody, ISubjectFormBody } from './interfaces';
import { MAX_INTEGER, SubscriptionPlatform } from '@/utils';

const createSubjectSchema = yup.object({
  name: shortStringSchema.required().label('subject'),
  logo: yup.string().optional(),
  image: yup.string().optional(),
});

export const createSubjectYupResolver = yupResolver<ISubjectFormBody>(createSubjectSchema);

const createPackageSchema = yup.object({
  name: shortStringSchema.required().label('packageName'),
  price: yup.number().min(1).max(MAX_INTEGER).required(),
  subjectId: shortStringSchema.required(),
  durationDays: yup.number().min(1).max(MAX_INTEGER).required(),
  platform: shortStringSchema.required().oneOf(Object.values(SubscriptionPlatform)),
  productId: shortStringSchema.required(),
  description: longStringSchema.optional(),
});

export const createPackageYupResolver = yupResolver<IPackageFormBody>(createPackageSchema);