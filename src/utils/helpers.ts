import dayjs from '@/plugins/dayjs';
import { intersection, isPlainObject, mapKeys, trim } from 'lodash';
import {
  AdminPermissions,
  AdminRole,
  BooleanFilterOption,
  RolePermissionConfig,
  SEPARATION,
  StringFilterOption,
} from './constants';
import { getProfileData } from './cookies';
import { v7 } from 'uuid';
import { IErrorItem } from './interfaces';

export function isJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
}

export function parseErrorMessage(t: any, message: string): string {
  console.log(message)
  const [tx, data] = message.split(SEPARATION);
  if (!data) {
    return t(tx);
  }
  const dataParsed = isJson(data) ? JSON.parse(data) : {};
  const path = t(`field.${dataParsed.path}`);
  return t(tx, { ...dataParsed, path });
  // return message
}

export function setFormErrors(form: any, errors: IErrorItem[]) {
  (errors ?? []).forEach((error) => {
    form.setError(error.errorField as any, {
      message: error.errorKey,
    });
  });
}

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
  try {
    JSON.stringify(obj);
  } catch {
    return false;
  }
  return true;
}

export function trimData(body: any): void {
  const trimValue = (item: any) => {
    mapKeys(item, (value, key) => {
      // trim string value
      if (typeof value === 'string') {
        item[key] = trim(value);
      }

      // iterate array
      else if (Array.isArray(value)) {
        value.forEach((subValue, index) => {
          // trim string value
          if (typeof subValue === 'string' && !trim(subValue as string)) {
            value[index] = trim(subValue);
          } else if (isPlainObject(subValue)) {
            trimValue(subValue);
          }
        });
      } else if (isPlainObject(value)) {
        trimValue(value);
      }
    });
  };

  trimValue(body);
}

export const transformDateField = (
  dateField?: {
    year?: number;
    month?: number;
    day?: number;
  },
  isConvertToUTC = true,
  format?: string,
  isToEndDay = false,
) => {
  if (!dateField?.year || !dateField?.month || !dateField?.day) return undefined;
  let date = dayjs()
    .set('date', dateField?.day)
    .set('month', dateField?.month - 1)
    .set('year', dateField?.year);
  if (isToEndDay) {
    date = date.endOf('day');
  } else {
    date = date.startOf('day');
  }
  if (isConvertToUTC) {
    date = date.utc();
  }

  if (format) {
    return date.format(format);
  }

  return date.toDate();
};

export const transformToDateField = (date: Date | string) => {
  if (!date) return undefined;

  return {
    year: dayjs(date).year(),
    month: dayjs(date).month() + 1,
    day: dayjs(date).date(),
  };
};

export const transformBooleanField = (field?: BooleanFilterOption | undefined) => {
  return field ? field === BooleanFilterOption.TRUE : undefined;
};

export const transformSearchRule = (value: any, searchRule: any) => {
  if (
    searchRule === StringFilterOption.NO_DATA ||
    searchRule === StringFilterOption.DATA_AVAILABLE
  ) {
    return searchRule;
  }
  return value ? (searchRule ?? undefined) : undefined;
};

export const transformNumberField = (value?: string | number) => {
  return value ? +value : undefined;
};

export const transformStringField = (value?: string) => {
  return value?.trim()?.length ? value.trim() : undefined;
};

export function checkPermissions(permissions: AdminPermissions[], p?: string): boolean {
  const _p = JSON.parse(p ?? '{}');
  const profile = getProfileData() ?? _p;
  const userRole = profile?.role;
  const rolePermissions = RolePermissionConfig[userRole as AdminRole] ?? [];
  return intersection(permissions, rolePermissions).length > 0;
}

export function getFileNameFromUrl(url: string): string {
  return url.split('/').pop() ?? '';
}

export const generateDeviceId = () => {
  // generate device id with uuidv7 to increase database index performance
  const deviceId = v7();
  return deviceId;
};

export function autoChooseStingFilterRule(
  stringKey: string,
  ruleKey: string,
  form: any,
  defaultRule = StringFilterOption.EQUAL,
) {
  const rule = form?.getValues(ruleKey);
  const value = form?.getValues(stringKey);
  if (value?.length && !rule) {
    form?.setValue(ruleKey, defaultRule);
  }
}

export function autoClearDataWhenChangeRule(
  stringKey: string,
  ruleKey: string,
  form: any,
  clearRules = [StringFilterOption.DATA_AVAILABLE, StringFilterOption.NO_DATA],
) {
  const rule = form?.getValues(ruleKey);
  const value = form?.getValues(stringKey);
  if (value?.length && clearRules.includes(rule)) {
    form?.setValue(stringKey, '');
  }
}

export function isDisabledInput(
  ruleKey: string,
  form: any,
  clearRules = [StringFilterOption.DATA_AVAILABLE, StringFilterOption.NO_DATA],
) {
  const rule = form?.getValues(ruleKey);
  return clearRules.includes(rule);
}

export async function downloadFileByLink(link: string, fileName: string) {
  const response = await fetch(link);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function checkEmptyObject(obj: any) {
  return Object.keys(obj).length === 0;
}

export function capitalizeUnicodeFirstLetter(str: string): string {
  if (!str) return "";
  const firstChar = [...str][0];
  const rest = [...str].slice(1).join('');
  const capitalized = firstChar.toLocaleUpperCase();
  return capitalized + rest;
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !isArray(value);
}

export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isNumber(value: any): boolean {
  return typeof value === 'number';
}
