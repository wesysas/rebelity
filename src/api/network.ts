import { ApiMethod, RebelityApi, IRebelityApi } from './api';
import * as superagent from 'superagent';
import { Request, Response } from 'superagent';
import { getToken } from '../utils/session';
//import { navigate } from '../navigationService';

const getResponse = (res: Response) => res.body;

const interceptor = (req: superagent.SuperAgentRequest) => {
  req.on('response', (res: Response) => {
    if (res.status === 401 && req.url.indexOf('/auth') < 0) {
      //navigate({ routeName: 'Login' });
    }
  });
};

const getObservable = (config: RebelityApi): Promise<any> => {
  const url = config.getUrl();
  const queryParams = config.getUrlParams();
  const data = config.getData();
  const method = config.getMethod();
  const headers: any = config.getHeaders();
  const agent = (superagent.agent() as any).use(
    (req: superagent.SuperAgentRequest) => interceptor(req)
  );

  const addHeaders = async (req: Request) => {
    const token: any = await getToken();
    
    if (headers) {
      req.set(headers);
    }

    if (config.isProtected()) {
      req.set('Authorization', 'Bearer ' + token);
    }

    return req;
  };

  switch (method) {
    case ApiMethod.GET:
      return addHeaders(agent.get(url).query(queryParams)).then(getResponse);
    case ApiMethod.POST:
      if (headers['Content-Type'] == 'multipart/form-data') {
        const mutipartReq = agent.post(url);

        Object.keys(data).forEach(key => {
          mutipartReq.field(key, data[key]);
        });

        return addHeaders(mutipartReq).then(getResponse);
      } else {
        return addHeaders(agent.post(url).send(data)).then(getResponse);
      }

    case ApiMethod.PUT:
      return addHeaders(
        agent
          .put(url)
          .query(queryParams)
          .send(data)
      ).then(getResponse);
    case ApiMethod.PATCH:
      return addHeaders(agent.patch(url).send(data)).then(getResponse);
    case ApiMethod.DELETE:
      return addHeaders(agent.delete(url)).then(getResponse);
    default:
      return new Promise<Error>(() => new Error('Api method not recognised'));
  }
};

export const request = (options: IRebelityApi) => {
  const ApiConfig = new RebelityApi(options);

  return getObservable(ApiConfig);
};
