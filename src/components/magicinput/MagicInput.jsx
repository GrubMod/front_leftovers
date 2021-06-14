import React, { useState, useRef } from 'react';
import './magicinput.css';

const MagicInput = ({ tag, txt }) => {

    const mainElem = React.createElement(tag);

    // const input = useRef();
    let input;
    const [hide, setHide] = useState(true);
    const [text, setText] = useState(txt);
    const [inputText, setInputText] = useState();
    const [tempText, setTempText] = useState();

    const startEdit = ev => {
        setInputText(text)
        setTempText(text)
        setHide(h => !h)
        input.focus()        
    }

    const stopEdit = ev => {
        console.log("INSIDE STOP EDIT")
        console.log("inputText", inputText)
        console.log("tempText", tempText)
        console.log("text", text)
        console.log("input", input)
        setText(inputText)
        setHide(h => !h)
    }

    const handleChange = e => {
        setInputText( e.target.value );

    };
    const handleKeyDown = ev => {
        if (ev.keyCode === 13) {
          input.blur()
        } else if (ev.keyCode === 27) {
            console.log("INSIDE KEY DOWN ELSE IF")
            console.log("inputText", inputText)
            console.log("tempText", tempText)
            console.log("text", text)
            console.log("input", input)
            input.value = tempText;
            console.log(input.value)
            input.blur()
        }
      }

    return (
        <div>
            <mainElem.type>
                <span onClick={startEdit}>{hide ? text : ''}</span>

                    <input
                        ref={elem => {input = elem;}}
                        className="magic"
                        style={{width: hide ? 0 : 100}}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={stopEdit}
                        type="text"
                        value={inputText}
                    />

            </mainElem.type>
        </div>
    );
};

export default MagicInput;
