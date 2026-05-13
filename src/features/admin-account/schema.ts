import yup from '@/plugins/yup';
import { emailSchema, shortStringSchema } from '@/plugins/yup/utils';
import { yupResolver } from '@hookform/resolvers/yup';

const updateAdminSchema = yup.object({
  name: shortStringSchema.required(),
  email: emailSchema.required().label('emailAddress'),
});

export const updateAdminYupResolver = yupResolver(updateAdminSchema);
