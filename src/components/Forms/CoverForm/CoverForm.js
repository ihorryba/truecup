import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CoverForm extends Component {

    state = {
        size: this.props.formData[0].size,
        pack: 'carton',
        amount: null,
        price: null,
        color: null
    };

    keyPressHandling = event => {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };

    packChanged = event => {
        this.setState({ pack: event.currentTarget.value });
    };

    sizeChanged = event => {
        this.setState({ size: +event.currentTarget.value });
    };

    colorChanged = event => {
        this.setState({ color: event.currentTarget.value });
    };

    amountChanged = event => {
        this.setState({ amount: +event.currentTarget.value });
    };

    submitHandler = event => {
        console.log(this.state);
    };

    render() {

        const currFormData = this.props.formData.find(item => item.size === this.state.size);

        if (this.state.amount || this.state.amount === 0) {
            if (this.state.amount * currFormData.packs[this.state.pack] >= currFormData.packs.box) {
                const result = this.state.amount * currFormData.packs[this.state.pack] * currFormData.boxPrice;
                if (result !== this.state.price)
                    this.setState({ price: this.state.amount * currFormData.packs[this.state.pack] * currFormData.boxPrice });
            } else {
                const result = this.state.amount * currFormData.packs[this.state.pack] * currFormData.cartonPrice;
                if (result !== this.state.price)
                    this.setState({ price: this.state.amount * currFormData.packs[this.state.pack] * currFormData.cartonPrice });
            }
        } else {
            if (this.state.price !== null) {
                this.setState({ price: null });
            }
        }

        return (
            <Form>
                <Form.Group controlId="size">
                    <Form.Label>Об'єм</Form.Label>
                    <Form.Control onChange={this.sizeChanged} as="select">
                        {this.props.formData.map(item => <option key={item.size} value={item.size}>{item.size}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="color">
                    <Form.Label>Упаковка</Form.Label>
                    <Form.Control onChange={this.packChanged} as="select">
                        <option value="carton">Рукав - {currFormData.packs.carton}</option>
                        <option value="box">Ящик - {currFormData.packs.box}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="pack">
                    <Form.Label>Колір</Form.Label>
                    <Form.Control onChange={this.colorChanged} as="select">
                        {currFormData.colors.map(item => <option key={item} value={item}>{item}</option>)}
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

export default CoverForm;
