declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type RefType<T> = T | null;

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;

declare type Nullable<T> = T | null;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type Recordable<T = any> = Record<string, T>;

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

declare type EmitType = (event: string, ...args: any[]) => void;

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type TargetContext = '_self' | '_blank';
