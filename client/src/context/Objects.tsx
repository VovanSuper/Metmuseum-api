import React, { createContext, ReactNode } from "react";
import axios from "axios";
import { IObjectInfoBase } from '../models/IObject';

const requestSvc = axios.create({
  baseURL: 'http://localhost:8088'
});

interface CtxProps {
  getObject: ({ id }: { id: number; }) => Promise<IObjectInfoBase>;
}

const ObjectsCtx = createContext<CtxProps>({} as CtxProps);

const ObjectsProvider = ({ children }: { children: ReactNode; }) => {

  const getObject = async ({ id }: { id: number; }): Promise<IObjectInfoBase> => {
    const response = await requestSvc.get(`objects/${id}`);
    const obj = response.data;
    return obj['object'];
  };

  return <ObjectsCtx.Provider value={{ getObject }} >{children}</ObjectsCtx.Provider>;
};

export { ObjectsCtx };
export default ObjectsProvider;