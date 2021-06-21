import type { LoginParams, LoginResultModel } from "./model/loginModel"
import request, { get, post } from "#/axios";
import md5 from "js-md5";

enum Api {
  Login = '/PlatformAuthentication',
}

export function loginApi(params: LoginParams) {
  params.PW = md5(params.PW);
  return post<LoginResultModel>(Api.Login, params);
}