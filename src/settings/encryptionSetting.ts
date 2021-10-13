import { isDevMode } from 'src/utils/env';

// 系统默认缓存时间（以秒为单位）
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes加密密钥 (the key and iv must be 16 bits)
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// 系统缓存是否使用aes加密（开发模式下不加密）
export const enableStorageEncryption = !isDevMode();
