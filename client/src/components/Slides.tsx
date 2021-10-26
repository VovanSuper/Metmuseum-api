import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ObjectsCtx } from '../context/Objects';
import { IObjectInfoBase } from '../models/IObject';



export default function Slides() {
  const [currentObject, setCurrentObject] = useState<IObjectInfoBase | null>(null);
  const { getObject } = useContext(ObjectsCtx);

  useEffect(() => {
    getObject({ id: 1 }).then((item: any) => {
      console.log({ item });

      setCurrentObject(item);
    });
  }, []);

  if (!currentObject) return <div className="loader">Loading ...</div>;

  return (
    <main className="main">
      <h2>Main content {currentObject?.objectName}</h2>
      <Link to={`object/${currentObject?.objectName}`} />
    </main>
  );
}