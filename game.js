/*Starting game*/
let gamesequence=[]; // Array to store the sequence generated by the game
let userseguence=[]; // Array to store the user's clicked button sequence
let btns = ["red","yellow","brown","purple"]; // All possible button colors in the game
let started = false; // Flag to check if the game has started
let level = 0;  // Game level tracker

// Select the <h2> element to display the current level or game status
let h2=document.querySelector("h2");  

// Start the game when any key is pressed
document.addEventListener("keypress", function() {  
    if(started == false){                
        console.log("game is started");
        started=true;     
        
        levelUp();
    }
});


// Function to flash the game-selected button
function gameFlash(btn) {                             /* BUTTON FLASH CODE*/
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

// Function to flash the button clicked by the user
function userFlash(btn) {                            
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}


// Function to handle game level up and generate the next color
function levelUp(){
    userseguence = [];   // Clear user sequence at every new level
    level++;
    h2.innerText = `level ${level}`;

    // Select a random color from the available buttons
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    let randomButton = document.querySelector(`.${randomColor}`);

    // Add the random color to the game sequence
    gamesequence.push(randomColor);     
    console.log(gamesequence);

    // Flash the button to indicate game selection
    gameFlash(randomButton);
}


//this code is used for if ans sequence of user&game it will run otherwise it will show game over
function checkAns(idx) {
    if(userseguence[idx] === gamesequence[idx]) { 
        // If user has completed the whole current level sequence
      if (userseguence.length == gamesequence.length){
        setTimeout(levelUp ,1000);
      }
   }
   else{
    // If input is wrong, show game over message and reset game
     h2.innerHTML = `Game Over! your score was <b>${level}</b> <br>Press any key to start.`;
     document.querySelector("body").style.backgroundColor = "red";
     setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
     },150);
     reset();
   }
}

/* the below code is used to when we click on button it will show the which we has clicked and it will flash */
function btnpress() {                  
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseguence.push(userColor);

    // Check the user's answer after each click
    checkAns(userseguence.length-1);
}

// Add click event listeners to all buttons with class "btn"
let allbtns = document.querySelectorAll(".btn");  /* this code is used to when we click on btn to get run */
for (btn of allbtns){
    btn.addEventListener("click",btnpress);
}

// Function to reset the game after game over
function reset(){
   started = false;
   gamesequence = [];
   userseguence = [];
   level = 0;
}



