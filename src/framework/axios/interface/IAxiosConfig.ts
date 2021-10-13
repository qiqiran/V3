import { AxiosRequestConfig } from 'axios';
import { ITransform } from './ITransform';

export interface IAxiosConfig extends AxiosRequestConfig {
  transform?: ITransform;
}
