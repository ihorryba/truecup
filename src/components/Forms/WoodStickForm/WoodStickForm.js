import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ConfirmModal from '../../Modals/ConfirmModal/ConfirmModal';
import BasketContext from '../../../Contexts/BasketContext/BasketContext';

class WoodStickForm extends Component {
    static contextType = BasketContext;

    state = {
        id: +(new Date()),
        size: this.props.formData.size,
        productData: this.props.productData,
        productId: this.props.productId,
        pack: 'carton',
        amount: null,
        price: null,
        isShowBasketModal: false,
        isShowOrderModal: false
    };

    keyPressHandling = event => {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };

    packChanged = event => {
        this.setFormData(this.state.amount, event.currentTarget.value);
    };

    amountChanged = event => {
        this.setFormData(+event.currentTarget.value, this.state.pack);
    };

    submitHandler = () => {
        this.setState(state => ({isShowBasketModal: !state.isShowBasketModal}));
    };

    addToBasket = (event) => {
        if (event) {
            const basketJSON = localStorage.getItem('basket');
            if (!basketJSON) {
                localStorage.setItem('basket', JSON.stringify([this.state]));
            } else {
                const basket = JSON.parse(basketJSON);
                basket.push(this.state);
                localStorage.setItem('basket', JSON.stringify(basket));
            }
        }
        this.context.getAmountOfOrders();
        this.setState(state => ({isShowBasketModal: !state.isShowBasketModal, id: +(new Date())}));
    };

    setFormData = (amount, pack) => {
        if (amount || amount === 0) {
            if ((amount * this.props.formData.packs[pack] >= this.props.formData.packs.box) && this.props.formData.boxPrice) {
                const result = amount * this.props.formData.packs[pack] * this.props.formData.boxPrice;
                if (result !== this.state.price)
                    this.setState({
                        amount: amount,
                        price: amount * this.props.formData.packs[pack] * this.props.formData.boxPrice,
                        pack: pack
                    });
            } else {
                const result = amount * this.props.formData.packs[pack] * this.props.formData.cartonPrice;
                if (result !== this.state.price)
                    this.setState({
                        amount: amount,
                        price: amount * this.props.formData.packs[pack] * this.props.formData.cartonPrice,
                        pack: pack
                    });
            }
        } else {
            if (this.state.price !== null) {
                this.setState({ amount: amount, price: null, pack: pack });
            } else {
                this.setState({ pack: pack });
            }
        }
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="pack">
                    <Form.Label>Упаковка</Form.Label>
                    <Form.Control onChange={this.packChanged} as="select">
                        <option value="carton">Рукав - {this.props.formData.packs.carton}</option>
                        <option value="box">Ящик - {this.props.formData.packs.box}</option>
                    </Form.Control>
                </Form.Group>
                {
                    this.props.formData.boxPrice ?
                        <React.Fragment>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                Увага! Від одного ящика діють оптові ціни.
                            </div>
                            <div style={{fontWeight: '700'}}>
                                <div>Роздрібна ціна за шт: {this.props.formData.cartonPrice} грн</div>
                                <div>Оптова ціна за шт: {this.props.formData.boxPrice} грн</div>
                            </div>
                        </React.Fragment> : null
                }
                { this.props.formData.boxPrice ?
                    null :
                    <div style={{fontWeight: '700'}}>
                        <div>Роздрібна ціна за шт: {this.props.formData.cartonPrice} грн</div>
                    </div>
                }
                <Form.Group controlId="number">
                    <Form.Label>Кількість</Form.Label>
                    <Form.Control type="number" onKeyPress={this.keyPressHandling} onChange={this.amountChanged} />
                </Form.Group>
                <div>
                    Сума: {this.state.price}
                </div>
                <div style={{marginTop: '20px'}} className="form-btn-grp">
                    <Button style={{backgroundColor: '#7aca56', border: '#7aca56'}} onClick={this.submitHandler} variant="primary" type="button">
                        В корзину
                    </Button>
                    <Button style={{backgroundColor: 'black', border: 'black'}} onClick={this.modalHandler} variant="primary" type="button">
                        Замовити
                    </Button>
                </div>
                {this.state.isShowBasketModal ?
                    <ConfirmModal header="Додати в корзину" click={this.addToBasket}>
                        Ви дійсно хочете додати дане замовлення в корзину?
                    </ConfirmModal> : null}
                {this.state.isShowOrderModal ?
                    <ConfirmModal header="Замовити" click={this.modalHandler}>
                        Ви дійсно хочете здійснити замовлення?
                    </ConfirmModal> : null}
            </Form>
        );
    }
}

export default WoodStickForm;
