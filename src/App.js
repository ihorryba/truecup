import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import Order from './containers/Order/Order';
import Products from './containers/Products/Products';
import Basket from './containers/Basket/Basket';
import ModalContext, { value } from './Contexts/ModalContext/ModalContext'

function App() {
  return (
      <BrowserRouter>
          <ModalContext.Provider value={value}>
              <div className="container">
                  <Header />
                  <Route path="/" exact component={Main}/>
                  <Route path="/products/:id" component={Products}/>
                  <Route path="/order/:id" component={Order}/>
                  <Route path="/basket" component={Basket} />
              </div>
          </ModalContext.Provider>
      </BrowserRouter>
  );
}

export default App;
