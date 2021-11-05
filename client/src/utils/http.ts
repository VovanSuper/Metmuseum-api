import axios, { AxiosResponse } from 'axios';
import { IObjectInfoBase } from '../models/IObject';

const requestSvc = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getAvailableObjectsIdsHttp = async () =>
  requestSvc.get('objects').then((resp: AxiosResponse<{ objects: { total: number; objectIDs: number[] } }>) => resp.data.objects);

export const getObjectHttp = async ({ id }: { id: number }): Promise<IObjectInfoBase> => {
  const response = await requestSvc.get(`objects/${id}`);
  const obj = response.data;
  return obj['object'];
};
