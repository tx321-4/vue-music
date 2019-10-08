import {commonParams} from './config';
import axios from 'axios';

export function getMusic (mid) {
  const url = '/api/music';
  const data = Object.assign({}, commonParams, {

    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    data: {
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: {
          guid: '908480640',
          calltype: 0,
          userip: ''
        }
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '908480640',
          songmid: [mid],
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20'
        }
      },
      comm: {
        uin: '0',
        format: 'json',
        ct: 24,
        cv: 0
      }
    }
  });

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
