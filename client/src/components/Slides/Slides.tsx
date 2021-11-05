import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ObjectsCtx } from '../../context/ObjectsCtx';
import './Slides.css';

const placeholderUrl = `https://via.placeholder.com/720`;

export default function Slides() {
  const { currentObject, stopTimer, startTimer } = useContext(ObjectsCtx);

  useEffect(() => {
    startTimer();
    return () => {
      console.log('SlidesCmp willUnmount .. calling stopTimer() ....');
      stopTimer();
    };
  }, [startTimer, stopTimer]);

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
