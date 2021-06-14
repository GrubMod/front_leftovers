import { transform } from '@babel/core';
import { render } from '@testing-library/react';
import React, { useRef, useEffect, useState } from 'react';
import { Container, Button, Icon, Grid } from 'semantic-ui-react';
import SelectButton from './SelectButton';

const local_address = process.env.REACT_APP_LOCAL_ADDRESS;
// console.log("THIS IS MY CSV")
// const reader = new FileReader();
// console.log(reader.readAsText(csv))

const tf = require('@tensorflow/tfjs');
// const tf_node = require('@tensorflow/tfjs-node');

const path = `${local_address}/models/model.json`;

// async function getModel() { return await tf.loadGraphModel(path + '/model.json')}

function csvReader(url) {
    return fetch(url).then(function (response) {
        let reader = response.body.getReader();
        let decoder = new TextDecoder('utf-8');

        return reader.read().then(function (result) {
            return decoder.decode(result.value);
        });
    });
}

// runTest();

const LeftoverTensor = ({ setFormDataProp }) => {
    const vid = useRef(null);
    const predictionConsole = useRef(null);
    const canvas = useRef(null);
    const hiddenField = useRef(null);

    const [predictions, setPredictions] = useState();

    const [labels, setLabels] = useState();
    const [webcam, setWebcam] = useState();
    const [model, setModel] = useState();
    const [title, setTitle] = useState();
    const [selectedLabel, setSelectedLabel] = useState();

    function populateForm(){
        const imgData = canvas.current.toDataURL('image/png');
        hiddenField.current.setAttribute("value", imgData);

        const formData = new FormData()
        formData.append('title', title);
        formData.append(
            'image',
            hiddenField.current.querySelector('input').files[0],
            selectedLabel
        );
        setFormDataProp(formData)
    }

    function selectTag(ev){
        // setSelectedLabel(ev.target.innerText.split()[0])
        const label = ev.target.innerText.split()[0];
        console.log("THIS IS MY LABEL", label)
        populateForm()
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
            const csvFile = await csvReader(
                `${local_address}/models/labels.csv`
            );

            setLabels(
                csvFile
                    .split('\r')
                    .slice(1)
                    .map(i => i.split(',')[1])
            );

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
        // tf
        //     .topk(result, 5)
        //     ['indices'].arraySync()
        //     .shift()
        //     .map(i => labels[i])
        // );
        console.log(predictions);
        // console.log(labels[labelIndex]);
        setPredictions(
            predictedLabels.map(
                (val, i) => `${val} ${Math.round(predictedProbs[i] * 100)}%`
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
            {predictions ? <h2>Choose prediction or create label</h2> : ''}
                {predictions
                    ? predictions.map(label => <Button onClick={selectTag} style={{fontSize:"2rem", margin:"5px"}}>{ label }</Button> )
                    : 'NO PREDICTIONS YET'}
                    {predictions ? <Button style={{fontSize:"2rem", margin:"5px"}}>{ "Add my own label" }</Button>: ''}
            </div>
            <canvas style={{display: "block", margin:"20px auto"}} width="192" height="192" ref={canvas}></canvas>
            <input
              ref={hiddenField}
              type="hidden"
              id="image"
              accept="image/png, image/jpeg"
              required
            />
        </Container>
        
    );
};

export default LeftoverTensor;
