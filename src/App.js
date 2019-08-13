import React from 'react';

import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import Order from './containers/Order/Order';

function App() {
  return (
    <div className="container">
      <Header />
      <Order />
      <Main />
    </div>
  );
}

export default App;
