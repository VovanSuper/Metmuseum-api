/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getObject, getAvailableObjectsIds } from '../context/Objects';
// import { ObjectsCtx } from '../context/Objects';
import { IObjectInfoBase } from '../models/IObject';
import useLocalStore, { CURRENT_SLIDES_IDS, CURRENT_SLIDE_KEY_NAME } from '../hooks/useLocalStore';
import './Slides.css';

const placeholderUrl = `https://via.placeholder.com/720`;
const ELAPSE_TIME = 1000;

export default function Slides() {
  const history = useHistory();
  const [currentObjectIDs, setCurrentObjectIDs] = useState<number[]>([]);
  const [currentObjIndex, setCurrentObjIndex] = useState<number>(0);
  const [currentObject, setCurrentObject] = useState<IObjectInfoBase>(null as unknown as IObjectInfoBase);
  // const { timer, currentObject, startGettingObject, stopGettingObject } = useContext(ObjectsCtx);
  const [slideIDs, storeSlideIDs] = useLocalStore<Array<number>>(CURRENT_SLIDES_IDS, []);
  const [currentSlide] = useLocalStore<IObjectInfoBase>(CURRENT_SLIDE_KEY_NAME, null as unknown as IObjectInfoBase);

  useEffect(() => {
    // ComponentDidMount
    const iniSlides = () => {
      if (!!!slideIDs.length) {
        console.log('Getting all objectIDs ...');
        return getAvailableObjectsIds().then(({ objectIDs, total }) => {
          storeSlideIDs(objectIDs);
          setCurrentObjectIDs(objectIDs);
          console.log('Setting objectIDs ...');
        });
      } else {
        setCurrentObjectIDs(slideIDs);
        console.log('Setting objectIDs from LocalStore ...');
      }

      if (currentSlide) {
        console.log(`Current Slide ${currentSlide}`);
        setCurrentObjIndex(_prevObjIndex => {
          setCurrentObject(currentSlide);
          return currentSlide.objectID;
        });
      }
    };

    iniSlides();

    return () => {
      console.log('Slides component unmounting...');
      // ComponentWillUnmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // componentDidUpdate (with deps)

    function resetObject() {
      const id = currentObjectIDs[currentObjIndex];
      console.log({ id });
      !!id &&
        getObject({ id }).then(val => {
          setCurrentObjIndex(prevObjIndex => {
            setCurrentObject(val);
            return prevObjIndex < currentObjectIDs.length - 1 ? prevObjIndex + 1 : 0;
          });
        });
    }

    const startGetDataOnTimer = () => {
      // if (!currentObjectIDs.length) return;

      setTimeout(() => {
        resetObject();
      }, ELAPSE_TIME);
    };
    startGetDataOnTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentObjectIDs, currentObject]);

  const navigateToItem = () => {
    history.push(`/object/${currentObject?.objectID}`);
  };

  if (!currentObject) return <div className='loader'>Loading ...</div>;

  return (
    <main className='main'>
      <div className='item-img'>
        <img src={currentObject.primaryImage || placeholderUrl} alt={currentObject.title} />
      </div>
      <div className='item-name'>
        <Link className='item-name--anchor' to={`object/${currentObject.objectID}`}>
          {currentObject.title}
        </Link>
      </div>
    </main>
  );
}
