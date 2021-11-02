import axios, { AxiosResponse } from 'axios';
import { IObjectInfoBase } from '../Models';
import ApiError from '../utils/Error';
import logger from '../utils/logger';
import cacheSvc from './redis.svc';

const $http = axios.create({
  baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1/objects',
});

export default class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  static getAllObjects(): Promise<IObjectInfoBase[]> {
    return $http
      .get<IObjectInfoBase[]>('')
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw ApiError.BadRequest('Something went wrong..!');
        }
        return response.data as Array<IObjectInfoBase>;
      })
      .catch((error: Error) => {
        logger.err(error.message);
        throw error;
      });
  }

  static async getObject(id: number | string) {
    try {
      const response = await $http.get<IObjectInfoBase>(`/${id}`);
      if (response.status !== 200) {
        throw ApiError.BadRequest('Something went wrong..!');
      }
      const setToCacheResult = await cacheSvc.set(id.toString(), response.data);
      logger.l(`Trying to set value for key ${id} to Cache ... result: ${setToCacheResult === 'OK' ? 'Success' : 'Failed!'}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) logger.err(error);
      throw error;
    }
  }
}
