import React, { Component } from  'react';
import firebase from '../../config/fbConfig';

import ImageGallery from 'react-image-gallery';
import CupForm from '../../components/Forms/CupForm/CupForm';
import CoverForm from '../../components/Forms/CoverForm/CoverForm';
import Straws8Form from '../../components/Forms/Straws8Form/Straws8Form';

import photo from '../../img/black.jpg';
import StrawsForm from '../../components/Forms/Straws/StrawsForm';
import WoodStickForm from '../../components/Forms/WoodStickForm/WoodStickForm';
import CuffsForm from '../../components/Forms/CuffsForm/CuffsForm';
import SupportsForm from '../../components/Forms/SupportsForm/SupportsForm';

class Order extends Component {
    state = {
        formData: null,
        formType: null,
        productData: null
    };

    componentDidMount() {
        this.loadDataHandler();
    }

    getNeededForm() {
        if (this.state.formType) {
            switch (this.state.formType) {
                case 'cups': return <CupForm {...this.state} productId={this.props.match.params.id} />;
                case 'packs': return <CupForm {...this.state} productId={this.props.match.params.id} />;
                case 'cover': return <CoverForm {...this.state} productId={this.props.match.params.id} />;
                case 'straws8': return <Straws8Form {...this.state} productId={this.props.match.params.id} />;
                case 'straws': return <StrawsForm {...this.state} productId={this.props.match.params.id} />;
                case 'woodStick': return <WoodStickForm {...this.state} productId={this.props.match.params.id} />;
                case 'cuffs': return <CuffsForm {...this.state} productId={this.props.match.params.id} />;
                case 'supports': return <SupportsForm {...this.state} productId={this.props.match.params.id} />;
            }
        }
        return null;
    }

    loadDataHandler = () => {
        Promise.all([
            firebase.firestore()
                .collection('prices')
                .doc(this.props.match.params.id)
                .get(),
            firebase.firestore()
                .collection('products')
                .doc(this.props.match.params.id)
                .get()
        ]).then(res => {
            const formDetail = res[0].data();
            this.setState({
                formData: 'sizes' in formDetail ? formDetail.sizes : formDetail,
                formType: formDetail.type,
                productData: res[1].data()
            });
        });
    };

    render() {
        const images = [{
            original: photo,
            thumbnail: photo,
        }];

        return (
            <div className="row">
                <div style={{textAlign: 'center', fontSize: '20px', fontWeight: '600', marginBottom: '12px'}} className="col-12">
                    {this.state.productData ?
                        this.state.productData.name : null}
                </div>
                <div className="col-12 col-md-6">
                    <ImageGallery items={images} />
                </div>
                <div className="col-12 col-md-6">
                    {this.getNeededForm()}
                </div>
            </div>
        );
    }
}

export default Order;
