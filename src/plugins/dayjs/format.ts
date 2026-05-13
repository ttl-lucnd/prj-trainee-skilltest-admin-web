import { PluginFunc } from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    fmYYYYMMDD(separator?: string): string;
    fmYYYYMMDDHHmmss(separator?: string): string;
    fmYYYYMMDDHHmm(separator?: string): string;
    fmHHmmss(separator?: string): string;
    fmHHmm(separator?: string): string;
  }
}

export const displayPlugin: PluginFunc = (_, dayjsClass) => {
  dayjsClass.prototype.fmYYYYMMDD = function (separator = '/') {
    return this.format(`YYYY${separator}MM${separator}DD`);
  };
  dayjsClass.prototype.fmYYYYMMDDHHmmss = function (separator = '/') {
    return this.format(`YYYY${separator}MM${separator}DD HH:mm:ss`);
  };
  dayjsClass.prototype.fmYYYYMMDDHHmm = function (separator = '/') {
    return this.format(`YYYY${separator}MM${separator}DD HH:mm`);
  };
  dayjsClass.prototype.fmHHmmss = function (separator = ':') {
    return this.format(`HH${separator}mm${separator}ss`);
  };
  dayjsClass.prototype.fmHHmm = function (separator = ':') {
    return this.format(`HH${separator}mm`);
  };
};
