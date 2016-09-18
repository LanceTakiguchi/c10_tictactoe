
$.ajax({
  url: 'http://www.opentdb.com/api.php?amount=10',
  headers: {
  	"Access-Control-Allow-Origin": "*",
  	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  	"Access-Control-Allow-Headers": "Content-Type"
  },
  dataType: 'jsonp',
  jsonp: 'jsonp',
  method: 'get',
  crossDomain: true,
  success: function (response) {
    console.log("response: ");
    // var question = response.results[0].question;
    // $(".questionboard").append(question);
  }
});

var gameState = [];
var boardSizes = [3,9,20];

var size = boardSizes[Math.floor(Math.random()*3)];
var size = 9;

for (var i=0; i<size; i++) {
	gameState[i] = [];
	for (var j=0; j<size; j++) {
		gameState[i][j] = ' ';
	}
}



gameState = [['x','','','x','','','x','',''],
						 ['','x','','x','','','x','',''],
						 ['','x','x','','','','x','',''],
						 ['','x','','x','','','x','',''],
						 ['','x','','x','','','x','',''],
						 ['','x','','x','','','x','',''],
						 ['','x','','x','','','x','',''],
						 ['','x','','x','','','x','',''],
						 ['','','x','x','','','x','','']];

console.log(checkWin(2,2,4,'x'));


function checkWin(i,j,numberOfSpots,XorO) {
	if (checkVertical(i,j,numberOfSpots,XorO) || checkUpperDiagonal(i,j,numberOfSpots,XorO) || checkHorizontal(i,j,numberOfSpots,XorO) || checkLowerDiagonal(i,j,numberOfSpots,XorO)) {
		return true;
	}
	return false;
}


function checkVertical(i,j,numberOfSpots,XorO) {
	var count = 1;
	var step = 1;
	while(gameState[i-step]) {
		if (gameState[i-step][j] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	step = 1;
	while(gameState[i+step]) {
		if (gameState[i+step][j] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	return count === numberOfSpots;
}

function checkUpperDiagonal(i,j,numberOfSpots,XorO) {
	var count = 1;
	var step = 1;
	while(gameState[i+step]) {
		if (gameState[i+step][j-step] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	step = 1;
	while(gameState[i-step]) {
		if (gameState[i-step][j+step] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	return count === numberOfSpots;
}

function checkHorizontal(i,j,numberOfSpots,XorO) {
	var count = 1;
	var step = 1;
	while(gameState[i][j-step]) {
		if (gameState[i][j-step] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	step = 1;
	while(gameState[i][j+step]) {
		if (gameState[i][j+step] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	return count === numberOfSpots;
}

function checkLowerDiagonal(i,j,numberOfSpots,XorO) {
	var count = 1;
	var step = 1;
	while(gameState[i-step]) {
		if (gameState[i-step][j-step] === XorO) {
			count++;
			step++;
		} else {
			step = 1;
			break;
		}
	}
	step = 1;
	while(gameState[i+step]) {
		if (gameState[i+step][j+step] === XorO) {
			count++;
			step++;
		} else {
			break;
		}
	}
	return count === numberOfSpots;
}
