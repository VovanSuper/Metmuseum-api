import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getObject } from '../context/Objects';
import useLocalStore, { CURRENT_SLIDE_KEY_NAME } from '../hooks/useLocalStore';
import { IObjectInfoBase } from '../models/IObject';

import './ObjectData.css';

export default function ObjectData() {
  const [currentObject, setCurrentObject] = useState<IObjectInfoBase | null>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [, storeCurrentSlide] = useLocalStore<IObjectInfoBase>(CURRENT_SLIDE_KEY_NAME, null as unknown as IObjectInfoBase);

  useEffect(() => {
    getObject({ id: +id }).then(val => {
      setCurrentObject(val);
      storeCurrentSlide(val);
    });
  }, [id]);

  const backHandler = (e: any) => {
    e.preventDefault();
    return history.goBack();
  };

  if (!currentObject) return <div className='data-container'>Loading object id ${id}...</div>;

  return (
    <div className='data-container'>
      <main className='data-content'>
        <h2>Object {currentObject.objectName} </h2>
        <br />
        <div className='object-info'>
          <span>Title : {currentObject.title}</span>
          <span>accessionYear : {currentObject.accessionYear}</span>
        </div>
      </main>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
}
