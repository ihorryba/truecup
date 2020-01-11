import React, { Component } from 'react';
import { withRouter } from 'react-router';

import classes from './Basket.module.scss';
import Button from 'react-bootstrap/Button';
import ConfirmModal from '../../components/Modals/ConfirmModal/ConfirmModal';
import BasketContext from '../../Contexts/BasketContext/BasketContext';

class Basket extends Component {
    static contextType = BasketContext;

    state = {
        orders: [],
        price: 0,
        isShowRemoveModal: false,
        selectedOrder: null
    };

    componentDidMount() {
        const basketJSON = localStorage.getItem('basket');
        if (basketJSON) {
            const orders = JSON.parse(basketJSON);
            const price = orders.reduce((prev, curr) => {
                return prev + curr.price;
            }, 0);
            this.setState({ orders: orders, price: price });
        }
    }

    openRemoveModal = (order) => {
        return () => {
            this.setState(state => ({ selectedOrder: order, isShowRemoveModal: !state.isShowRemoveModal }));
        };
    };

    removeOrder = res => {
        let orders = this.state.orders;
        if (res) {
            const basketJSON = localStorage.getItem('basket');
            if (basketJSON) {
                const basket = JSON.parse(basketJSON);
                const index = basket.findIndex(item => item.id === this.state.selectedOrder.id);
                basket.splice(index, 1);
                orders = basket;
                localStorage.setItem('basket', JSON.stringify(basket));
            }
        }
        this.context.getAmountOfOrders();
        const price = orders.length > 0 ? orders.reduce((prev, curr) => prev + curr.price, 0) : 0;
        this.setState(state => ({ orders: orders, price: price, isShowRemoveModal: !state.isShowRemoveModal }));
    };

    goToMainPage = () => {
        this.props.history.push('/');
    };

    render() {
        let content = null;
        if (this.state.orders.length > 0) {
            content = this.state.orders.map(item => (
                <tr key={item.id}>
                    <td className={classes.OrderItem}>
                        {item.productData.name}
                    </td>
                    <td className={classes.OrderItem}>
                        {item.size}
                    </td>
                    <td className={classes.OrderItem}>
                        {item.color}
                    </td>
                    <td className={classes.OrderItem}>
                        {item.amount}
                    </td>
                    <td className={classes.OrderItem}>
                        {item.price}
                    </td>
                    <td style={{ textAlign: 'end' }} width="100">
                        {/*<Button style={{backgroundColor: '#7aca56', border: '#7aca56', marginBottom: '1px'}}>Змінити</Button>*/}
                        <Button onClick={this.openRemoveModal(item)} variant="danger">Видалити</Button>
                    </td>
                </tr>
            ));
        }
        return (
            <React.Fragment>
                {
                    this.state.orders.length ?
                        <table style={{ 'width': '100%' }}>
                            <thead>
                            <tr>
                                <th>
                                    Товар
                                </th>
                                <th>
                                    Розмір
                                </th>
                                <th>
                                    Колір
                                </th>
                                <th>
                                    Кількість
                                </th>
                                <th>
                                    Сума (грн)
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {content}
                            <tr style={{ fontWeight: 'bold' }}>
                                <td>Сума:</td><td></td><td></td><td></td>
                                <td style={{ textAlign: 'start' }} >
                                    {this.state.price}
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table> :
                        <React.Fragment>
                            <div style={{ textAlign: 'center', padding: '30px 0', fontSize: '20px', fontWeight: 'bold' }}>Кошик пустий. Зробіть замовлення.</div>
                            <div style={{ textAlign: 'center' }}>
                                <Button onClick={this.goToMainPage} variant="primary">Перейти до товарів</Button>
                            </div>
                        </React.Fragment>

                }
                {this.state.isShowRemoveModal ?
                    <ConfirmModal header="Видалити" click={this.removeOrder}>
                        Ви дійсно хочете видалити замовлення?
                    </ConfirmModal> : null}
            </React.Fragment>);
    }
}

export default Basket;
