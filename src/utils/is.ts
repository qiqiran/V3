const toString = Object.prototype.toString;

/**
 * @description 数据类型判别
 * @param val 数据
 * @param type 类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
// val is Record<any, any> 是抄的，我没看懂
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isUrl(path: string): boolean {
  const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  return reg.test(path);
}
