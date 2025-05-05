import yup from '@/plugins/yup';
import { emailSchema, shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';

const createAdminSchema = yup.object({
  name: shortStringSchema.required(),
  email: emailSchema.required().label('emailAddress'),
  role: yup.string().required().label('roleDesignation'),
  allowedIps: yup.string().trim().required().isIpList(),
  registeredBy: yup.string().optional().nullable(),
});

export const createAdminYupResolver = yupResolver(createAdminSchema);

export const updateAdminSchema = yup.object().shape({
  createdAt: yup.string().optional().nullable(),
  name: yup.string().optional().nullable(),
  status: yup.string().optional().nullable(),
  lastLoginAt: yup.string().optional().nullable(),
  role: yup.string().required().label('roleDesignation'),
  allowedIps: yup.string().trim().required().isIpList(),
  createdBy: yup.string().optional().nullable(),
  updatedAt: yup.string().optional().nullable(),
  updatedBy: yup.string().optional().nullable(),
});

export const updateAdminYupResolver = yupResolver(updateAdminSchema);

export const adminFilterSchema = yup.object({
  name: shortStringSchema.optional().nullable(),
  loginStatuses: yup.array(yup.string()).optional().nullable(),
  createdByIamUserId: yup.array(yup.number()).optional().nullable(),
});

export const adminFilterYupResolver = yupResolver(adminFilterSchema);
