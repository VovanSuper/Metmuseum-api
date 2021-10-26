import React from 'react';
import { useParams } from 'react-router-dom';

export default function ObjectData() {
  const { id } = useParams<{ id: string; }>();

  return (
    <main className="data-content">
      rendering {id} slide
    </main>
  );
}