import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SupportsForm extends Component {

    state = {
        size: this.props.formData.size,
        pack: 'carton',
        amount: null,
        price: null
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

    submitHandler = event => {
        console.log(this.state);
    };

    setFormData = (amount, pack) => {
        if (amount || amount === 0) {
            if ((amount * this.props.formData.packs[pack] >= this.props.formData.packs.box) && this.props.formData.boxPrice) {
                const result = amount * this.props.formData.packs[pack] * this.props.formData.boxPrice;
                if (result !== this.state.price)
                    this.setState({
                        amount: amount,
                        price: amount * this.props.formData.packs[pack] * this.props.formData.boxPrice
                    });
            } else {
                const result = amount * this.props.formData.packs[pack] * this.props.formData.cartonPrice;
                if (result !== this.state.price)
                    this.setState({
                        amount: amount,
                        price: amount * this.props.formData.packs[pack] * this.props.formData.cartonPrice
                    });
            }
        } else {
            if (this.state.price !== null) {
                this.setState({ amount: amount, price: null });
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
                <Form.Group controlId="number">
                    <Form.Label>Кількість</Form.Label>
                    <Form.Control type="number" onKeyPress={this.keyPressHandling} onChange={this.amountChanged} />
                </Form.Group>
                <div>
                    PRICE: {this.state.price}
                </div>
                <Button onClick={this.submitHandler} variant="primary" type="button">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default SupportsForm;
