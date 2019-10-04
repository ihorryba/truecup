import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Card.module.scss';

const card = props => (
    <div className={`${'col-12 col-sm-6 col-lg-4'} ${classes.Card}`}>
        <Link to={props.url + props.id} style={{ display: 'block', height: '100%', width: '100%' }}>
            <div style={{ backgroundImage: `url(${props.photo})` }} className={classes.PhotoCtn} />
            <div className={classes.Text}>
                <p>{props.name}</p>
            </div>
        </Link>
    </div>
);

export default card;
