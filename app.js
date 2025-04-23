// src/App.js
import React from 'react';
import MovableCircle from './MovableCircle';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <MovableCircle />
    </div>
  );
};

export default App;