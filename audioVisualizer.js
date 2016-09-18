/* *
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 *
 * licenced under the MIT license
 *
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 *
 * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;



// window.onload = function() {
//     var layers = 0;
//     var increment = true;

//     var layer1 = document.getElementById('layer1');
//     var layer2 = document.getElementById('layer2');
//     var layer3 = document.getElementById('layer3');
//     var layer4 = document.getElementById('layer4');
//     var layer5 = document.getElementById('layer5');
//     var layer6 = document.getElementById('layer6');
//     var layer7 = document.getElementById('layer7');
//     var layersObj = {
//         layer1: layer1,
//         layer2: layer2,
//         layer3: layer3,
//         layer4: layer4,
//         layer5: layer5,
//         layer6: layer6,
//         layer7: layer7
//     };
//     var audCtx = new AudioContext();
//     var analyser = audCtx.createAnalyser();
//     var audioSrc = audCtx.createMediaElementSource(layer1);

//     // we have to connect the MediaElementSource with the analyser
//     audioSrc.connect(analyser);
//     analyser.connect(audCtx.destination);
//     // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
//     // analyser.fftSize = 64;
//     // frequencyBinCount tells you how many values you'll receive from the analyser
//     var frequencyData = new Uint8Array(analyser.frequencyBinCount);

//     // we're ready to receive some data!
//     var canvas = document.getElementById('canvas'),
//         cwidth = canvas.width,
//         cheight = canvas.height - 2,
//         meterWidth = 10, //width of the meters in the spectrum
//         gap = 2, //gap between meters
//         capHeight = 2,
//         capStyle = '#fff',
//         meterNum = 500, //count of the meters
//         capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
//     ctx = canvas.getContext('2d'),
//         gradient = ctx.createLinearGradient(0,0,0,1);
//     gradient.addColorStop(1, '#f00');
//     gradient.addColorStop(0.5, '#ff0');
//     gradient.addColorStop(0, '#f00');
//     // loop
//     function renderFrame() {
//         var array = new Uint8Array(analyser.frequencyBinCount);
//         analyser.getByteFrequencyData(array);
//         var step = Math.round(array.length / meterNum); //sample limited data from the total array
//         ctx.clearRect(0, 0, cwidth, cheight);
//         for (var i = 0; i < meterNum; i++) {
//             var value = array[i * step];
//             if (capYPositionArray.length < Math.round(meterNum)) {
//                 capYPositionArray.push(value);
//             };
//             ctx.fillStyle = capStyle;
//             //draw the cap, with transition effect
//             if (value < capYPositionArray[i]) {
//                 ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
//             } else {
//                 ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
//                 capYPositionArray[i] = value;
//             };
//             ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
//             ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
//         }
//         requestAnimationFrame(renderFrame);

//     }
//     renderFrame();
//     $('.gamesquare').click(function() {
//         console.log('clicked');
//     });
//     $('.gamesquare').click(music_layering);
//     function music_layering(){
//         console.log(layers);
//         if(increment) {
//             layers++;
//             if(layers === 7){
//                 increment = false;
//             }
//         }
//         else{
//             layers--;
//             if(layers === 1){
//                 increment = true;
//             }
//         }
//         $('.music').prop('muted', true);
//             switch(layers){
//                 case 1:
//                     $("#layer1").prop('muted', false);
//                     break;
//                 case 2:
//                     $("#layer2").prop('muted', false);
//                     break;
//                 case 3:
//                     $("#layer3").prop('muted', false);
//                     break;
//                 case 4:
//                     $("#layer4").prop('muted', false);
//                     break;
//                 case 5:
//                     $("#layer5").prop('muted', false);
//                     break;
//                 case 6:
//                     $("#layer6").prop('muted', false);
//                     break;
//                 case 7:
//                     $("#layer7").prop('muted', false);
//                     break;
//             }
//     }
//     $('.gamesquare').click(function() {
//         audCtx = new AudioContext();
//         analyser = audCtx.createAnalyser();
//         audCtx.createMediaElementSource(layersObj["layer" + layers]);
//         audioSrc.connect(analyser);
//         analyser.connect(audCtx.destination);
//         frequencyData = new Uint8Array(analyser.frequencyBinCount);
//         renderFrame();
//     });
// };
