import React from 'react';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';


function App() {
  return (
    <div className='lg:px-12 xs:px-2'>
      <Header/>
      <Sidebar/>
    </div>
  );
}

export default App;
