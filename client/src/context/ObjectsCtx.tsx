import React, { createContext, ReactNode, useRef, useEffect, useState } from 'react';
import useLocalStore, { CURRENT_SLIDES_IDS, CURRENT_SLIDE_KEY_NAME } from '../hooks/useLocalStore';
import useInterval from '../hooks/useInterval';
import { IObjectInfoBase } from '../models/IObject';
import { getAvailableObjectsIdsHttp, getObjectHttp } from '../utils/http';

export interface CtxProps {
  currentObject: IObjectInfoBase;
  startTimer: () => void;
  stopTimer: () => void;
}

const TIMER_TIMEOUT = 5000;

const ObjectsCtx = createContext<CtxProps>({} as CtxProps);

const ObjectsProvider = ({ children }: { children: ReactNode }) => {
  console.log('Render ObjectsProvider !!!');

  const [currentObjectIDs, setCurrentObjectIDs] = useState<number[]>([]);
  const [currentObjIndex, setCurrentObjIndex] = useState<number>(0);
  const [currentObject, setCurrentObject] = useState<IObjectInfoBase>(null as unknown as IObjectInfoBase);
  const [storedSlideIDs, storeSlideIDs] = useLocalStore<Array<number>>(CURRENT_SLIDES_IDS, []);
  const [currentStoredSlide, , removeCurrentSlideFromStore] = useLocalStore<IObjectInfoBase>(CURRENT_SLIDE_KEY_NAME, null as unknown as IObjectInfoBase);

  const { startTimer, stopTimer } = useInterval(TIMER_TIMEOUT, () => {
    const id = currentObjectIDs[currentObjIndex];
    console.log({ id });
    if (!id) return console.log(`[updateObject] id == ${id}`);
    getObjectHttp({ id }).then(val => {
      setCurrentObjIndex(prevObjIndex => {
        setCurrentObject(val);
        return prevObjIndex < currentObjectIDs.length - 1 ? prevObjIndex + 1 : 0;
      });
    });
    console.log('Current Timer (inside useInterval) TICK :: ');
  });

  useEffect(() => {
    console.log(`ComponentDidMount`);
    const iniSlides = () => {
      if (!!!storedSlideIDs.length) {
        console.log('Getting all objectIDs ...');
        return getAvailableObjectsIdsHttp().then(({ objectIDs, total }) => {
          storeSlideIDs(objectIDs);
          setCurrentObjectIDs(objectIDs);
          console.log('Setting objectIDs ...');
        });
      } else {
        console.log('Setting objectIDs from LocalStore ...');
        setCurrentObjectIDs(storedSlideIDs);
      }
      if (currentStoredSlide) {
        console.log(`Current Slide ${currentStoredSlide}`);
        setCurrentObjIndex(_prevObjIndex => {
          setCurrentObject(currentStoredSlide);
          return currentStoredSlide.objectID;
        });
      }
    };
    iniSlides();

    return () => removeCurrentSlideFromStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ObjectsCtx.Provider value={{ currentObject, startTimer, stopTimer }}>{children}</ObjectsCtx.Provider>;
};

export { ObjectsCtx };
export default ObjectsProvider;
