import React, { useContext, useState } from 'react';
import { LeftoverContext } from '../../LeftoverContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function ClaimModal({ setModal, leftover }) {
    const { api_url } = useContext(LeftoverContext);
    const [claim, setClaim] = useState()
    const claimRequest = {
        url: `${api_url}/orders/`,
        config: {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        },
        reqBody: {
            leftover: leftover.id,
        },
    };

    function ClaimLeftover(claimRequest) {
        // axios post request to orders
        axios
            .post(claimRequest.url, claimRequest.reqBody, claimRequest.config)
            .then(res => {
                console.log(res.data);
                setClaim(res.data)
            })
            // .then(setModal())
            .catch(error => console.error);
    }
    return (
        <div>
            {claim ? <Redirect to={`/claims/`} /> : ''}
            <h2>Lets Claim this leftover</h2>
            <button onClick={() => ClaimLeftover(claimRequest)}>
                Claim Leftover
            </button>
            <button onClick={() => setModal('')}>Cancel</button>
        </div>
    );
}

export default ClaimModal;
