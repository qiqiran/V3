import type { GetMEParams, GetMEResultModel } from "./model"

import request, { get, post } from "#/axios";
import { userStore } from "src/framework/store/modules/system/user";

enum Api {
  GetMEData = 'GetOnePeriodData',
}

export function GetMEDataApi({ ID, ME, ST , ET , INTV }: GetMEParams) {
  const { NM, KEY } = userStore.getUserInfoState;

  return get<GetMEResultModel>(`${Api.GetMEData}/${NM}/${KEY}/${ID}/${ME}/${ST}/${ET}/${INTV}`);
}