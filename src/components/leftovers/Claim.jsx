import React from 'react';
import { Link } from 'react-router-dom';
import Tags from './Tags';
import Expiration from './Expiration';

const Claim = ({claim}) => {
    return (
        <div>
            <Link to={`/orders/${claim.id}`}>
                <img src={claim.leftover.image.image} width="200" alt={claim.leftover.name} />
                <h3>{claim.name}</h3>
            </Link>
        </div>
    );
};

export default Claim;
