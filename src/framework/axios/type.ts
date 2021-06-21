export type RequestMethod<T, R = IResult<T>> = (url: string, params: any) => Promise<R>;

export interface IResult<T = any> {
  tp: number;
  type?: 'success' | 'error' | 'warning';
  msg: string;
  re: T;
}

// interface IResult<T = any> {
//   code: number;
//   type: 'success' | 'error' | 'warning';
//   message: string;
//   result: T;
// }