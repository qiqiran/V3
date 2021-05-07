import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { IAxiosConfig } from 'src/framework/axios/interface/IAxiosConfig';
import { isFunction } from 'src/utils/is'
import { IResult } from '../interface/IResult';

class Axios {
  private axiosInstance: AxiosInstance;
  private axiosConfig: IAxiosConfig;

  constructor(config: IAxiosConfig) {
    this.axiosConfig = config;
    this.axiosInstance = axios.create(config);
    this.setupInterceptors();
  }

  /**
   * @description:  创建axios实例
   */
  private createAxios(config: IAxiosConfig): void {
    this.axiosConfig = config;
    this.axiosInstance = axios.create(config);
    this.setupInterceptors();
  }

  /**
   * @description: 重新配置axios
   */
  configAxios(config: IAxiosConfig) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: 获取axios实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: 
   */
  private getTransform() {
    const { transform } = this.axiosConfig;
    return transform;
  }

  /**
   * @description: 设置通用header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) return;

    const {
      requestInterceptor,
      requestInterceptorCatch,
      responseInterceptor,
      responseInterceptorCatch,
    } = transform;

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(
      config => {
        if (requestInterceptor && isFunction(requestInterceptor)) {
          config = requestInterceptor(config);
        }
        return config;
      }
    );

    // 请求拦截器错误捕获
    requestInterceptorCatch &&
      isFunction(requestInterceptorCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorCatch);

    // 响应拦截器配置处理
    this.axiosInstance.interceptors.response.use(
      response => {
        if (responseInterceptor && isFunction(responseInterceptor)) {
          response = responseInterceptor(response);
        }
        return response;
      }
    );

    // 响应拦截器错误捕获
    responseInterceptorCatch &&
      isFunction(responseInterceptorCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorCatch);
  }

  // 初始化注入的是拦截器，做特定拦截处理，下边重载作为项目应用
  request<T = any, R = IResult<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance.request(config).then((response: AxiosResponse<R>) => {
      const data = response.data;
      return data;
    })
  }

  // axios会将params的参数拼接到url
  get<T = any, R = IResult<T>>(url: string, params: any): Promise<T> {
    return this.request({
      url,
      params,
      method: "GET",
    });
  }

  post<T = any, R = IResult<T>>(url: string, data: any): Promise<T> {
    return this.request({
      url,
      data,
      method: "POST"
    });
  }
}

export default Axios;