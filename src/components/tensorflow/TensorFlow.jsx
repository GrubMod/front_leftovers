import { render } from '@testing-library/react';
import React, { useRef, useEffect, useState } from 'react';
import SelectButton from './SelectButton' 

// console.log("THIS IS MY CSV")
// const reader = new FileReader();
// console.log(reader.readAsText(csv))

const tf = require('@tensorflow/tfjs');
// const tf_node = require('@tensorflow/tfjs-node');

const path = 'http://localhost:3000/models/model.json';

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

const TensorFlow = () => {
    const vid = useRef(null);
    const predictionConsole = useRef(null);
    const canvas = useRef(null);

    const [predictions, setPredictions] = useState();

    const [labels, setLabels] = useState();
    const [webcam, setWebcam] = useState();
    const [model, setModel] = useState();

    // SETUP
    useEffect(() => {
        async function runSetup() {
            const csvFile = await csvReader(
                'http://localhost:3000/models/labels.csv'
            );

            setLabels(
                csvFile
                    .split('\r')
                    .slice(1)
                    .map(i => i.split(',')[1])
            );

            const webcamElement = vid.current;
            setWebcam(await tf.data.webcam(webcamElement));
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
        imgArray.forEach(row => row.forEach((col) => col.forEach((pixel, pixelI) => { 
            flatArray.push(pixel) 
            if (pixelI >= 2) flatArray.push(255) // Add alpha channel value (255 == 1)
        })))
        const clampedArr = new Uint8ClampedArray(flatArray)
        const imgData = new ImageData(clampedArr, 192) // Width of the web camera feed
        const ctx = canvas.current.getContext('2d');
        ctx.putImageData(imgData, 0, 0)
        window.clampedArr = clampedArr


        const processed_img = img.expandDims(0).toFloat().div(255);
        const result = await model.predict(processed_img);
        // const prediction = await tf.argMax(result, 1);
        // const labelIndex = prediction.arraySync().shift();
        const topK = tf.topk(result, 5)
        const predictedLabels = topK['indices'].arraySync().shift().map(i => labels[i])
        const predictedProbs = topK['values'].arraySync().shift()
            // tf
            //     .topk(result, 5)
            //     ['indices'].arraySync()
            //     .shift()
            //     .map(i => labels[i])
            // );
        console.log(predictions)
        // console.log(labels[labelIndex]);
        setPredictions(predictedLabels.map((val, i) => `${val} ${Math.round(predictedProbs[i]*100)}%`));
        // img.dispose(); This image object needs to be passed down
    }

    return (
        <div>
            <h1>{vid.current ? vid.current.innerText : 'Not Loaded'}</h1>
            <button onClick={() => console.log(vid.current)}>
                REF CONSOLE LOG
            </button>
            <button onClick={() => runPrediction()}>RUN TFLOW</button>
            <video
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
            <div ref={predictionConsole} id="console">
                { 
                predictions ? (
                    predictions.map( p => <SelectButton label={p} /> )
                ) : 'NO PREDICTIONS YET' 
                }
            </div>
            <canvas width="192" height="192" ref={canvas}></canvas>
        </div>
    );
};

export default TensorFlow;
