import React, { Component } from  'react';
import firebase from '../../config/fbConfig';

import ImageGallery from 'react-image-gallery';
import CupForm from '../../components/Forms/CupForm/CupForm';
import CoverForm from '../../components/Forms/CoverForm/CoverForm';
import Straws8Form from '../../components/Forms/Straws8Form/Straws8Form';
import ModalContext from '../../Contexts/ModalContext/ModalContext';

import photo from '../../img/black.jpg';
import StrawsForm from "../../components/Forms/Straws/StrawsForm";
import WoodStickForm from "../../components/Forms/WoodStickForm/WoodStickForm";
import CuffsForm from "../../components/Forms/CuffsForm/CuffsForm";
import SupportsForm from "../../components/Forms/SupportsForm/SupportsForm";
import GenericForm from "../../components/Forms/GenericForm/GenericForm";

class Order extends Component {
    state = {
        formData: null,
        formType: null
    };

    componentDidMount() {
        this.loadDataHandler();
    }

    getNeededForm() {
        if (this.state.formType) {
            // return <GenericForm {...this.state} />;
            switch (this.state.formType) {
                case 'cups': return <CupForm {...this.state} />;
                case 'packs': return <CupForm {...this.state} />;
                case 'cover': return <CoverForm {...this.state} />;
                case 'straws8': return <Straws8Form {...this.state} />;
                case 'straws': return <StrawsForm {...this.state} />;
                case 'woodStick': return <WoodStickForm {...this.state} />;
                case 'cuffs': return <CuffsForm {...this.state} />;
                case 'supports': return <SupportsForm {...this.state} />;
            }
        }
        return null;
    }

    loadDataHandler = () => {
        firebase.firestore()
            .collection('prices')
            .get()
            .then(data => {
                const formDetail = data.docs.find(item => item.id.includes(this.props.match.params.id)).data();
                this.setState({
                    formData: 'sizes' in formDetail ? formDetail.sizes : formDetail,
                    formType: formDetail.type
                });

            });

        // firebase.firestore()
        //     .collection('prices')
        //     .doc(' redGofra')
        //     .get().then(res => {
        //         firebase.firestore()
        //             .collection('prices')
        //             .doc('whiteCup')
        //             .set(res.data());
        //     });
    };

    render() {
        const images = [{
            original: photo,
            thumbnail: photo,
        }];

        return (
            <div className="row">
                <div style={{textAlign: 'center', fontSize: '20px', fontWeight: '600', marginBottom: '12px'}} className="col-12">{localStorage.getItem('title')}</div>
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
