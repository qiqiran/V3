import { cacheCipher } from 'src/settings/encryptionSetting';

import type { EncryptionParams } from 'src/utils/cipher';

import { getCookie, setCookie } from "src/utils/helper/cookieHelper";

import { AesEncryption } from 'src/utils/cipher';

export interface CreateCookieStoreParams extends EncryptionParams {
  prefixKey: string;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}
export const createCookieStore = ({
  prefixKey = '',
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateCookieStoreParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /**
   *Cache class
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;
    /**
     *
     */
    constructor() {
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${this.hasEncrypt ? this.encryption.encryptByAES(key) : key}`.toUpperCase();
    }

    /**
     * Set cookie
     * @param {string} key
     * @param {*} value
     * @expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify(value);
console.log("set cookie");

      const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
      setCookie(this.getKey(key), stringifyValue, expire)
    }

    /**
     * Read cookie
     * @param {string} key
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = getCookie(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        console.log(data);
        
        return data;
      } catch (e) {
        return def;
      }
    }

    /**
     * Delete cookie on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      setCookie(this.getKey(key), null, 0);
    }
  };
  return new WebStorage();
};