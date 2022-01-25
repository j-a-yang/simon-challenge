
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var clickCounter;
var levelCounter;
var checkFlag;

// Wait for user to press any key to begin.
$(document).one("keypress", function() {
  startGame();
});

//=============================//

function startGame() {
  // assign functionality to buttons.
  $("div.btn").on("click", clickMechanics);

  //initiate variables.
  gamePattern = [];
  levelCounter = 0;

  //begin first sequence
  setTimeout(nextSequence, 300);
}

//=============================//
// This is all the functionality that's assigned to the button during game play
function clickMechanics() {
  var userChosenColor = $( this ).attr("id");
  makeSound(userChosenColor);
  animatePress(userChosenColor);

  //Check if user selected correct button
  checkFlag = check(userChosenColor);
  clickCounter++;
  if (checkFlag) {
    if(clickCounter == levelCounter) {
      setTimeout(nextSequence, 750);
    }
  } else {
    gameOver();
  }
}
//=============================//

//initiate next part of sequence/pattern and next "level".
function nextSequence() {
  // level up and change title.
  levelCounter++;
  $("#level-title").text("Level "+levelCounter);

  // use random number between 0 and 3 for sequence + store sequence.
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //sound & animation
  makeSound(randomChosenColor);
  animateButton(randomChosenColor);

  //reset clickCounter
  clickCounter = 0;
}
//=============================//

function animateButton(color) {
  $("#"+color).fadeOut(100).fadeIn(100);
}

//=============================//

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

//=============================//

// Check user click.
function check(color) {
  return gamePattern[clickCounter] == color ? true : false;
}

//=============================//

function gameOver() {
  makeSound("wrong");
  //Change Title and Animate
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  // turn off button functionality.
  $("div.btn").off("click", clickMechanics);

  //wait for user to press key.
  $(document).one("keypress", function() {
    startGame();
  });
}

//=============================//

function makeSound(name) {
  var sound = new Audio("sounds/"+ name + ".mp3");
  sound.play();
}
