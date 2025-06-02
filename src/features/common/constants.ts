import { DEFAULT_LIMIT, OrderBy, OrderDirection } from '@/utils/constants';

import { DEFAULT_FIRST_PAGE } from '@/utils';

export enum PopulationDensityCategory {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum FileResourceType {
  USER_AVATAR = 'user_avatar',
  USER_GALLERY = 'user_gallery',
  PERFORMER_AVATAR = 'performer_avatar',
  PERFORMER_GALLERY = 'performer_gallery',
  PERFORMER_VOICE = 'performer_voice',
  ADMIN_SCHEDULED_NOTIFICATION = 'admin_scheduled_notification',
  ADMIN_BANNER = 'admin_banner',
  ADMIN_ITEM_PRICES = 'admin_item_prices',
}

export enum AdminAdjustPointRecipientType {
  USER = 'user',
  PERFORMER = 'performer',
}

export enum AdminAdjustPointActionType {
  ADD = 'add',
  SUBTRACT = 'subtract',
}

export enum PointType {
  NORMAL = 'normal',
  BONUS = 'bonus',
}

export const adminPointAdjustmentsGetListQuery = {
  page: DEFAULT_FIRST_PAGE,
  limit: DEFAULT_LIMIT,
  orderBy: OrderBy.CREATED_AT,
  orderDirection: OrderDirection.DESC,
};

export enum SYNC_DATA_STATUS {
  PENDING = 'pending',
  COMPLETE = 'complete',
  PERMISSION_DENIED = 'permission_denied',
  SERVER_ERROR = 'server_error',
};