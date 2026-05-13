export enum SupportFileContentType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_BMP = 'image/bmp',
  AUDIO_MP3 = 'audio/mpeg',
  AUDIO_WAV = 'audio/wav',
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
  VIDEO_OGG = 'video/ogg',
  IMAGE_GIF = 'image/gif',
}

export enum SupportFileMimeType {
  IMAGE_PNG = 'image/png',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_BMP = 'image/bmp',
  AUDIO_MP3 = 'audio/mpeg',
  AUDIO_WAV = 'audio/wav',
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
  VIDEO_OGG = 'video/ogg',
  VIDEO_MKV = 'video/mkv',
  IMAGE_GIF = 'image/gif',
}

export enum SupportFileExtension {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
  BMP = 'bmp',
  MP3 = 'mp3',
  WAV = 'wav',
  MP4 = 'mp4',
  WEBM = 'webm',
  OGG = 'ogg',
  GIF = 'gif',
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

export enum SignUrlAction {
  WRITE = 'write',
  READ = 'read',
}

export const ImageExtensions = [
  SupportFileExtension.PNG,
  SupportFileExtension.JPEG,
  SupportFileExtension.JPG,
  SupportFileExtension.BMP,
  SupportFileExtension.GIF,
];

export const VideoExtensions = [
  SupportFileExtension.MP4,
  SupportFileExtension.WEBM,
  SupportFileExtension.OGG,
];

export const AudioExtensions = [SupportFileExtension.MP3, SupportFileExtension.WAV];

export const ImageMimeTypes = [
  SupportFileMimeType.IMAGE_PNG,
  SupportFileMimeType.IMAGE_JPEG,
  SupportFileMimeType.IMAGE_BMP,
  SupportFileMimeType.IMAGE_GIF,
];

export const VideoMimeTypes = [
  SupportFileMimeType.VIDEO_MP4,
  SupportFileMimeType.VIDEO_WEBM,
  SupportFileMimeType.VIDEO_OGG,
];

export const AudioMimeTypes = [
  SupportFileMimeType.AUDIO_MP3,
  SupportFileMimeType.AUDIO_WAV,
];

export enum FileSize {
  THUMBNAIL = 'thumbnail',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
