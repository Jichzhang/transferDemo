import React, { useState } from 'react';
import Transfer from './transfer';
import './App.css';

function App() {

  const [val, setVal] = useState<any>();

  return (
    <Transfer
      value={val}
      onChange={(vals) => {
        console.log(vals);
        
        setVal(vals);
      }}
      options={[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ]}
    />
  );
}

export default App;
