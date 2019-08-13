import React from 'react';
import classes from './Header.module.scss';

const header = props => {
    return (
        <nav className={classes.Nav}>
            <li>
                <a>
                    Головна
                </a>
            </li>
            <li>
                <a>
                    Контакти
                </a>
            </li>
        </nav>
    );
};

export default header;
