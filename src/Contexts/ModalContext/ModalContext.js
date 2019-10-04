import React from 'react';

let defaultValue = {
    isShowConfirmModal: false
};

const modalContext = React.createContext(defaultValue);

export let value = defaultValue;

export default modalContext;
