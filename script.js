//list of variables
var size_of_board = null;
var game_board_size = null;
var stored_game_data = null;
var its_player_ones_turn = null;


$(document).ready(function(){
    $("#new_game").click(function(){  //when the new game link is clicked, the game board is cleared of all elements.
        $(".game_board").empty();   //Without this, the squares would continue to append on tp of each other each time a new game is started.
    });
});

function create_game_board() {
    // game_board_size = 3;        //temporarily hard set game_board_size
    // size_of_board = 5;          //temporarily hard set to 3
    stored_game_data = [];      //reset stored_game_data to blank array
    its_player_ones_turn = true;        //at start of the game player one will start

    for (var row = 0; row < size_of_board; row++) {         //run through the rows from row 0 through the end of the game board
        stored_game_data[row] = [];         //create empty row of game data
        var row_of_divs = $('<div>');       //create a dom element of a row for cells to go into

        for (var column = 0; column < size_of_board; column++) {     //run through the columns from column 0 through the length of the game board
            stored_game_data[row][column] = null;      //create the empty cell in the array

            var cell = $('<div>').addClass('cell').attr('row',row).attr('column', column).addClass('mark_spot');      //create the cell DOM element with attributes row and column
            row_of_divs.append(cell);       //append the cell to the row
        }
        $('.game_board').append(row_of_divs);      //append the row to the game board
    }
}

function player_make_move(){
  $('.mark_spot').click(area_checked);
}

function area_checked(){
  console.log("Clicked");
    var row = $(this).attr('row');
    var column = $(this).attr('column');

    console.log('row', row);
    console.log('column', column);

    if(stored_game_data[row][column] === null){     //check to see if the clicked cell is null/empty
        if(its_player_ones_turn){
            stored_game_data[row][column] = 1;    //if it is player ones turn put a one in the given cell of the game array
            check_for_wins(row, column);            //check for wins
        }else {
            stored_game_data[row][column] = 2;       //if it is player twos turn put a 2 in the given cell of the game array
            check_for_wins(row, column);                //check for wins
        }
        its_player_ones_turn = !its_player_ones_turn;       //if the person made a legitimate move then the players turn will switch
    }else {
        console.log('spot taken');      //not sure we need this case //leave it just in case there is something to account for
    }
    console.log(stored_game_data);
}

//set game board size
//game board size parameter is passed when the player clicks on the game board selection screen
function set_game_board_size(size) {
    game_board_size = size;
    num_of_winning_matches_needed(game_board_size);
    create_game_board();
    player_make_move();
}

//build board dynamically based on chosen board size (visually)

//choose random # of matches needed to win
// function is called when the board size is selected.
// for boards larger than 3x3
function num_of_winning_matches_needed(size) {
    //if board is 3x3, # of matches needed to win will be 3
    if (size === 3) {
        winning_matches = 3;
        console.log("number of matches needed for 3x3 board: "+winning_matches);
    }
    //if board is 9x9
    //Math.Random gives random # from 0 - .9999[...]
    // Math.floor gives whole number, *3 + 3 multiplies whole number by 6 and adds 3 (minimum # of matches needed are 3).
    else if (size === 9) {
        winning_matches = Math.floor(Math.random() * 6 + 4);
        console.log("number of matches needed for 9x9 board: "+winning_matches);
    }
    //otherwise, for a 20x20 board,
    //Math.Random gives random # from 0 - .9999[...]
    // Math.floor gives whole number, *17 + 3 multiplies whole number by 17 and adds 3 (minimum # of matches needed are 3).
    else {
        winning_matches = Math.floor(Math.random() * 17 + 4);
        console.log("number of matches needed for 20x20 board: "+winning_matches);
    }
}



//add a single marker to the game board (visually)
function addMarkerToBoard(){

}

//add a single marker to the game array


//


//switch turn to the next player


//check for winning combinations


//end game: stop all movements, initiate end game screen


//retire from game: go to home screen


//function that will check if the currently clicked spot creates a win condition
function check_for_wins(clicked_row, clicked_column){
    var you_won = false;

    // var you_won = false;

    var current_row = null;
    var current_column = null;

    var clicked_cell = {'row': clicked_row, 'column': clicked_column};
    var direction_vector = {'row': null, 'column': null};
    var matches_connected = null;

    if(!you_won){
        //check row for wins
        matches_connected = 1;
        direction_vector = {row: 0, column: -1};                        //checking left
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 0, column: 1};                         //checking right
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if(matches_connected >= win_length)
            you_won = true;
        console.log('number matching in row: ' + matches_connected);
    }
    if(!you_won){
        //check columns for wins
        matches_connected = 1;
        direction_vector = {row: -1, column: 0};                        //checking up
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 1, column: 0};                        //checking down
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if(matches_connected >= win_length)
            you_won = true;
        console.log('number matching in column: ' + matches_connected);
    }
    if(!you_won){
        //check right diagonal for wins
        matches_connected = 1;
        direction_vector = {row: -1, column: -1};                           //checking up-left
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 1, column: 1};                             //checking down-right
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if(matches_connected >= win_length)
            you_won = true;
        console.log('number matching in diag1: ' + matches_connected);
    }
    if(!you_won){
        //check left diagonal for wins
        matches_connected = 1;
        direction_vector = {row: -1, column: 1};                        //checking up-right
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 1, column: -1};                        //checking down-left
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if(matches_connected >= win_length)
            you_won = true;
        console.log('number matching in diag2: ' + matches_connected);
    }
}


// //function that will check if the currently clicked spot creates a win condition
// function check_for_wins(clicked_row, clicked_column){
//     this.you_won = false;
//     // var you_won = false;
//
//
//     // this.clicked_row = clicked_row;
//     // this.clicked_column = clicked_column;
//     var row = clicked_row;
//     var column = clicked_column;
//
//     var current_row = null;
//     var current_column = null;
//
//     this.matches_connected = null;
//     // var matches_connected = null;
//
//     if(!you_won){
//         //check row for wins
//         matches_connected = 1;
//         find_matches_in_single_direction(0, -1);    //checking left
//         find_matches_in_single_direction(0, 1);     //checking right
//
//         console.log('number matching in row: ' + matches_connected);
//     }
//     if(!you_won){
//         //check row for wins
//         matches_connected = 1;
//         find_matches_in_single_direction(-1, 0);    //checking up
//         find_matches_in_single_direction(1, 0);     //checking down
//
//         console.log('number matching in column: ' + matches_connected);
//     }
//     if(!you_won){
//         //check right diagonal for wins
//         matches_connected = 1;
//         find_matches_in_single_direction(-1, -1);   //checking up-left
//         find_matches_in_single_direction(1, 1);     //checking down-right
//
//         console.log('number matching in diag1: ' + matches_connected);
//     }
//     if(!you_won){
//         //check left diagonal for wins
//         matches_connected = 1;
//         find_matches_in_single_direction(-1, 1);    //checking up-right
//         find_matches_in_single_direction(1, -1);    //checking down-left
//
//         console.log('number matching in diag2: ' + matches_connected);
//     }
// }


//looks for matches in the direction of movement passed by the parameters: row_movement and column_movement
function find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected) {
    var does_not_exist = false;     //variable to keep track if the new cell actually exists/ falls within the game board
    var does_not_match = false;     //variable to keep track if the new cell matches the original cell clicked

    current_row = parseInt(clicked_cell.row);
    current_column = parseInt(clicked_cell.column);

    row_movement = parseInt(direction_vector.row);
    column_movement = parseInt(direction_vector.column);

    while(!does_not_exist && !does_not_match){
        //don't just decrease column add the component parts of the row and column to the clicked cell
        current_row += row_movement;
        current_column += column_movement;

        //check to see if the cell exists
        if((0 <= current_row && current_row < game_board_size) &&
            (0 <= current_column && current_column < game_board_size)){   //check to see that current row and column are within the  scope of game board data
            if(stored_array[clicked_row][clicked_column] === stored_array[current_row][current_column]){   //if clicked cell's data equals current cell's data
                matches_connected++;         //increase the number of connected
                if(matches_connected >= win_length){
                    console.log('you won');
                    return matches_connected;
                }
            }else{  //numbers in the cells do not match in this direction
                does_not_match = true;
            }
        }else{  //the cell does not exist in the game board data
            does_not_exist = true;
        }
        return matches_connected;
    }
}


// //looks for matches in the direction of movement passed by the parameters: row_movement and column_movement
// function find_matches_in_single_direction(row_movement, column_movement) {
//     var does_not_exist = false;     //variable to keep track if the new cell actually exists/ falls within the game board
//     var does_not_match = false;     //variable to keep track if the new cell matches the original cell clicked
//
//     current_row = parseInt(clicked_row);
//     current_column = parseInt(clicked_column);
//
//     while(!does_not_exist && !does_not_match && !you_won){
//         //don't just decrease column add the component parts of the row and column to the clicked cell
//         current_row += row_movement;
//         current_column += column_movement;
//
//         //check to see if the cell exists
//         if((0 <= current_row && current_row < game_board_size) &&
//             (0 <= current_column && current_column < game_board_size)){   //check to see that current row and column are within the  scope of game board data
//             if(stored_array[clicked_row][clicked_column] === stored_array[current_row][current_column]){   //if clicked cell's data equals current cell's data
//                 matches_connected++;         //increase the number of connected
//                 if(matches_connected >= win_length){
//                     console.log('you won');
//                     you_won = true;
//                 }
//             }else{  //numbers in the cells do not match in this direction
//                 does_not_match = true;
//             }
//         }else{  //the cell does not exist in the game board data
//             does_not_exist = true;
//         }
//     }
// }