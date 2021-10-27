/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
// import ObjectsCtxProvider from "./context/Objects";
import './App.css';
import AppRoutes from "./Routes";

export default () => (
  // <ObjectsCtxProvider>
  <div className="App-content">
    <AppRoutes />
  </div>
  // </ObjectsCtxProvider>
);
