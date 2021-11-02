import { join } from 'path';
import { config as dotEnvConf } from 'dotenv';
import { IObjectInfoBase } from '../Models';

export interface IConfig {
  SKIP_PREFLIGHT_CHECK: string;
  PORT: string;
  REDIS_PORT: string;
  REDIS_NET_NAME: string;
  REDIS_PASS: string;
  REDIS_DB: string;
}

export const defaultConfig: IConfig = {
  ...(dotEnvConf({ path: join(__dirname, '../../../.env') }).parsed as unknown as IConfig),
};

export const parseStringToModel = (objString: string | null): IObjectInfoBase | null => (objString?.length ? <IObjectInfoBase>JSON.parse(objString) : null);
