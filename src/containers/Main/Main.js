import React, { Component } from 'react';

import SubHeader from '../../components/SubHeader/SubHeader';
import Card from '../../components/Card/Card';
import Carousel from '../../components/Carousel/Carousel';

import classes from './Main.module.scss';

class Main extends Component {
    render() {
        return (
            <div className={classes.Main}>
                <Carousel />
                <SubHeader text="Товар" />
                <div className={`${'container'} ${classes.CardCtn}`}>
                    <div className="row">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
