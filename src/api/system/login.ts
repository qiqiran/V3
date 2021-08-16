import type { LoginParams, LoginResultModel } from "./model/loginModel"
import request, { get, post } from "#/axios";
import md5 from "js-md5";

enum Api {
  Login = '/PlatformAuthentication',
}

export function loginApi(params: LoginParams) {
  params.PW = md5(params.PW);
  // return post<LoginResultModel>(Api.Login, params);
  return new Promise<LoginResultModel>(
    resolve =>
      resolve({
        Admin: 1,
        KEY: "token",
        NM: "admin",
        Name: "管理员",
        TP: 100,
      })
  )
}