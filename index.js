var originalBoard;
const humanPlayer = 'O';
const computerPlayer = 'X';
const winningCombination = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,2]
];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	document.querySelector('.endGame').style.display = "none";
	originalBoard = Array.from(Array(9).keys());

	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square){
	console.log(square.target.id);

	console.log(originalBoard[square.target.id]);

	if(typeof originalBoard[square.target.id]=="number"){
		turn(square.target.id, humanPlayer);
		if(!checkTie()) turn(bestSpot(),computerPlayer);	
	}
}

function turn(squareId, player){
	console.log(player);
	originalBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(originalBoard, player);
	console.log(gameWon);
	if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;

	for (let [index, win] of winningCombination.entries()) {
		if(win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}

	return gameWon;
}

function gameOver(gameWon){
	for (let index of winningCombination[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == humanPlayer ? "blue" : "red";
	}

	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click',turnClick, false);
	}

	declareWinner(gameWon.player == humanPlayer ? "You win!":"You lose");
}

function declareWinner(who){
	document.querySelector(".endGame").style.display = "block";
	document.querySelector(".endGame .text").innerText = who;
}

function emptySquares(){
	return originalBoard.filter(s => typeof s == "number");
}

function bestSpot() {
	console.log(emptySquares()[0]);
	return emptySquares()[0];	
}

function checkTie(){
	if(emptySquares().lenght == 0){
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click',turnClick, false);
		}
		declareWinner("Tie Game");
		return true;
	}
	return false;
}