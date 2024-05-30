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
            
        })
        matrix.appendChild(createBlock);
    }
}

