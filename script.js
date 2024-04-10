// Sudoku game - each row, column, and 3x3 box must have 1-9 not repeating
// Features to add:
// Add feature so that number stays highlighted when selected
// Reload the page if you win or loose, use window.location.reload();
// Add levels and more game boards

var numSelected = null;
var tileSelected = null;
var errors = 0;
let timerInterval;
let timeLeft = 240; // Time in seconds

let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]
document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {

    // Hide the "Start Game" button
    document.getElementById("startButton").style.display = "none";
    // Create the Sudoku game board
    createGame();
    // Start the timer
    startTimer();
}

function createGame() {
    
    // Creates digits 1 -9 at bottom of board
    for (let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i; //Set id to i
        number.innerText = i; // Set text to i
        number.addEventListener("click", selectNumber);
        number.classList.add("number"); //Add class 'number' to number
        number.style.backgroundColor = "white";
        document.getElementById("digits").appendChild(number); // Adding number to the digit box
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            // Only fill in the box if it doesn't have a -
            if (board[r][c] != "-"){
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            //add lines between row 2 and 3 and columns 2 and 5
            if (r ==2 || r== 5){
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5){
                tile.classList.add("vertical-line");
            }

            //Add event handler for clicking a number
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    // Remove color of number previously selected
    if (numSelected != null){
        numSelected.classList.remove("number-selected");

    }
    // Add color to number selected
    numSelected = this;
    numSelected.classList.add("number-selected");

}

function selectTile() {
    // If a number was previously selected (from the digits at the bottom)
    if (numSelected) {
        // If the box is not empty, do nothing and exit the function
        if (this.innerText !== "") {
            alert("This square is already filled.");
            return;
        }

        let coordinates = this.id.split("-");
        let r = parseInt(coordinates[0]);
        let c = parseInt(coordinates[1]);

        // Check if the selected number matches the solution
        if (solution[r][c] === numSelected.id) {
            // Put this number in the box
            this.innerText = numSelected.id;
            // Update the board array
            board[r] = board[r].substring(0, c) + numSelected.id + board[r].substring(c + 1);
            // Check for a win
            if (checkWin()) {
                stopTimer();
                alert("Congratulations! You have won!");
            }
        } else {
            // Alert the user that the number is wrong
            alert("Wrong number. Please try again.");
            // Increment error count
            errors++;
            // Update error display
            updateErrorDisplay();
        }
    }
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

function updateTimer() {
timeLeft--;
if (timeLeft <= 0){
    stopTimer();
    alert("Time's Up! You ran out of time!");
}
updateTimerDisplay();
}

function updateTimerDisplay(){
    let minutes = Math.floor(timeLeft/60);
    let seconds = timeLeft % 60;
        // Add leading zeros if necessary
        let minutesStr = minutes < 10 ? "0" + minutes : minutes;
        let secondsStr = seconds < 10 ? "0" + seconds : seconds;
    
        document.getElementById("timer").innerText = "Time: " + minutesStr + ":" + secondsStr;
}


function stopTimer() {
    clearInterval(timerInterval);
}

function updateErrorDisplay(){
    document.getElementById("errors").innerText = "Errors: " + errors;
}

function checkWin(){
    for (let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            if (board[r][c] === '-' || board[r][c] !== solution[r][c]){
                return false;
            }
        }
    }
    return true;
}