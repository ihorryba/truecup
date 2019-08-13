import React from 'react';
import classes from './SubHeader.module.scss';

const subHeader = props => (
    <div className={classes.SubHeader}>
        <div className={classes.Line} />
        <div className={classes.Text}>{props.text}</div>
    </div>
);

export default subHeader;
