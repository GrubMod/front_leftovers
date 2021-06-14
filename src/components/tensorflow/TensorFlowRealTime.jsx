import React, { useRef, useEffect, useState } from 'react';

// console.log("THIS IS MY CSV")
// const reader = new FileReader();
// console.log(reader.readAsText(csv))

const tf = require('@tensorflow/tfjs');

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

// THE BIG IDEA IS TO RUN PREDICTION IN REAL TIME TAKING INTO ACCOUNT 
// CLIENT RESOURCES (gpu)

const TensorFlow = () => {
    const vid = useRef(null);
    const predictionConsole = useRef(null);

    // const [runTest, SetRunTest] = useState();
    const [predictions, setPredictions] = useState();
    const [ready, setReady] = useState();

    const SetRunTest = async () => {

        // SETUP
        const csvFile = await csvReader(
            'http://localhost:3000/models/labels.csv'
        );

        const labels = csvFile
            .split('\r')
            .slice(1)
            .map(i => i.split(',')[1]);

        const webcamElement = vid.current;
        const webcam = await tf.data.webcam(webcamElement);
        const model = await tf.loadGraphModel(path);

        // RUN
        const img = await webcam.capture();
        const processed_img = img
            .expandDims(0)
            .toFloat()
            .div(255);
        const result = await model.predict(processed_img);
        // const prediction = await tf.argMax(result, 1);
        // const labelIndex = prediction.arraySync().shift();

        // console.log(labels[labelIndex]);
        setPredictions(
            tf
                .topk(result, 5)
                ['indices'].arraySync()
                .shift()
                .map(i => labels[i])
        );
        img.dispose();
        await tf.nextFrame();
        setReady(Math.random())
        // while (true) {
        //     const img = await webcam.capture();
        //     const result = await model.predict(img);

        //     document.getElementById('console').innerText = `
        //       prediction: ${result[0].className}\n
        //       probability: ${result[0].probability}
        //     `; // Dispose the tensor to release the memory.
        //     img.dispose(); // Give some breathing room by waiting for the next animation frame to // fire.

        //     await tf.nextFrame();
        // }
    };

    useEffect(() => {
        if(ready) console.log("I'm ready")
        SetRunTest()
    }, [ready]);

    return (
        <div>
            <h1>{vid.current ? vid.current.innerText : 'Not Loaded'}</h1>
            <button onClick={() => console.log(vid.current)}>
                REF CONSOLE LOG
            </button>
            {/* <button onClick={() => runTest()}>RUN TFLOW</button> */}
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
            <div ref={predictionConsole} id="console">{predictions}</div>
        </div>
    );
};

export default TensorFlow;
