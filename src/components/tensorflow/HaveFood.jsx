import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Icon,
  Container,
  Divider,
  Header,
} from 'semantic-ui-react';

const HaveFood = () => {
  return (
    <Container>
      <Container>&nbsp;</Container>

      <Container textAlign="justified">
        <Header as="h2">I have food to share, what now?</Header>
        <Divider />
        <p>
          If you have <b>untouched</b> leftovers to share, please follow the
          steps below to share them:
        </p>
        <ul class="add-leftover-steps">
          <li>Register for an account and/or log in.</li>
          <li>
            Click the&nbsp;
            <Button as={Link} to="/add-leftover" animated="fade">
              <Button.Content visible>
                <Icon name="add" /> Add Leftover
              </Button.Content>
              <Button.Content hidden>
                <Icon color="red" name="heart" /> Add Love
              </Button.Content>
            </Button>
            <br />
            <em>
              The button above works to test the AI camera feature, but you
              won't be able to save your leftovers until you register and/or log
              in.
            </em>
          </li>
          <li>
            Take a picture of your food and select an option from the suggestion
            list.
          </li>
          <li>Enter the expiration date and the quantity of your leftover.</li>
        </ul>
      </Container>
    </Container>
  );
};

export default HaveFood;
