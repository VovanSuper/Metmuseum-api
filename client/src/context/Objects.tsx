// import React, { createContext, ReactNode, useEffect, useState, useReducer } from "react";
import axios, { AxiosResponse } from "axios";
import { IObjectInfoBase } from '../models/IObject';

const requestSvc = axios.create({
  baseURL: 'http://localhost:8088'
});

export const getAvailableObjectsIds = async () => requestSvc.get('objects').then((resp: AxiosResponse<{ objects: { total: number, objectIDs: number[]; }; }>) => resp.data.objects);

export const getObject = async ({ id }: { id: number; }): Promise<IObjectInfoBase> => {
  const response = await requestSvc.get(`objects/${id}`);
  const obj = response.data;
  return obj['object'];
};

// class TimerGenerator {
//   private ids: number[] = [];
//   private currentIdx = 0;
//   currentObjectID: number;
//   stopFlag = false;

//   constructor(ids: number[]) {
//     this.ids = ids;
//     this.currentObjectID = ids[this.currentIdx];
//   }

//   onTimerFuncs: Array<(args: number) => void> = [];

//   start() {
//     if (!this.stopFlag)
//       setTimeout(() => {
//         if (this.currentIdx < this.ids.length - 1)
//           this.currentIdx++;
//         else
//           this.currentIdx = 0;
//         this.currentObjectID = this.ids[this.currentIdx];
//         this.onTimerFuncs.forEach((cb: (args: number) => void) => {
//           cb(this.currentObjectID);
//           console.log('Tick...');

//         });
//         this.start();
//       }, 1000);
//   }

//   stop() {
//     this.stopFlag = true;
//   }
// }

// interface CtxProps {
//   timer: TimerGenerator | undefined;
//   currentObject: IObjectInfoBase | undefined;
//   startGettingObject: () => void;
//   stopGettingObject: () => void;
//   // getAvailableObjectsIds: () => Promise<{ total: number, objectIDs: number[]; }>;
//   // getObject: ({ id }: { id: number; }) => Promise<IObjectInfoBase>;
// }

// // function objectsReducer(state: IObjectInfoBase | undefined = undefined, action: { type: string; payload: IObjectInfoBase; }) {
// //   switch (action.type) {
// //     case 'setCurrent':
// //       return {
// //         ...action.payload
// //       };

// //     default:
// //       return state;
// //   }
// // }

// // const setCurrentObjectAction = (newObj: IObjectInfoBase) => ({ type: 'setCurrent', payload: newObj });

// const ObjectsCtx = createContext<CtxProps>({} as CtxProps);

// const ObjectsProvider = ({ children }: { children: ReactNode; }) => {
//   // const [currentObject, dispatch] = useReducer(objectsReducer, undefined);

//   const [timer, setTimer] = useState<TimerGenerator | undefined>(undefined);
//   const [currentObject, setCurrentObject] = useState<IObjectInfoBase | undefined>(undefined);


//   const getAvailableObjectsIds = async () => requestSvc.get('objects').then((resp: AxiosResponse<{ objects: { total: number, objectIDs: number[]; }; }>) => resp.data.objects);

//   const getObject = async ({ id }: { id: number; }): Promise<IObjectInfoBase> => {
//     const response = await requestSvc.get(`objects/${id}`);
//     const obj = response.data;
//     return obj['object'];
//   };

//   getAvailableObjectsIds().then(({ objectIDs }) => {
//     console.log(`[ObjectsCtx]->getAvailableObjectsIds() ::: ${objectIDs}`);
//     setTimer(new TimerGenerator(objectIDs));

//   });

//   let startGettingObject = () => {
//     if (!!timer) {
//       console.log(`Starting timer :: `, timer);

//       timer.onTimerFuncs.push((currentObjID: number) => {
//         getObject({ id: currentObjID }).then(currentObject => {
//           console.log(`Setting currentObject : `, currentObject);
//           setCurrentObject(currentObject);
//         }
//         );
//       });
//       timer.start();
//     }
//   };
//   let stopGettingObject = () => {
//     if (!timer) return;

//     timer.stop();
//   };

//   return <ObjectsCtx.Provider value={{ timer, currentObject, startGettingObject, stopGettingObject }} >{children}</ObjectsCtx.Provider>;
// };

// export { ObjectsCtx };
// export default ObjectsProvider;