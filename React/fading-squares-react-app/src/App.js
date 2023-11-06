import React, { useState } from 'react';
import Square from './Square';

const App = () => {
  const [numSquares, setNumSquares] = useState(10);
  const squares = new Array(numSquares).fill(null);

  const handleInputChange = (event) => {
    setNumSquares(Number(event.target.value));
  };

  return (
    <div style={{ position: 'relative', width: '900px', height: '400px' }}>
      <input type="number" value={numSquares} onChange={handleInputChange} />
      {squares.map((_, i) => (
        <Square key={i} />
      ))}
    </div>
  );
};

export default App;