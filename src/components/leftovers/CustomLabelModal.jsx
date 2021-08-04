import React, { useContext, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { useEffect } from 'react';

function CustomLabelModal({ setModal, callBack, imageData }) {
  const canvas = useRef();
  const input = useRef();
  const [claim, setClaim] = useState();
  const [inputCustomLabel, setInputCustomLabel] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = e => {
    setInputCustomLabel(e.target.value);
  };

  useEffect(() => {
    if (open) {
      const ctx = canvas.current.getContext('2d');
      ctx.putImageData(imageData, 0, 0);
      input.current.focus();
    }
  }, [open, imageData]);

  return (
    <div>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={
          <Button style={{ fontSize: '2rem', margin: '5px' }}>
            Add my own label
          </Button>
        }
        centered
      >
        <Header icon>
          {/* <Icon name="food" /> */}
          <canvas
            ref={canvas}
            style={{ display: 'block', margin: '20px auto' }}
            width="192"
            height="192"
          ></canvas>
          What custom label would you give this img?
          <input
            style={{
              fontSize: '3rem',
              margin: '30px auto 20px',
              display: 'block',
              background: 'none',
              color: 'white',
              outline: 'none',
              border: 'none',
              borderBottom: '2px solid #ccc',
            }}
            type="text"
            value={inputCustomLabel}
            onChange={handleChange}
            ref={input}
          />
        </Header>
        <Modal.Actions>
          <Button
            basic
            color="green"
            inverted
            onClick={() => callBack(inputCustomLabel)}
          >
            <Icon name="checkmark" /> Submit Custom Label
          </Button>
          <Button color="yellow" inverted onClick={() => setOpen(false)}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default CustomLabelModal;
