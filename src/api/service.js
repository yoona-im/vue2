import http from './http.js';
const pre_fix = 'api/conf.';
export const queryConfList = params => {
    return http.post(pre_fix + 'confRpcService/pageList', [params]);
}