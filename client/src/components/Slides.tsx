/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import { time } from 'console';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getObject, getAvailableObjectsIds } from '../context/Objects';
// import { ObjectsCtx } from '../context/Objects';
import { IObjectInfoBase } from '../models/IObject';
import './Slides.css';

const placeholderUrl = `https://via.placeholder.com/1920/1200`;
const ELAPSE_TIME = 1000 ;

export default function Slides() {
  const history = useHistory();
  const [currentObjectIDs, setCurrentObjectIDs] = useState<number[]>([]);
  const [currentObjIndex, setCurrentObjIndex] = useState<number>(0);
  const [currentObject, setCurrentObject] = useState<IObjectInfoBase | null>(null);
  // const { timer, currentObject, startGettingObject, stopGettingObject } = useContext(ObjectsCtx);



  const startGetDataOnTimer = () => {
    if (!currentObjectIDs.length) return;

    setTimeout(() => {
      const id = currentObjectIDs[currentObjIndex];
      getObject({ id }).then(val => {
        setCurrentObjIndex(prevObjIndex => {
          setCurrentObject(_prevObj => {
            return val;
          });
          return prevObjIndex < currentObjectIDs.length - 1 ? prevObjIndex + 1 : 0;
        });
      });
    }, ELAPSE_TIME);
  };

  useEffect(() => {
    getAvailableObjectsIds().then(({ objectIDs, total }) => {
      setCurrentObjectIDs(objectIDs);
    });
  }, []);

  useEffect(() => {
    startGetDataOnTimer();
  }, [currentObjectIDs, currentObject]);

  const navigateToItem = () => {
    history.push(`/objects/${currentObject?.objectID}`);
  };

  if (!currentObject) return <div className="loader">Loading ...</div>;

  return (
    <main className="main">
      <div className="item-img" >
        <img src={currentObject.primaryImage || placeholderUrl} alt={currentObject.title} />
      </div>
      <div className="item-name">
        <Link className="item-name--anchor" to={`object/${currentObject.objectID}`} >{currentObject.title}</Link>
      </div>
    </main >
  );
}