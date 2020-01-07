import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './containers/Main/Main';
import Order from './containers/Order/Order';
import Products from './containers/Products/Products';
import Basket from './containers/Basket/Basket';
import BasketContext from './Contexts/BasketContext/BasketContext'

class App extends Component {
    getAmountOfOrders = () => {
        const basketJSON = localStorage.getItem('basket');
        if (!basketJSON) {
            this.setState({ amountOfOrders: 0 });
        } else {
            const basket = JSON.parse(basketJSON);
            this.setState({ amountOfOrders: basket.length });
        }
    };

    state = {
        amountOfOrders: 0,
        getAmountOfOrders: this.getAmountOfOrders
    };

    componentDidMount() {
        this.getAmountOfOrders();
    }

    render() {
        return (
            <BasketContext.Provider value={this.state}>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route path="/" exact component={Main}/>
                        <Route path="/products/:id" component={Products}/>
                        <Route path="/order/:id" component={Order}/>
                        <Route path="/basket" component={Basket} />
                    </div>
                </BrowserRouter>
            </BasketContext.Provider>
        );
    }
}

export default App;
