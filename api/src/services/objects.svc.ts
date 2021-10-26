import axios, { AxiosResponse } from 'axios';
import { IObjectInfoBase, IObjects } from '../types';
import ApiError from '../utils/Error';
import logger from '../utils/logger';

const $http = axios.create({
  baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1/objects'
});


export default class {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  static getAllObjects() {
    return $http.get<IObjects>('')
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw ApiError.BadRequest('Something went wrong..!');
        }
        return response.data;
      })
      .catch((error: Error) => {
        logger.err(error.message);
        throw error;
      });
  }

  static getObject(id: number | string) {
    return $http.get<IObjectInfoBase>(`/${id}`)
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw ApiError.BadRequest('Something went wrong..!');
        }
        return response.data;
      })
      .catch((error: Error) => {
        logger.err(error.message);
        throw error;
      });
  }
}
