import React, { Component } from  'react';

import ImageGallery from 'react-image-gallery';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import photo from '../../img/black.jpg';

class Order extends Component {
    render() {
        const images = [{
            original: photo,
            thumbnail: photo,
        }];
        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <ImageGallery items={images} />
                </div>
                <div className="col-12 col-md-6">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Order;
