//list of variables
var you_won = false;
var game_board_size = null;
var stored_game_data = null;
var winning_matches = null;
var its_player_ones_turn = true;
var turn_timer = null;
var max_turn_time = 7;
var current_turn_time = 0;
var max_turns = null;
var turns_taken = null;

$(document).ready(function () {
    $("#new_game").click(function () {  //when the new game link is clicked, the game board is cleared of all elements.
        $(".game_board").empty();     //Without this, the squares would continue to append on tp of each other each time a new game is started.
        $(".notification_area").empty(); //clears any messages previously displayed to player
    });
});

function create_game_board() {
    stored_game_data = [];      //reset stored_game_data to blank array
    its_player_ones_turn = true;        //at start of the game player one will start
    $(".player1_side").addClass('current_player');      //initializes visual for player 1
    turns_taken = 0;                                //sets the number of turns taken to 0

    for (var row = 0; row < game_board_size; row++) {         //run through the rows from row 0 through the end of the game board
        stored_game_data[row] = [];         //create empty row of game data
        var row_of_divs = $('<div>');       //create a dom element of a row for cells to go into

        for (var column = 0; column < game_board_size; column++) {     //run through the columns from column 0 through the length of the game board
            stored_game_data[row][column] = null;      //create the empty cell in the array

            var cell = $('<div>').addClass('cell').attr('row', row).attr('column', column).addClass('selection_box');      //create the cell DOM element with attributes row and column
            row_of_divs.append(cell);         //append the cell to the row
        }
        $('.game_board').append(row_of_divs); //append the row to the game board
    }
}

//timer function start
function start_turn_timer() {
    current_turn_time = 0;
    clearInterval(turn_timer); //prevents the alert popup occurring when the player has taken their turn within the time frame allotted.
    turn_timer = setInterval(turn_timer_countdown, 1000); //variable calls the timer countdown function and does its increments in 1 second
}

//timer countdown function
function turn_timer_countdown() {
    current_turn_time++;  //increases increments of current turn time by one
    display_remaining_time(); //calls display function
    if (current_turn_time === max_turn_time) { //conditional statment, if the current turn time is the same as max turn time,
        alert("Your pro-cat-stination has lost you a turn"); //the 'lose-a-turn' alert box w/ cat pun appears
        toggle_player(); //toggle player function is called, and the player is toggled
    }
}
//function to display the remaining time in the countdown
function display_remaining_time() {
    $("#remaining_time").text(max_turn_time - current_turn_time);
}

function player_make_move() {
    $('.selection_box').click(area_checked);
}

function area_checked() {
    var row = $(this).attr('row');
    var column = $(this).attr('column');

    if (stored_game_data[row][column] === null) {     //check to see if the clicked cell is null/empty
        turns_taken++;
        if (its_player_ones_turn) {
            stored_game_data[row][column] = 1;    //if it is player ones turn put a one in the given cell of the game array
            check_for_wins(row, column);            //check for wins
        } else {
            stored_game_data[row][column] = 2;       //if it is player twos turn put a 2 in the given cell of the game array
            check_for_wins(row, column);                //check for wins
        }
        toggle_player();
    }
    place_symbol_in_cell($(this), stored_game_data[row][column]);
}
//toggle player function
function toggle_player() {
    its_player_ones_turn = !its_player_ones_turn;       //if the person made a legitimate move then the players turn will switch
    $('.current_player').removeClass('current_player'); //current player class is removed from player
    if (its_player_ones_turn) {
        $(".player1_side").addClass('current_player'); //if it's p1 turn, current player class is added to p1
    } else {
        $(".player2_side").addClass('current_player');  //otherwise if it is p2's turn, current player class is added to p2
    }
    if (!you_won) {
        if(check_for_ties()){
            $(".notification_area").text("It's a cat's game!! Aren't they all?!");  //display the text tie message
            clearInterval(turn_timer);              //stops the countdown timer
            $("#remaining_time").text("");          //blanks out the remaining time
            $('.selection_box').unbind();           //disables further clicks in the game area
        }
        else {
            start_turn_timer();                     //starts the timer for the next turn
        }
    } else {
        clearInterval(turn_timer);              //stops the countdown timer
        $("#remaining_time").text("");          //blanks out the remaining time
        $('.selection_box').unbind();           //disables further clicks in the game area
    }
}


function place_symbol_in_cell(target_cell, player_number) {

    var player_mark;
    if (player_number === 1) {
        player_mark = "X";
    } else {
        player_mark = "O";
    }
    target_cell.text(player_mark);
}

//Determine Wins


//set game board size
//game board size parameter is passed when the player clicks on the game board selection screen
function set_game_board_size(size) {
    game_board_size = size;
    max_turns = game_board_size * game_board_size;
    num_of_winning_matches_needed(game_board_size);
    create_game_board();
    player_make_move();
    start_turn_timer();
}

//build board dynamically based on chosen board size (visually)

//choose random # of matches needed to win
// function is called when the board size is selected.
// for boards larger than 3x3
function num_of_winning_matches_needed(size) {
    //if board is 3x3, # of matches needed to win will be 3
    if (size === 3) {
        winning_matches = 3;
    }
    //if board is 9x9
    //Math.Random gives random # from 0 - .9999[...]
    // Math.floor gives whole number, *3 + 3 multiplies whole number by 6 and adds 3 (minimum # of matches needed are 3).
    else if (size === 9) {
        winning_matches = Math.floor(Math.random() * 6 + 4);
    }
    //otherwise, for a 20x20 board,
    //Math.Random gives random # from 0 - .9999[...]
    // Math.floor gives whole number, *17 + 3 multiplies whole number by 17 and adds 3 (minimum # of matches needed are 3).
    else {
        winning_matches = Math.floor(Math.random() * 17 + 4);
    }
    var $win_condition = $('<span>').addClass('win_condition').html(winning_matches + 'in a row');
    $('.notification_area').empty().append('Connect ').append($win_condition).append(' to win!');
}

//end game: stop all movements, initiate end game screen

//function that will check if the currently clicked spot creates a win condition
function check_for_wins(clicked_row, clicked_column) {
    you_won = false;

    var current_row = null;
    var current_column = null;

    var clicked_cell = {'row': clicked_row, 'column': clicked_column};
    var direction_vector = {'row': null, 'column': null};
    var matches_connected = null;

    //Indicate player has won
    function notify_player_won() {
        if (you_won === true && its_player_ones_turn === true) {
            $(".notification_area").text("SPACE CAT Wins!!");
        } else if (you_won === true && its_player_ones_turn !== true) {
            $(".notification_area").text("Congratulations Comrade.  You won!");
        }
    }

    if (!you_won) {
        //check row for wins
        matches_connected = 1;
        direction_vector = {row: 0, column: -1};                        //checking left
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 0, column: 1};                         //checking right
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if (matches_connected >= winning_matches) {
            you_won = true;
            notify_player_won();
        }
    }
    if (!you_won) {
        //check columns for wins
        matches_connected = 1;
        direction_vector = {row: -1, column: 0};                        //checking up
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 1, column: 0};                        //checking down
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if (matches_connected >= winning_matches) {
            you_won = true;
            notify_player_won();
        }
    }
    if (!you_won) {
        //check right diagonal for wins
        matches_connected = 1;
        direction_vector = {row: -1, column: -1};                           //checking up-left
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 1, column: 1};                             //checking down-right
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if (matches_connected >= winning_matches) {
            you_won = true;
            notify_player_won();
        }
    }
    if (!you_won) {
        //check left diagonal for wins
        matches_connected = 1;
        direction_vector = {row: -1, column: 1};                        //checking up-right
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);
        direction_vector = {row: 1, column: -1};                        //checking down-left
        matches_connected = find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected);

        if (matches_connected >= winning_matches) {
            you_won = true;
            notify_player_won();
        }
    }
}

//looks for matches in the direction of movement passed by the parameters
//params: clicked_cell: the original cell that was clicked passed as an object containing row and column
//params: direction_vector: the direction we want to check for matches in. Passed as an object containing row and column
//params: matches_connected: the number of consecutive squares that match the clicked square (including the clicked square itself)
//return: matches_connected: the number of consecutive squares that match the clicked square (including the clicked square itself)
function find_matches_in_single_direction(clicked_cell, direction_vector, matches_connected) {
    var does_not_exist = false;     //variable to keep track if the new cell actually exists/ falls within the game board
    var does_not_match = false;     //variable to keep track if the new cell matches the original cell clicked

    var current_row = parseInt(clicked_cell.row);   //the row of the current cell we are checking for matches
    var current_column = parseInt(clicked_cell.column);     //the column of the current cell we are checking for matches

    var row_movement = parseInt(direction_vector.row);          //the direction the row is moving when checking for matches
    var column_movement = parseInt(direction_vector.column);      //the direction the column is moving when checking for matches

    while (!does_not_exist && !does_not_match) {
        //don't just decrease column add the component parts of the row and column to the clicked cell
        current_row += row_movement;            //add the row component of the directional vector to get the new row of the current cell
        current_column += column_movement;          //add the column component of the directional vector to get the new column of the current cell

        //check to see if the cell exists
        if ((0 <= current_row && current_row < game_board_size) &&                   //check to see that current row and column are within the  scope of game board data
            (0 <= current_column && current_column < game_board_size)) {
            if (stored_game_data[clicked_cell.row][clicked_cell.column] === stored_game_data[current_row][current_column]) {   //if clicked cell's data equals current cell's data
                matches_connected++;         //increase the number of connected
                if (matches_connected >= winning_matches) {     //checks whether the number of matches in a row connect are enough to win the game
                    return matches_connected;
                }
            } else {  //numbers in the cells do not match in this direction
                does_not_match = true;
            }
        } else {  //the cell does not exist in the game board data
            does_not_exist = true;
        }
    }
    return matches_connected;
}

function check_for_ties(){
    if (turns_taken >= max_turns) {
        return true;
    }else {
       return false;
    }
}
// function for toggling background music on & off
function aud_play_pause() {
    var myAudio = document.getElementById("myAudio");  //variable created to get the element ID of #myAudio
    if (myAudio.paused) {  //if the music is paused
        myAudio.play();  //click on it to toggle play
    } else {
        myAudio.pause();  //otherwise if playing, toggle to pause
    }
}