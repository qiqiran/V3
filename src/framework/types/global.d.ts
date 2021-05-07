declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type Nullable<T> = T | null;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type Recordable<T extends any = any> = Record<string, T>;