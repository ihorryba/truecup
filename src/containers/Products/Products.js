import React, { Component } from 'react';
import firebase from '../../config/fbConfig';

import SubHeader from '../../components/SubHeader/SubHeader';
import Card from '../../components/Card/Card';
import * as _ from 'lodash';

import classes from './Products.module.scss';

class Products extends Component {

    state = {
        products: null,
        types: null
    };

    componentDidMount() {
        this.loadDataHandler();
    }

    loadDataHandler = () => {
        Promise.all([
            firebase.firestore()
                .collection('products')
                .where('categoryId', '==', this.props.match.params.id)
                .get().then(data => {
                    return data.docs.map(item => {
                        return {
                            id: item.id,
                            ...item.data()
                        };
                    });
                }),
            firebase.firestore()
                .collection('types')
                .get()
                .then(types => {
                    return types.docs.map(item => {
                        return {
                            type: item.id,
                            ...item.data()
                        };
                    });
                })
        ]).then(data => {
            this.setState({ products: data[0], types: data[1] });
        });
    };

    render() {
        let products = null;
        if (this.state.products) {
            if (this.props.match.params.id === 'accessories') {
                let array = [];
                const groupsArray = _.chain(this.state.products).groupBy('type').value();
                Object.keys(groupsArray).forEach(key => {
                    const div = (
                        <React.Fragment key={key}>
                            <div className={`${'col-12'} ${classes.CategoryHeader}`}>
                                {this.state.types.find(item => item.type === key).name}
                            </div>
                            {groupsArray[key].map(item => (<Card key={item.id} {...item} url="/order/" />))}
                        </React.Fragment>
                    );
                    array.push(div);
                });
                products = (
                    <div className="row">
                        {array}
                    </div>
                );
            } else {
                products = (
                    <div className="row">
                        {this.state.products.map(item => <Card key={item.id} {...item} url="/order/" />)}
                    </div>
                );
            }
        }
        return (
            <div className={classes.Products}>
                <SubHeader text="Товар" />
                <div className={`${'container'} ${classes.CardCtn}`}>
                    {products}
                </div>
            </div>
        );
    }
}

export default Products;
