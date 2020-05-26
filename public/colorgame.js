var colors = generateRandomColors(6);

var squares= document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
//var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var streak = document.querySelector("#streak");

var flag = 1;
var count = 0;
var score = 0;
 
/*easyBtn.addEventListener("click", function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	colors = generateRandomColors(3);
	pickedColor = pickcolor();
	colorDisplay.textContent = pickedColor;
})
hardBtn.addEventListener("click",function(){
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
})*/

resetBtn.addEventListener("click", function(){
	colors = generateRandomColors(6);
	count = 0;
	flag = 1;
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	for(var i=0; i<squares.length; i++){
		squares[i].style.background = colors[i];
	}
	h1.style.background = "#232323";
})

colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click",function(){
		var clickedColor = this.style.backgroundColor;
		count = count + 1;
		if(clickedColor === pickedColor){
			messageDisplay.textContent="Correct";
			changeColors(clickedColor);
			h1.style.background = clickedColor;
			if(count === 1 && flag === 1){
				score = score + 1;
				streak.textContent = score;
			}
		}
		else{
			flag = 0;
			score = 0;
			streak.textContent = score;
			this.style.background = "#232323";
			messageDisplay.textContent="Try Again";
		}
		
	});
};

function changeColors(color){
	for(var i=0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor()
{
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr =[]
	for(var i=0; i<num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}