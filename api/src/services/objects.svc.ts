import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IObjectInfoBase, IObjects } from '../Models';
import ApiError from '../utils/Error';
import { defaultConfig } from '../utils/helpers';
import logger from '../utils/logger';
import cacheSvc from './redis.svc';

const { err } = logger;
const $http: AxiosInstance = axios.create({
  baseURL: process.env.MET_MUS_API_URL,
});

export default class {
  static getAllObjects(): Promise<IObjects> {
    return $http
      .get<IObjects>('')
      .then(async (response: AxiosResponse) => {
        if (response.status !== 200) {
          throw ApiError.BadRequest('Something went wrong..!');
        }
        const objectIDs = response.data as IObjects;
        const setToCacheResult = await cacheSvc.set(defaultConfig.REDIS_OBJECTS_IDS_KEY, objectIDs);
        logger.l(`Trying to all ObjectsIDs to Cache ... result: ${setToCacheResult === 'OK' ? 'Success' : 'Failed!'}`);

        return objectIDs;
      })
      .catch((error: AxiosError) => {
        if (error['code'] == 'ETIMEDOUT') err(error.message);
        throw error;
      });
  }

  static async getObject(id: number | string) {
    try {
      const response = await $http.get<IObjectInfoBase>(`/${id}`);
      if (response.status !== 200) {
        throw ApiError.BadRequest('Something went wrong..!');
      }
      const data = response.data;
      const setToCacheResult = await cacheSvc.set(id.toString(), data);
      logger.l(`Trying to set value for key ${id} to Cache ... result: ${setToCacheResult === 'OK' ? 'Success' : 'Failed!'}`);

      return data;
    } catch (error: unknown) {
      if ((<AxiosError>error).code === 'ETIMEDOUT') {
        err((<AxiosError>error).message);
      }
      throw error;
    }
  }
}
