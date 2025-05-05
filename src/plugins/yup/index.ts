import * as yup from 'yup';
import yupLocale from './locale';
import { MAX_IP_VALUE, Regex } from '@/utils/constants';
import { SupportFileMimeType } from '@/utils/file.constants';

// Set locale
yup.setLocale(yupLocale);

// Add custom methods
yup.addMethod(yup.string, 'isEmail', function () {
  return this.test({
    message: (data) => {
      return `yup.string.email|${JSON.stringify(data)}`;
    },
    test: function (value) {
      return !value || Regex.EMAIL.test(value.toLocaleLowerCase());
    },
  });
});

yup.addMethod(yup.string, 'isPhoneNumber', function () {
  return this.test({
    message: (data) => {
      return `yup.string.phoneNumber|${JSON.stringify(data)}`;
    },
    test: function (value) {
      return !value || Regex.PHONE.test(value.toLocaleLowerCase());
    },
  });
});

yup.addMethod(yup.string, 'isIpList', function () {
  return this.test({
    message: (data) => {
      return `yup.string.isIpList|${JSON.stringify(data)}`;
    },
    test: function (value) {
      if (!value) return false;
      const ips = value.split(',').map((ip) => ip.trim());
      return ips.every((ip) => {
        if (!Regex.IPV4.test(ip)) return false;
        return ip.split('.').every((num) => {
          const n = parseInt(num, 10);
          return n >= 0 && n <= MAX_IP_VALUE;
        });
      });
    },
  });
});

yup.addMethod(yup.string, 'isUrl', function () {
  return this.test({
    message: (data) => {
      return `yup.string.isUrl|${JSON.stringify(data)}`;
    },
    test: function (value) {
      return !value || Regex.URL.test(value.toLocaleLowerCase());
    },
  });
});

yup.addMethod(yup.string, 'isAppLink', function () {
  return this.test({
    message: (data) => {
      return `yup.string.isUrl|${JSON.stringify(data)}`;
    },
    test: function (value) {
      return !value || Regex.APP_LINK.test(value.toLocaleLowerCase());
    },
  });
});

yup.addMethod(yup.string, 'isHTML', function () {
  return this.test({
    message: (data) => {
      return `yup.string.isHTML|${JSON.stringify(data)}`;
    },
    test: function (value) {
      if (!value) return true;

      // Check if it's a complete HTML document
      if (Regex.DOCUMENT.test(value)) {
        return true;
      }

      // Check if it's a simple HTML tag
      if (Regex.TAG.test(value)) {
        return true;
      }
      return false;
    },
  });
});

yup.addMethod(yup.number, 'pointPositive', function () {
  return this.test({
    message: (data) => {
      return `yup.number.pointPositive|${JSON.stringify(data)}`;
    },
    test: function (value) {
      return value !== undefined && value > 0;
    },
  });
});

yup.addMethod(yup.mixed, 'imageFileType', function () {
  return this.test({
    message: (data) => {
      return `yup.mixed.imageFileType|${JSON.stringify(data)}`;
    },
    test: function (value: any) {
      const ext = value?.split('.').pop();
      return ['png', 'jpg', 'jpeg', 'gif'].includes(ext as SupportFileMimeType);
    },
  });
});
export default yup;
