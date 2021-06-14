import React from 'react';
import { Card, Icon, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Tags from './Tags';
import Expiration from './Expiration';

function Leftover({ leftover }) {
    return (
        <Grid.Column mobile={15} tablet={6} computer={4}>
            <Card as={Link} to={`/leftovers/${leftover.id}`}>
                <Image src={leftover.image.image} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{leftover.name}</Card.Header>
                    <Card.Meta>
                        <span className="date">@{leftover.owner}</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Expiration leftover={leftover} />
                </Card.Content>
                <Card.Content extra>
                    <Tags leftover={leftover} />
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

export default Leftover;
