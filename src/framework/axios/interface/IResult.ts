import type { AxiosResponse } from 'axios';

export interface IResult<T = any> extends AxiosResponse {
  tp: number;
  type?: 'success' | 'error' | 'warning';
  msg: string;
  re: T;
}