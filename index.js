userClickedPattern = [];
gamePattern = [];

buttonColors = ["red","blue","green","yellow"];

var started = false;
var level = 0;


$(document).keypress(function(){
	if(!started)
	{	$("h1").text("level " + level);
		nextSequence();
		started = true;
	}
});


$("button").on("click",function()
{
	userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	animatePress(userChosenColour);
	playSound(userChosenColour);
	checkAnswer(userClickedPattern.length -1);
});


function nextSequence() 
{
	userClickedPattern = [];
	level++;
	$("h1").text("Level " + level);
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosencolor = buttonColors[randomNumber];
	//console.log(randomChosencolor);

	gamePattern.push(randomChosencolor);

	$("."+randomChosencolor).fadeOut(100).fadeIn(100);

	playSound(randomChosencolor);
}


function playSound(name)
{
	var aud = new Audio(name +".mp3");
	aud.play();
}

function animatePress(currentColor) 
{
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	},100);
}

function checkAnswer(currentLevel)
{
	if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
	{
		console.log("success");
		if(gamePattern.length == userClickedPattern.length)
		{
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
	else
	{
		$("body").addClass("game-over");
		playSound("wrong");
		setTimeout(function()
		{
			$("body").removeClass("game-over");
		},200);
		$("h1").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver()
{
	level = 0;
	gamePattern = [];
	started = false;
}