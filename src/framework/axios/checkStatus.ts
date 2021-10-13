import { error } from 'src/hooks/web/useMessage';
import { NetworkErrorEnum } from './enum';

export function checkErrorCode(status: number, msg: string): void {
  switch (status) {
    case 400:
      error(`400${msg}`);
      break;
    case 401:
      error(NetworkErrorEnum.code401);
      break;
    case 403:
      error(NetworkErrorEnum.code403);
      break;
    // 404请求不存在
    case 404:
      error(NetworkErrorEnum.code404);
      break;
    case 405:
      error(NetworkErrorEnum.code405);
      break;
    case 408:
      error(NetworkErrorEnum.code408);
      break;
    case 500:
      error(NetworkErrorEnum.code500);
      break;
    case 501:
      error(NetworkErrorEnum.code501);
      break;
    case 502:
      error(NetworkErrorEnum.code502);
      break;
    case 503:
      error(NetworkErrorEnum.code503);
      break;
    case 504:
      error(NetworkErrorEnum.code504);
      break;
    case 505:
      error(NetworkErrorEnum.code505);
      break;
  }
}
