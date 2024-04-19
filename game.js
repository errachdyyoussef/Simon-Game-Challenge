
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = true;

var level = 0;

$(document).on("keypress", function(){
  if (started == true) {
    nextSequence();
    started = false;
    $("h1").text("Level "+ level);
  }

})


for (var i = 0; i < 4; i++){
  buttonClicked(buttonColors[i]);
}



function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    
  } else {
    
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    playSound("wrong");
  }
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



function buttonClicked(color){
  var userChosenColor;
  $("#" + color).on("click", function(){
    userChosenColor = color;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  })
}



function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


