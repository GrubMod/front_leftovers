import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { LeftoverContext } from '../../LeftoverContext';
import axios from 'axios';
import Tags from './Tags';
import DeleteModal from './DeleteModal';
import ClaimModal from './ClaimModal';
import Expiration from './Expiration';
import {
    Button,
    Header,
    Container,
    Image,
    Card,
    Divider,
} from 'semantic-ui-react';

function LeftoverDetail(props) {
    const [claimClicked, setClaimClicked] = useState(false);
    const [leftover, setLeftover] = useState();
    const [ownerIsLoggedIn, setOwnerIsLoggedIn] = useState();
    const [editMode, setEditMode] = useState(false);
    const [editComplete, setEditComplete] = useState(false);
    const [tagsToAdd, setTagsToAdd] = useState();
    const { state, api_url } = useContext(LeftoverContext);

    // Fetches leftover detail
    useEffect(() => {
        axios
            .get(`${api_url}/leftovers/${props.match.params.id}`)
            .then(res => {
                setLeftover(res.data);
            })
            .catch(console.error);
    }, [api_url, props]);

    // Checks if the leftover owner is the logged in user
    useEffect(() => {
        if (leftover && state.username === leftover.owner) {
            setOwnerIsLoggedIn(true);
            console.log('owner is logged in');
            setTagsToAdd([...leftover.tags]);
        }
    }, [leftover, state]);

    // Updates the leftover with the edits
    function updateLeftover(e) {
        e.preventDefault();
        const updateRequest = {
            url: `${api_url}/leftovers/${leftover.id}`,
            config: {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            },
            body: {
                // expiration: `${formData.expiration.value}:00Z`,
                // description: formData.description.value,
                tags: tagsToAdd,
                // is_public: formData.is_public.value,
                // is_available: formData.is_public.value,
            },
        };
        axios
            .patch(updateRequest.url, updateRequest.body, updateRequest.config)
            .then(res => setEditComplete(true))
            .catch();
        setEditMode(false);
    }

    return (
        <Container>
            {editComplete ? (
                <Redirect to={`/leftovers/${props.match.params.id}`} />
            ) : (
                ''
            )}

            {leftover ? (
                <Container>
                    <Header>{leftover.name}</Header>
                    <Container header={leftover.name}>
                        <Image
                            src={leftover.image.image}
                            alt={leftover.id}
                            wrapped
                            width="500"
                        />
                        <Expiration leftover={leftover} />
                        <Divider />
                        <Card.Content>
                            <Card.Description>
                                {leftover.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>{'@' + leftover.owner}</Card.Content>
                        <Tags
                            leftover={leftover}
                            editMode={editMode}
                            tagsToAdd={tagsToAdd}
                            setTagsToAdd={setTagsToAdd}
                        />
                        <Divider />
                    </Container>
                </Container>
            ) : (
                'No Leftover Detail'
            )}
            {state.loggedIn ? (
                ownerIsLoggedIn ? (
                    editMode ? (
                        <>
                            <DeleteModal leftover={leftover} />
                            <Button onClick={updateLeftover}>Done</Button>
                        </>
                    ) : (
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                    )
                ) : (
                    <>{leftover ? <ClaimModal leftover={leftover} /> : ''}</>
                )
            ) : (
              <p>
                You're signed out right now. To claim this leftover <Link to='/login'>log in</Link> or <Link to='/signup'>sign up</Link> .
              </p>
                
            )}
        </Container>
    );
}

export default LeftoverDetail;
