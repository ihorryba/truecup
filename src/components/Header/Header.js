import React from 'react';
import classes from './Header.module.scss';

import basketIcon from '../../assets/icons/basket.png';
import BasketContext from '../../Contexts/BasketContext/BasketContext';

import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";

const header = props => {
    return (
        <div className={classes.NavCtn}>
            <nav className={classes.Nav}>
                <li>
                    <NavLink activeClassName={classes.active} exact to="/">
                        Головна
                    </NavLink>
                </li>
                <li>
                    <a>
                        Контакти
                    </a>
                </li>
            </nav>
            <div className={classes.LabelCtn}>
                <Link to="/basket">
                    <img className={classes.ImgSize} src={basketIcon} alt="basket"/>
                </Link>
                <BasketContext.Consumer>
                    {({amountOfOrders}) => (
                        <span className={classes.Label}>{amountOfOrders}</span>
                    )}
                </BasketContext.Consumer>
            </div>
        </div>
    );
};

export default header;
