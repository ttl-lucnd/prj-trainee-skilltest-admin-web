declare module 'yup' {
  interface StringSchema {
    trimmed(): StringSchema<TType, TContext>;
    password(): StringSchema<TType, TContext>;
    isEmail(): StringSchema;
    isIpList(): StringSchema;
    isUrl(): StringSchema;
    isAppLink(): StringSchema;
    isPhoneNumber(): StringSchema;
    isHTML(): StringSchema;
  }
  interface NumberSchema {
    pointPositive(): NumberSchema;
  }
  interface MixedSchema {
    imageFileType(): MixedSchema<any>;
  }
}

export {};
