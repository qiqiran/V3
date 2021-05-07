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

const { get, post } = axios;
export { get, post }
export default axios