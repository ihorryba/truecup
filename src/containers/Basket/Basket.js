import React, { Component } from 'react';

import classes from './Basket.module.scss';
import Button from 'react-bootstrap/Button';
import ConfirmModal from '../../components/Modals/ConfirmModal/ConfirmModal';
import BasketContext from '../../Contexts/BasketContext/BasketContext';

class Basket extends Component {
    static contextType = BasketContext;

    state = {
        orders: [],
        isShowRemoveModal: false,
        selectedOrder: null
    };

    componentDidMount() {
        const basketJSON = localStorage.getItem('basket');
        if (basketJSON) {
            this.setState({ orders: JSON.parse(basketJSON) });
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
        this.setState(state => ({ orders: orders, isShowRemoveModal: !state.isShowRemoveModal }));
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
                        <Button style={{backgroundColor: '#7aca56', border: '#7aca56', marginBottom: '1px'}}>Змінити</Button>
                        <Button onClick={this.openRemoveModal(item)} variant="danger">Видалити</Button>
                    </td>
                </tr>
            ));
        }
        return (
            <React.Fragment>
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
                            Сума
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
                {this.state.isShowRemoveModal ?
                    <ConfirmModal header="Видалити" click={this.removeOrder}>
                        Ви дійсно хочете видалити замовлення?
                    </ConfirmModal> : null}
            </React.Fragment>);
    }
}

export default Basket;
