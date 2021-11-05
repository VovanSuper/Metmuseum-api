import { useState } from 'react';

export const CURRENT_SLIDE_KEY_NAME = 'current_slide';
export const CURRENT_SLIDES_IDS = 'slide_ids';

const useLocalStorage = <T>(key: string, iniValue: T) => {
  const [storedVal, setStoredVal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return !!item ? JSON.parse(item) : (iniValue as T);
    } catch (error) {
      console.log(error);
      return iniValue as T;
    }
  });

  const setValue = (val: T) => {
    const valToStore = JSON.stringify(val);
    window.localStorage.setItem(key, valToStore);
    setStoredVal(valToStore);
  };

  const emptyValue = () => {
    window.localStorage.removeItem(key);
  };

  return [storedVal, setValue, emptyValue] as [T, (val: T) => void, () => void];
};

export default useLocalStorage;
