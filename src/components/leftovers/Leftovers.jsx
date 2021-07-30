import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LeftoverContext } from '../../LeftoverContext';
import {
  Grid,
  Button,
  Icon,
  Container,
  Divider,
  Header,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import Leftover from './Leftover';
import { Redirect } from 'react-router-dom';

function Leftovers() {
  const [leftovers, setLeftovers] = useState(null);
  const { state, api_url } = useContext(LeftoverContext);
  const [myFridge, setMyFridge] = useState(false);

  useEffect(() => {
    axios
      .get(`${api_url}/leftovers/`)
      .then(res => {
        console.log('THIS IS THE RESPONSE', res.data);
        setLeftovers(res.data);
      })
      .catch(console.error);
  }, [api_url]);

  return (
    leftovers && (
      <Container>
        <Container
          style={{ paddingTop: 20, paddingBottom: 30, textAlign: 'right' }}
        >
          {myFridge ? (
            <Button onClick={() => setMyFridge(b => !b)} active>
              <Icon name="close" />
              Close My Fridge
            </Button>
          ) : (
            <Button onClick={() => setMyFridge(b => !b)} color="teal">
              <Icon name="food" />
              Show My Fridge
            </Button>
          )}
        </Container>

        {myFridge ? (
          <div>
            <Container textAlign="justified">
              <Header as="h2">This is your fridge!</Header>
              <Divider />
              <p>
                Here you can track all of your private leftovers. You can also
                list your unwanted leftovers as <span>public</span> so that
                others may claim them
              </p>
            </Container>
          </div>
        ) : (
          <Container textAlign="justified">
            <Header as="h2">Leftovers in Your Area</Header>
            <Divider />
            <p>These are the leftovers that currently listed in your area.</p>
            {leftovers === null ? (
              <h3>
                Loading leftovers
                <Container>
                  <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                  </Dimmer>
                </Container>
              </h3>
            ) : (
              ''
            )}
          </Container>
        )}
        <Container style={{ marginTop: '30px' }}>
          <Grid centered>
            {leftovers.length === 0 ? (
              <Container>
                <br />
                <h3>No leftovers available.</h3>{' '}
              </Container>
            ) : (
              ''
            )}
            {leftovers
              .filter(leftover => {
                if (myFridge) return leftover.owner === state.username;
                return leftover.is_public;
              })
              .map((leftover, i) => (
                <Leftover key={i} leftover={leftover} />
              ))}
          </Grid>
        </Container>
      </Container>
    )
  );
}

export default Leftovers;
