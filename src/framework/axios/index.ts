import Axios from './entity/Axios'
import { IAxiosConfig } from './interface/IAxiosConfig'
import { Transform } from './entity/Transform'

const {
  requestHeaders,
  requestTimeout
} = require('config')

const {
  baseURL,
} = require('static/config');

const config: IAxiosConfig = {
  timeout: requestTimeout,
  transform: new Transform(),
  headers: requestHeaders,
  baseURL,
}

const axios = new Axios(config);

export function get<T>(url: string, params?: any): Promise<T> {
  return axios.get(url, params);
}

export function post<T>(url: string, params?: any): Promise<T> {
  return axios.post(url, params);
}

export default axios