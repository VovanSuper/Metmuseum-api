/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { getObjectHttp, getAvailableObjectsIdsHttp } from '../../utils/http';
// import { ObjectsCtx } from '../context/Objects';
// import { IObjectInfoBase } from '../../models/IObject';
// import useLocalStore, { CURRENT_SLIDES_IDS, CURRENT_SLIDE_KEY_NAME } from '../../hooks/useLocalStore';
import './Slides.css';
import { ObjectsCtx } from '../../context/ObjectsCtx';

const placeholderUrl = `https://via.placeholder.com/720`;

export default function Slides() {
  const { currentObject, stopTimer, startTimer } = useContext(ObjectsCtx);

  useEffect(() => {
    startTimer();
    return () => {
      console.log('SlidesCmp willUnmount .. calling stopTimer() ....');
      stopTimer();
    };
  }, []);

  useEffect(() => {
    console.log('[SlidesCmp] CurrentOBject UPDATE :::: ', currentObject);
  }, [currentObject]);

  if (!currentObject) return <div className='loader'>Loading ...</div>;

  return (
    <Link className='main' to={`object/${currentObject.objectID}`}>
      <div className='item-img'>
        <img src={currentObject.primaryImage || placeholderUrl} alt={currentObject.title} />
      </div>
      <div className='item-name'>{currentObject.title}</div>
    </Link>
  );
}
