import { join } from 'path';
import { config as dotEnvConf } from 'dotenv';

export interface IConfig {
  SKIP_PREFLIGHT_CHECK: string;
  PORT: string;
  REDIS_PORT: string;
  REDIS_NET_NAME: string;
  REDIS_PASS: string;
  REDIS_DB: string;
  REDIS_OBJECTS_IDS_KEY: string;
}

export const defaultConfig: IConfig = {
  ...(dotEnvConf({ path: join(__dirname, '../../../.env') }).parsed as unknown as IConfig),
};

export const parseStringToModel = <T>(objString: string | null): T | null => (objString?.length ? <T>JSON.parse(objString) : null);
