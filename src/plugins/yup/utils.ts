import { INPUT_TEXT_MAX_LENGTH, TEXTAREA_MAX_LENGTH } from '@/utils/constants';
import yup from '.';

export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
  phone: /^\d{10}$/,
  username: /^\w+$/,
};

export const validateTrim = (value: string) => {
  if (value && value.trim() !== value) {
    return false;
  }
  return true;
};

export const emailSchema = yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).isEmail();

export const shortStringSchema = yup.string().max(INPUT_TEXT_MAX_LENGTH);

export const longStringSchema = yup.string().trim().max(TEXTAREA_MAX_LENGTH);

export const ipListSchema = yup.string().trim().isIpList();
