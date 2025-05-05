export const SEPARATION = '|';

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_PROJECT = 422,
  ITEM_NOT_FOUND = 444,
  ITEM_ALREADY_EXIST = 445,
  ITEM_INVALID = 446,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  NETWORK_ERROR = 502,
}

export enum ErrorCode {
  IP_NOT_ALLOWED = 'ER_IpNotAllowed',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum OrderBy {
  ID = 'id',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
}

export enum SupportLanguage {
  EN = 'en',
  JA = 'ja',
}

export enum HeaderKey {
  ACCEPT_LANGUAGE = 'Accept-Language',
  CONTENT_TYPE = 'Content-Type',
  TIME_ZONE = 'X-Timezone',
  TIME_ZONE_NAME = 'X-Timezone-Name',
  AUTHORIZATION = 'Authorization',
  X_CLIENT_IP_ADDRESS = 'X-Client-IP-Address',
}

export enum PageRouter {
  LOGIN = '/login',
  GOOGLE_LOGIN_CALLBACK = '/login/google-login-callback',
  QUIZ_MANAGEMENT = '/quiz-management',
  WORD_MANAGEMENT = '/word-management',
  ADMIN_ACCOUNTS = '/admin-accounts',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'others',
}

export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_LIMIT = 100;
export const DEFAULT_LIMIT_FOR_DROPDOWN = 1000;
export const DEFAULT_ORDER_BY = OrderBy.CREATED_AT;
export const DEFAULT_ORDER_DIRECTION = OrderDirection.DESC;
export const DEBOUNCE_TIME = 300;
export const DEFAULT_GET_LIST_QUERY = {
  page: DEFAULT_FIRST_PAGE,
  limit: DEFAULT_LIMIT,
  orderBy: DEFAULT_ORDER_BY,
  orderDirection: DEFAULT_ORDER_DIRECTION,
};

export const ITEMS_PER_PAGE_200 = 200;
export const ITEMS_PER_PAGE_300 = 300;
export const ITEMS_PER_PAGE = [DEFAULT_LIMIT, ITEMS_PER_PAGE_200, ITEMS_PER_PAGE_300];

export enum DateFilterOption {
  MORE_THAN_OR_EQUAL = 'more_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  EQUAL = 'equal',
}

export enum NumberFilterOption {
  MORE_THAN_OR_EQUAL = 'more_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  EQUAL = 'equal',
  LESS_THAN = 'less_than',
}

export enum StringFilterOption {
  EQUAL = 'equal',
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
  NO_DATA = 'no_data',
  DATA_AVAILABLE = 'data_available',
}

export enum BooleanFilterOption {
  TRUE = 'true',
  FALSE = 'false',
}

export const MAX_IP_VALUE = 255;
export const INPUT_TEXT_MAX_LENGTH = 255;
export const TEXTAREA_MAX_LENGTH = 2000;
export const INPUT_PHONE_MAX_LENGTH = 15;
export const MAX_INTEGER = 2147483647;

export const Regex = {
  URI: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  NUMBER: /^\d*$/,
  PHONE: /^\d{1,15}$/,
  IPV4: /^(\d{1,3}\.){3}\d{1,3}$/,
  URL: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._~#=-]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_~#?&/=]*)/,
  APP_LINK: /^[a-zA-Z0-9-]+:\/\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/,
  // Check for complete HTML document
  DOCUMENT: /^<!DOCTYPE\s+html>/i,
  // Check for simple HTML tags using atomic groups
  TAG: /^(?:(?=<([a-z][a-z0-9]*))(?:(?!<\/\1>).)*<\/\1>)$/i,
};

export enum AccountType {
  PERFORMER = 'performer',
  USER = 'user',
}
export enum AdminRole {
  TIER1 = 'tier1',
  TIER2 = 'tier2',
  TIER3 = 'tier3',
  TIER4 = 'tier4',
}

export enum AdminPermissions {
  // Issue/Edit related
  AUTHORITY_ISSUE_EDIT = 'authority_issue_edit',

  // Settings related
  PRICE_TAX_SETTINGS = 'price_tax_settings',
  BONUS_POINTS_SETTINGS = 'bonus_points_settings',
  POINTS_SETTINGS = 'points_settings',

  // CSV Export
  EXPORT_CSV = 'export_csv',

  // Points Management
  MANAGE_PERFORMER_POINTS = 'manage_performer_points',
  MANAGE_USER_POINTS = 'manage_user_points',

  // Information Display
  VIEW_PERFORMER_INFO = 'view_performer_info',

  // General Features
  OTHER_GENERAL_FEATURES = 'other_general_features',
}

export const RolePermissionConfig = {
  [AdminRole.TIER1]: [
    AdminPermissions.AUTHORITY_ISSUE_EDIT,
    AdminPermissions.PRICE_TAX_SETTINGS,
    AdminPermissions.BONUS_POINTS_SETTINGS,
    AdminPermissions.POINTS_SETTINGS,
    AdminPermissions.EXPORT_CSV,
    AdminPermissions.MANAGE_PERFORMER_POINTS,
    AdminPermissions.MANAGE_USER_POINTS,
    AdminPermissions.VIEW_PERFORMER_INFO,
    AdminPermissions.OTHER_GENERAL_FEATURES,
  ],
  [AdminRole.TIER2]: [
    AdminPermissions.PRICE_TAX_SETTINGS,
    AdminPermissions.BONUS_POINTS_SETTINGS,
    AdminPermissions.POINTS_SETTINGS,
    AdminPermissions.EXPORT_CSV,
    AdminPermissions.MANAGE_PERFORMER_POINTS,
    AdminPermissions.MANAGE_USER_POINTS,
    AdminPermissions.VIEW_PERFORMER_INFO,
    AdminPermissions.OTHER_GENERAL_FEATURES,
  ],
  [AdminRole.TIER3]: [
    AdminPermissions.EXPORT_CSV,
    AdminPermissions.MANAGE_PERFORMER_POINTS,
    AdminPermissions.MANAGE_USER_POINTS,
    AdminPermissions.VIEW_PERFORMER_INFO,
    AdminPermissions.OTHER_GENERAL_FEATURES,
  ],
  [AdminRole.TIER4]: [AdminPermissions.OTHER_GENERAL_FEATURES],
};

export enum SupportImageContentType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_BMP = 'image/bmp',
}

export enum SupportAudioContentType {
  AUDIO_MP3 = 'audio/mpeg',
  AUDIO_WAV = 'audio/wav',
}

export enum SupportVideoContentType {
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
  VIDEO_OGG = 'video/ogg',
}

export enum SupportImageMimeType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_BMP = 'image/bmp',
}

export enum SupportAudioMimeType {
  AUDIO_MP3 = 'audio/mpeg',
  AUDIO_WAV = 'audio/wav',
}

export enum SupportVideoMimeType {
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
  VIDEO_OGG = 'video/ogg',
}

export enum SupportImageExtension {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
  BMP = 'bmp',
}

export enum SupportAudioExtension {
  MP3 = 'mp3',
  WAV = 'wav',
}

export enum SupportVideoExtension {
  MP4 = 'mp4',
  WEBM = 'webm',
  OGG = 'ogg',
}

export enum MediumType {
  THUMBNAIL = 'thumbnail',
  BACKGROUND = 'background',
  AUDIO = 'audio',
  GALLERY = 'gallery',
  ID_DOCUMENT = 'id_document',
}

export const INPUT_NUMBER_ALLOW_KEYS = ['v', 'c', 'a'];

export const CHARACTER_ZERO = '0';

export const DOT_ALLOW_CODES = ['Period'];

export const DIGIT_ALLOW_CODES = [
  // Character 0-9  in Numpad
  'Numpad0',
  'Numpad1',
  'Numpad2',
  'Numpad3',
  'Numpad4',
  'Numpad5',
  'Numpad6',
  'Numpad7',
  'Numpad8',
  'Numpad9',

  // Character 0-9
  'Digit0',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
];

export const VERSION_ALLOW_CODES = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '.',
];

export const INTEGER_ALLOW_CODES = [
  ...DIGIT_ALLOW_CODES,

  // Character control
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'Meta',
];

export const DECIMAL_ALLOW_CODES = [
  ...DIGIT_ALLOW_CODES,

  // Character decimal
  'NumpadDecimal',
  'Period',
  'Comma',

  // Character control
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'Meta',
];

export const DEFAULT_MAX_SIZE = 10; // MB

export const DATE_FORMAT = 'YYYY-MM-DD';

export enum DATE_TIME_FORMAT {
  YYYY_MM_HYPHEN = 'YYYY-MM',
  YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
  HH_MM_SS_CONLON = 'HH:mm:ss',
  YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON = 'YYYY-MM-DD HH:mm:ss',
  YYYY_MM_DD_HYPHEN_HH_MM_COLON = 'YYYY-MM-DD HH:mm',
  YYYY_MM_DD = 'YYYYMMDD',
  MM_DD_HYPHEN = 'MM-DD',
}

export enum AuthEventType {
  UNAUTHORIZED = 'unauthorized',
}

export const MIN_DATA_TABLE_ROW = 5;
