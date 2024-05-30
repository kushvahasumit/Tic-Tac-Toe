const gridSize = document.getElementById("gridSize");
const winStreak = document.getElementById("winStreak");
const startGame = document.getElementById("startGame");
const newGame = document.getElementById("newGame");
const currentStatus = document.getElementById("status");
const matrix = document.getElementById("matrix");

let gridSizeValue = gridSize.value;
let winStreakValue = winStreak.value;

function updatedMatrixvalue() {
  gridSizeValue = parseInt(gridSize.value);

  winStreak.max = gridSizeValue;
  if(winStreakValue > gridSizeValue){
    winStreak.value = gridSizeValue;
    winStreakValue = gridSize;
  }

  console.log(gridSize);
  console.log(winStreak)
}

gridSize.addEventListener("input",updatedMatrixvalue);

winStreak.addEventListener("input",()=>{
    winStreakValue=parseInt(winStreak.value);
})

// start game function

let matrixArray = [];
let whosNext = true;

function startGameFunc(){
    // this will create an array nxn with null value that we can put x or o in that
  matrixArray = Array(gridSizeValue*gridSizeValue).fill(null);
  whosNext = true;
  currentStatus.textContent = `Next Turn : ${whosNext ? "X" : "O"}`;
  console.log(matrixArray)

  matrixGeneration();
}


startGame.addEventListener("click", startGameFunc);

function matrixGeneration(){
  //    replace matrix with ""
  matrix.innerHTML = "";

  //    by using css grid method we create a layout of row and column
  //   `repeat(${gridSize}, 1fr)` it is a css repaet functiion 1st argument for repeting content value or 1fr is takes 1fraction part of matrix to define that
  matrix.style.gridTemplateRows = `repeat(${gridSizeValue}, 1fr)`; // Set grid rows
  matrix.style.gridTemplateColumns = `repeat(${gridSizeValue}, 1fr)`; // Set grid columns
 
//   creating block of matrix by for loop
    for (let i = 0; i < matrixArray.length; i++) {
        const createBlock = document.createElement("button");
        createBlock.classList.add("square");
        createBlock.textContent = matrixArray[i];
        createBlock.addEventListener("click",()=>{
            pushxo(i);
        })
        matrix.appendChild(createBlock);
    }
}

function pushxo(index){
   matrixArray[index] = whosNext ? "X" : "O";
//    switch player
   whosNext = !whosNext; 
   matrixGeneration();

   const winner = checkWinner(matrixArray);
   if (winner) {
    currentStatus.textContent = `${winner} is Winner >> Play Again `;
   }else if(matrixArray.every(Boolean)){ //if all sqare filled then
    currentStatus.textContent = `Draw`;
   }else{
    currentStatus.textContent = `Next Turn : ${whosNext ? "X" : "O"}`;
   }
}


function checkWinner(matrixArray){
  const results = observewinnnig(gridSizeValue, winStreakValue);
//   iterate all block of the matrix
console.log(results)
   for(const result of results){
    // destructuring all sqare what value it carries
    const [a, b, c, ...rest] = result;
    if (
        matrixArray[a] &&
        matrixArray[a] === matrixArray[b] &&
        matrixArray[a] === matrixArray[c] &&
        rest.every((index) => matrixArray[a] === matrixArray[index])
      ) {
        return matrixArray[a]; // Return the winner ('X' or 'O')
      }
    }
    return null;
  }


// check who is winner all possible condition
//  take help from internet to generate this logic
function observewinnnig(gridSizeValue,winStreakValue){
    const results = [];

 // check horizontal line of each block of square
 for (let i = 0; i < gridSizeValue; i++) {
   for (let j = 0; j <= gridSizeValue -winStreakValue; j++) {
     let block = [];
     for (let k = 0; k <winStreakValue; k++) {
       block.push(i * gridSizeValue + j + k);
     }
     results.push(block);
   }
 }
 // Vertical line results
 for (let i = 0; i <= gridSizeValue -winStreakValue; i++) {
   for (let j = 0; j < gridSizeValue; j++) {
     let block = [];
     for (let k = 0; k <winStreakValue; k++) {
       block.push((i + k) * gridSizeValue + j);
     }
     results.push(block);
   }
 }
 // Diagonal line results
 for (let i = 0; i <= gridSizeValue -winStreakValue; i++) {
   for (let j = 0; j <= gridSizeValue -winStreakValue; j++) {
     let block = [];
     for (let k = 0; k <winStreakValue; k++) {
       block.push((i + k) * gridSizeValue + j + k);
     }
     results.push(block);
   }
 }
 
 for (let i = 0; i <= gridSizeValue -winStreakValue; i++) {
   for (let j =winStreakValue - 1; j < gridSizeValue; j++) {
     let block = [];
     for (let k = 0; k <winStreakValue; k++) {
       block.push((i + k) * gridSizeValue + j - k);
     }
     results.push(block);
   }
 }
 return results;
}

// this reloads page for new game play
newGame.addEventListener("click",()=>{
    document.location.reload();
})

startGameFunc();