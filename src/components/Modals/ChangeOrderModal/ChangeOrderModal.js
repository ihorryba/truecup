import React, { Component } from 'react';

import classes from './ChangeOrderModal.module.scss';
import Button from 'react-bootstrap/Button';

class ChangeOrderModal extends Component {

    clickHandler = (event) => {
        this.props.click(event);
    };

    render() {
        return (
            <div className={classes.Back}>
                <div className={`${'row'} ${classes.Ctn}`}>
                    <div className={`${'col-12 col-sm-6 col-lg-4'} ${classes.Modal}`}>
                        <div className={classes.Header}>
                            {this.props.header}
                        </div>
                        <div className={classes.Message}>
                            {this.props.children}
                        </div>
                        <div className={classes.BtnGroup}>
                            <Button style={{backgroundColor: 'black', border: 'black'}} onClick={this.clickHandler.bind(this, true)} variant="primary" type="button">Так</Button>
                            <Button style={{backgroundColor: 'black', border: 'black'}} onClick={this.clickHandler.bind(this, false)} variant="primary" type="button">Ні</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeOrderModal;
