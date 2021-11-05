import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getObjectHttp } from '../../utils/http';
import useLocalStore, { CURRENT_SLIDE_KEY_NAME } from '../../hooks/useLocalStore';
import { IObjectInfoBase } from '../../models/IObject';

import './ObjectData.css';

export default function ObjectData() {
  const [currentObject, setCurrentObject] = useState<IObjectInfoBase | null>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [, storeCurrentSlide] = useLocalStore<IObjectInfoBase>(CURRENT_SLIDE_KEY_NAME, null as unknown as IObjectInfoBase);

  useEffect(() => {
    getObjectHttp({ id: +id }).then(val => {
      setCurrentObject(val);
      storeCurrentSlide(val);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const backHandler = (e: any) => {
    e.preventDefault();
    history.goBack();
  };

  if (!currentObject) return <div className='data-container'>Loading object id ${id}...</div>;

  return (
    <div className='data-container'>
      <main className='data-content'>
        <h2 className='object-title'>{currentObject.objectName} </h2>

        <div className='object-info'>
          <table className='object-info__table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Object Name</th>
                <th>Accession Number</th>
                <th>Accession Year</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentObject.title}</td>
                <td>{currentObject.objectName}</td>
                <td>{currentObject.accessionNumber}</td>
                <td>{currentObject.accessionYear}</td>
                <td>
                  <img className='object-img' src={currentObject.primaryImageSmall || `https://via.placeholder.com/420`} alt={currentObject.objectName} />{' '}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <button type='button' className='btn btn-back' onClick={backHandler}>
        Back
      </button>
    </div>
  );
}
