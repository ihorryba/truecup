import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ConfirmModal from '../../../components/Modals/ConfirmModal/ConfirmModal';
import BasketContext from '../../../Contexts/BasketContext/BasketContext';

class CupForm extends Component {
    static contextType = BasketContext;

    state = {
        id: +(new Date()),
        size: this.props.formData[0].size,
        productData: this.props.productData,
        currFormData: this.props.formData[0],
        pack: 'carton',
        amount: null,
        price: null,
        color: null,
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
        this.setFormData(this.state.amount, event.currentTarget.value, this.state.size);
    };

    sizeChanged = event => {
        const value = this.props.formType === 'caps' ? +event.currentTarget.value : event.currentTarget.value;
        this.setState({ size: value });
        this.setFormData(this.state.amount, this.state.pack, value);
    };

    colorChanged = event => {
        this.setState({ color: event.currentTarget.value });
    };

    amountChanged = event => {
        this.setFormData(+event.currentTarget.value, this.state.pack, this.state.size);
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

    modalHandler = () => {
        this.setState(state => ({isShowOrderModal: !state.isShowOrderModal}));
    };

    setFormData = (amount, pack, size) => {
        const currFormData = this.props.formData.find(item => String(item.size) === String(size));
        if (amount || amount === 0) {
            if ((amount * currFormData.packs[pack] >= currFormData.packs.box) && currFormData.boxPrice) {
                const result = amount * currFormData.packs[pack] * currFormData.boxPrice;
                if (result !== this.state.price)
                    this.setState({
                        amount: amount,
                        price: amount * currFormData.packs[pack] * currFormData.boxPrice,
                        pack: pack,
                        currFormData: currFormData
                    });
            } else {
                const result = amount * currFormData.packs[pack] * currFormData.cartonPrice;
                if (result !== this.state.price)
                    this.setState({
                        amount: amount,
                        price: amount * currFormData.packs[pack] * currFormData.cartonPrice,
                        pack: pack,
                        currFormData: currFormData
                    });
            }
        } else {
            if (this.state.price !== null) {
                this.setState({ amount: amount, price: null, pack: pack, currFormData: currFormData });
            } else {
                this.setState({ pack: pack, currFormData: currFormData });
            }
        }
    };

    render() {
        return (
            <React.Fragment>
                <Form>
                    <Form.Group controlId="size">
                        <Form.Label>Об'єм</Form.Label>
                        <Form.Control onChange={this.sizeChanged} as="select">
                            {this.props.formData.map(item => <option key={item.size} value={item.size}>{item.size}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        Увага! Від одного ящика діють оптові ціни.
                    </div>
                    <div style={{fontWeight: '700'}}>
                        <div>Роздрібна ціна за шт: {this.state.currFormData.cartonPrice} грн</div>
                        <div>Оптова ціна за шт: {this.state.currFormData.boxPrice} грн</div>
                    </div>
                    <Form.Group controlId="pack">
                        <Form.Label>Упаковка</Form.Label>
                        <Form.Control onChange={this.packChanged} as="select">
                            {
                                <React.Fragment>
                                    <option value="carton">Рукав - {this.state.currFormData.packs.carton}</option>
                                    <option value="box">Ящик - {this.state.currFormData.packs.box}</option>
                                </React.Fragment>
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="number">
                        <Form.Label>Кількість</Form.Label>
                        <Form.Control type="number" onKeyPress={this.keyPressHandling} onChange={this.amountChanged} />
                    </Form.Group>
                    <div style={{fontWeight: '700'}}>
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
                </Form>
                {this.state.isShowBasketModal ?
                    <ConfirmModal header="Додати в корзину" click={this.addToBasket}>
                        Ви дійсно хочете додати дане замовлення в корзину?
                    </ConfirmModal> : null}
                {this.state.isShowOrderModal ?
                    <ConfirmModal header="Замовити" click={this.modalHandler}>
                        Ви дійсно хочете здійснити замовлення?
                    </ConfirmModal> : null}
            </React.Fragment>
        );
    }
}

export default CupForm;
