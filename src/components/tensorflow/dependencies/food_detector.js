// dependencies
// npm install "@tensorflow/tfjs"
// npm i @tensorflow/tfjs-node

tf = require('@tensorflow/tfjs')

path = 'http://127.0.0.1:8000/static/models/model.json'

// async function getModel() { return await tf.loadGraphModel(path + '/model.json')} 

async function runTest() {
  const webcamElement = document.getElementById('webcam');
  const webcam = await tf.data.webcam(webcamElement);
  const model = await tf.loadGraphModel(path);

  while (true) {
        const img = await webcam.capture();
        const result = await model.predict(img);
    
        document.getElementById('console').innerText = `
          prediction: ${result[0].className}\n
          probability: ${result[0].probability}
        `;
        // Dispose the tensor to release the memory.
        img.dispose();
    
        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
      }

  console.log(model)
}

runTest();


// var goog = goog || {};

// const tfjsCoreSrcIndex = goog.require('google3.third_party.javascript.tfjs.tfjs_core.src.index');

// prepareImageInput(image, inputTensorMetadata) {
//   let imageTensor =
//       tfjsCoreSrcIndex.browser.fromPixels(image, /* numChannels= */ 3);

//   // Resize the query image according to the model input shape.
//   imageTensor = tfjsCoreSrcIndex.image.resizeBilinear(
//       imageTensor,
//       [inputTensorMetadata['shape'][2], inputTensorMetadata['shape'][1]],
//       false);

//   // Map to the correct input shape, range and type. The models expect float
//   // inputs in the range [0, 1].
//   imageTensor = imageTensor.toFloat().div(255).expandDims(0);

//   return imageTensor;
// }

// const imageTensor = this.prepareImageInput(image, inputTensorMetadata);

// tensorflowjs_converter \
//     --input_format=tf_hub \
//     'https://tfhub.dev/google/aiy/vision/classifier/food_V1/1' \
//     /mobilenet/web_model