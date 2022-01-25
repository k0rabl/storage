import React, { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../features/header';
import { Routing } from '../pages';

import './app.sass'

const App:FunctionComponent<{}> = () => {
  return (
    <BrowserRouter> 
      <div className="App">
        <Header/>
        <Routing/>
      </div>
    </BrowserRouter>
  );
}
export default App;
