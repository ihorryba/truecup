import React from 'react';

let defaultValue = {
    amountOfOrders: false,
    getAmountOfOrders: () => {}
};

const basketContext = React.createContext(defaultValue);

export let value = defaultValue;

export default basketContext;
