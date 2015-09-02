var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;

window.onload = function() {

  // grab our canvas
// canvasContext = document.getElementById( "meter" ).getContext("2d");

  // monkeypatch Web Audio
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // grab an audio context
  audioContext = new AudioContext();

  // Attempt to get audio input
  try {
    // monkeypatch getUserMedia
    navigator.getUserMedia = 
  	navigator.getUserMedia ||
  	navigator.webkitGetUserMedia ||
  	navigator.mozGetUserMedia;

    // ask for an audio input
    navigator.getUserMedia(
    {
      "audio": {
          "mandatory": {
              "googEchoCancellation": "false",
              "googAutoGainControl": "false",
              "googNoiseSuppression": "false",
              "googHighpassFilter": "false"
          },
          "optional": []
      },
    }, gotStream, didntGetStream);
  } catch (e) {
    alert('getUserMedia threw exception :' + e);
  }

}


function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
  // Create an AudioNode from the stream.
  mediaStreamSource = audioContext.createMediaStreamSource(stream);

  // Create a new volume meter and connect it.
  meter = createAudioMeter(audioContext);
  mediaStreamSource.connect(meter);

  // kick off the visual updating
  drawLoop();
}

var volAvg = [];
var sum;
var avg;

function drawLoop( time ) {
  var volume = meter.volume;
  volAvg.push(meter.volume);
  if (volAvg.length === 10) {
    console.log(volAvg.length)
    for (i=0; i<volAvg.length; i++) {
      sum = volAvg[i]++; 
      // console.log(volAvg[i]);
      // console.log(sum);
    }

    avg = sum / 1;
    // console.log(sum);
    // console.log(avg);

    if (avg > 0.02 && avg < 0.06) {
      rotateSlow();
      console.log('rotateSlow');
    } else if (avg > 0.06 ) {
      rotateFast();
      console.log('rotateFast');
    } 

    volAvg = [];
  }
 
  // set up the next visual callback
  rafID = window.requestAnimationFrame( drawLoop );
}
