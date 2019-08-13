import React from 'react';

import photo from '../../img/black.jpg';

import classes from './Card.module.scss';

const card = props => (
    <div className={`${'col-12 col-sm-6 col-lg-4'} ${classes.Card}`}>
        <a href="/" style={{ display: 'block', height: '100%', width: '100%' }}>
            <div style={{ backgroundImage: `url(${photo})` }} className={classes.PhotoCtn} />
            <div className={classes.Text}>
                <p>Cinque Terre</p>
            </div>
        </a>
    </div>
);

export default card;
