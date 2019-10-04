import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class StrawsForm extends Component {

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
        this.setState({ pack: event.currentTarget.value });
    };

    amountChanged = event => {
        this.setState({ amount: +event.currentTarget.value });
    };

    submitHandler = event => {
        console.log(this.state);
    };

    render() {
        if (this.state.amount || this.state.amount === 0) {
            if (this.state.amount * this.props.formData.packs[this.state.pack] >= this.props.formData.packs.box) {
                const result = this.state.amount * this.props.formData.packs[this.state.pack] * this.props.formData.boxPrice;
                if (result !== this.state.price)
                    this.setState({ price: this.state.amount * this.props.formData.packs[this.state.pack] * this.props.formData.boxPrice });
            } else {
                const result = this.state.amount * this.props.formData.packs[this.state.pack] * this.props.formData.cartonPrice;
                if (result !== this.state.price)
                    this.setState({ price: this.state.amount * this.props.formData.packs[this.state.pack] * this.props.formData.cartonPrice });
            }
        } else {
            if (this.state.price !== null) {
                this.setState({ price: null });
            }
        }

        return (
            <Form>
                <Form.Group controlId="pack">
                    <Form.Label>Упаковка</Form.Label>
                    <Form.Control onChange={this.packChanged} as="select">
                        <option value="carton">Рукав - {this.props.formData.packs.carton}</option>
                        <option value="box">Ящик - {this.props.formData.packs.box}</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="pack">
                    <Form.Label>Колір</Form.Label>
                    <Form.Control onChange={this.colorChanged} as="select">
                        {this.props.formData.colors.map(item => <option key={item} value={item}>{item}</option>)}
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

export default StrawsForm;
