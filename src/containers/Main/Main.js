import React, { Component } from 'react';
import firebase from '../../config/fbConfig';

import SubHeader from '../../components/SubHeader/SubHeader';
import Card from '../../components/Card/Card';
import Carousel from '../../components/Carousel/Carousel';

import classes from './Main.module.scss';

class Main extends Component {

    state = {
        categories: null
    };

    componentDidMount() {
        this.loadDataHandler();
    }

    loadDataHandler = () => {
        firebase.firestore().collection('categories').get()
            .then(data => {
                const categories = data.docs.map(item => {
                    return {
                        id: item.id,
                        ...item.data()
                    };
                });
                this.setState({ categories });
            })
            .catch(err => console.log(err))
    };

    render() {
        let categories = null;
        if (this.state.categories) {
            categories = (
                <div className="row">
                    {this.state.categories.map(item => <Card key={item.id} {...item} url="/products/" />)}
                </div>
            );
        }
        return (
            <div className={classes.Main}>
                <Carousel />
                <SubHeader text="Товар" />
                <div className={`${'container'} ${classes.CardCtn}`}>
                    {categories}
                </div>
            </div>
        );
    }
}

export default Main;
