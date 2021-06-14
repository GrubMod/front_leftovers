import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LeftoverContext } from "../../LeftoverContext";
import {
  Grid,
  Button,
  Icon,
  Container,
  Divider,
  Header,
} from "semantic-ui-react";
import Leftover from "./Leftover";

function Leftovers() {
  const [leftovers, setLeftovers] = useState([]);
  const { state, api_url } = useContext(LeftoverContext);
  const [myFridge, setMyFridge] = useState(false);

  useEffect(() => {
    axios
      .get(`${api_url}/leftovers/`)
      .then((res) => {
        setLeftovers(res.data);
      })
      .catch(console.error);
  }, [api_url]);

  return (
    leftovers && (
      <Container>
        {myFridge ? (
          <Button onClick={() => setMyFridge((b) => !b)} active>
            <Icon name="close" />
            Close My Fridge
          </Button>
        ) : (
          <Button onClick={() => setMyFridge((b) => !b)} color="teal">
            <Icon name="food" />
            Show My Fridge
          </Button>
        )}

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
          <p>
            These are the leftovers that currently listed in your area.  
          </p>
        </Container>
        )}

        <Grid centered>
          {leftovers
            .filter((leftover) => {
              if (myFridge) return leftover.owner === state.username;
              return leftover.is_public;
            })
            .map((leftover, i) => (
              <Leftover key={i} leftover={leftover} />
            ))}
        </Grid>
      </Container>
    )
  );
}

export default Leftovers;
