import { transform } from '@babel/core';
import { render } from '@testing-library/react';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { LeftoverContext } from '../../LeftoverContext';

import { Container, Button, Icon, Grid } from 'semantic-ui-react';
import SelectButton from './SelectButton';
import * as d3 from 'd3';
import csvData from './dependencies/labels.csv';
import axios from 'axios';


const local_address = process.env.REACT_APP_LOCAL_ADDRESS;

const tf = require('@tensorflow/tfjs');

const path = `${local_address}/models/model.json`;


// runTest();

const LeftoverTensor = ({ setFormDataProp, setFoodImage }) => {
    const vid = useRef(null);
    const predictionConsole = useRef(null);
    const canvas = useRef(null);
    const hiddenField = useRef(null);

    const { api_url } = useContext(LeftoverContext);

    const [predictions, setPredictions] = useState();

    const [labels, setLabels] = useState();
    const [webcam, setWebcam] = useState();
    const [model, setModel] = useState();
    const [title, setTitle] = useState();
    const [selectedLabel, setSelectedLabel] = useState();

    async function populateForm(label){
        const formData = new FormData()
        // const imgData = canvas.current.toDataURL('image/png');
        console.log(canvas.current)
        await canvas.current.toBlob(blob => {
            formData.append('title', label);
            let file = new File([blob], label.toLowerCase() + '.png', { type: "image/png" })
            console.log("THIS IS THE LABEL", label.toLowerCase() + '.png' )
            formData.append(
                'image',
                file                
            );

            const url = `${api_url}/food-images/`;


            console.log(formData.get('image'))
            console.log(formData.get('title'))
    
    
            const config = {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
    
            axios
                .post(url, formData, config)
                .then(res => {
                    console.log(res);
                    setFoodImage(res.data);
                })
                .catch(error => console.error);

            setFormDataProp(formData);
        });
        // hiddenField.current.setAttribute("value", imgData);
        
    }

    function selectTag(ev){
        // setSelectedLabel(ev.target.innerText.split()[0])
        const label = ev.target.value;
        populateForm(label)
    }


    useEffect(() => {
        function isMobileDevice() {
            console.log('INSIDE MOBILE DEVICE FUNC')
            return (
                typeof window.orientation !== 'undefined' ||
                navigator.userAgent.indexOf('IEMobile') !== -1
            );
        }
        console.log('IS MOBILE DEVICE', isMobileDevice());
    }, []);


    // SETUP
    useEffect(() => {
        async function runSetup() {
            // Load labels from CSV file
            const data = await d3.csv(csvData);
            setLabels(data.map(d => d.name).slice(1));
            // Start webcam stream
            const webcamElement = vid.current;
            const webcamConfig = {
                facingMode: 'environment',
                resizeWidth: 192,
                resizeHeight: 192,
            };
            setWebcam(await tf.data.webcam(webcamElement, webcamConfig));
            setModel(await tf.loadGraphModel(path));
        }
        runSetup();
    }, []);



    async function runPrediction() {
        // PREDICTION RUN
        const img = await webcam.capture();
        // console.log("THIS IS MY IMAGE:", tf_node.node.encodeJpeg(img))
        // img.arraySync() -- image array


        const imgArray = img.arraySync();
        const flatArray = [];
        imgArray.forEach(row =>
            row.forEach(col =>
                col.forEach((pixel, pixelI) => {
                    flatArray.push(pixel);
                    if (pixelI >= 2) flatArray.push(255); // Add alpha channel value (255 == 1)
                })
            )
        );
        const clampedArr = new Uint8ClampedArray(flatArray);
        const imgData = new ImageData(clampedArr, 192); // Width of the web camera feed
        const ctx = canvas.current.getContext('2d');
        ctx.putImageData(imgData, 0, 0);
        window.clampedArr = clampedArr;

        

        const processed_img = img.expandDims(0).toFloat().div(255);
        const result = await model.predict(processed_img);
        // const prediction = await tf.argMax(result, 1);
        // const labelIndex = prediction.arraySync().shift();
        const topK = tf.topk(result, 5);
        const predictedLabels = topK['indices']
            .arraySync()
            .shift()
            .map(i => labels[i]);
        const predictedProbs = topK['values'].arraySync().shift();

        console.log(predictions);

        setPredictions(
            predictedLabels.map(
                (val, i) => ({val: val, text: `${val} ${Math.round(predictedProbs[i] * 100)}%`})
            )
        );
        // img.dispose(); This image object needs to be passed down
    }

    return (
        <Container>
            <h1>{vid.current ? vid.current.innerText : 'Not Loaded'}</h1>

            
            <video
                style={{transform:"scale(130%)", margin:"0 auto", display:"block"}}
                ref={vid}
                autoPlay
                playsInline
                muted
                id="webcam"
                width="192"
                height="192"
            >
                Some video
            </video>
            <Button style={{margin:"50px auto", display:"block"}}  size='huge' onClick={() => runPrediction()}><Icon name="camera retro" />CAPTURE FOOD</Button>
            <div ref={predictionConsole} id="console" style={{width:"100%", textAlign:"center"}}>
                <canvas style={{display: "block", margin:"20px auto"}} width="192" height="192" ref={canvas}></canvas>
            {predictions ? (
                <>
            <h2>Choose prediction or create label</h2>
                </>
            ) : ''}
                {predictions
                    ? predictions.map(label => <Button onClick={selectTag} style={{fontSize:"2rem", margin:"5px"}} value={ label.val }>{ label.text }</Button> )
                    : 'NO PREDICTIONS YET'}
                    {predictions ? <Button style={{fontSize:"2rem", margin:"5px"}}>{ "Add my own label" }</Button>: ''}
            </div>

        </Container>
        
    );
};

export default LeftoverTensor;
