/**
 * Created by OF on 9/14/16.
 */

$(document).ready(function() {

    initializeAudioVisualizer(document.getElementById('audio'));

});

$(document).ready(closeButton);
var whos_turn = 'x';

var gameSize = null;

var gameState = [];

    var layers = 0;
    var increment = true;

//SCRIPT ===========================================

function initializeAudioVisualizer(audio){
    var audCtx = new AudioContext();
    var analyser = audCtx.createAnalyser();
    var audioSrc=null;

    if(audioSrc!==null){
        audioSrc.disconnect();
    }
    audioSrc = audCtx.createMediaElementSource(audio);
    // we have to connect the MediaElementSource with the analyser
    audioSrc.connect(analyser);
    analyser.connect(audCtx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    // analyser.fftSize = 64;
    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // we're ready to receive some data!
    var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 10, //width of the meters in the spectrum
        gap = 2, //gap between meters
        capHeight = 2,
        capStyle = '#fff',
        meterNum = 500, //count of the meters
        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
    ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0,0,0,1);
    gradient.addColorStop(1, '#f00');
    gradient.addColorStop(0.5, '#ff0');
    gradient.addColorStop(0, '#f00');
    // loop
    function renderFrame() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };
            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
        }
        requestAnimationFrame(renderFrame);

    }
    renderFrame();
}


function closeButton() {
    $(".button").click(function () {

        var player1_name = "DJ " + $("#player1_name").val();
        var player2_name = "DJ " + $("#player2_name").val();
        $("#DJ1").append(player1_name);
        $("#DJ2").append(player2_name);
        $(".front_page").slideToggle(1500);
        $('.gamesquare').slideToggle(3000);
    });

    $(".board_size").click(function () {
        gameSize = +$(this).data('size');
        for (var i = 0; i < gameSize; i++) {
            gameState[i] = [];
            for (var j = 0; j < gameSize; j++) {
                gameState[i][j] = ' ';
            }
        }
        loadSquares();
    });
}
function loadSquares() {
    var $gameboard = $('.gameboard');
    for (var i = 0; i < gameSize; i++) {
        var row = $('<div>').addClass('row' + i);
        $gameboard.append(row);
        for (var j = 0; j < gameSize; j++) {
            var square = $('<div>').addClass('gamesquare').data('column', j).data('row', i);
            $('.row' + i).append(square);
        }
    }
    //---------------- making size of squares appropriate vs number of squares
    if (gameSize == 3) {
        $(".gamesquare").addClass('gamesquare3');
    }
    else if (gameSize == 9) {
        $(".gamesquare").addClass('gamesquare9');
    }
    else {
        $(".gamesquare").addClass('gamesquare20');
    }
    loadclickhandlers();
    $(".gamesquare").hide();
}

function loadclickhandlers() {
    $('.gamesquare').click(position_tracker);
    $('.gamesquare').click(music_layering);
    function music_layering(){
        console.log(layers);
        if(increment) {
            layers++;
            if(layers === 7){
                increment = false;
            }
        }
        else{
            layers--;
            if(layers === 1){
                increment = true;
            }
        }
        var currentTime = $("#audio")[0].currentTime;
        switch(layers){
            case 1:
                $("#audio").attr('src', 'music%20layers/layer1.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
            case 2:
                $("#audio").attr('src', 'music%20layers/layer2.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
            case 3:
                $("#audio").attr('src', 'music%20layers/layer3.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
            case 4:
                $("#audio").attr('src', 'music%20layers/layer4.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
            case 5:
                $("#audio").attr('src', 'music%20layers/layer5.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
            case 6:
                $("#audio").attr('src', 'music%20layers/layer6.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
            case 7:
                $("#audio").attr('src', 'music%20layers/layer7.mp3');
                $("#audio")[0].currentTime = currentTime;
                break;
        }
    }
}

function position_tracker() {
    var row = $(this).data('row');
    var column = $(this).data('column');

    if (whos_turn == 'x') {
        gameState[row][column] = 'x';
        var player1 = $('<div>').addClass('playerX');
        $(this).append(player1);
        whos_turn = 'o';
    }
    else if (whos_turn == 'o') {
        gameState[row][column] = 'o';
        var player2 = $('<div>').addClass('playerO');
        $(this).append(player2);
        whos_turn = 'x';
    }
}




//Win Condition functions
function checkWin(i, j, numberOfSpots, XorO) {
    if (checkVertical(i, j, numberOfSpots, XorO) || checkUpperDiagonal(i, j, numberOfSpots, XorO) || checkHorizontal(i, j, numberOfSpots, XorO) || checkLowerDiagonal(i, j, numberOfSpots, XorO)) {
        return true;
    }
    return false;
}


function checkVertical(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkUpperDiagonal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j - step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkHorizontal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i][j - step]) {
        if (gameState[i][j - step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i][j + step]) {
        if (gameState[i][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkLowerDiagonal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j - step] === XorO) {
            count++;
            step++;
        } else {
            step = 1;
            break;
        }
    }
    step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}