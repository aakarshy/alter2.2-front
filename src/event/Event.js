import React, {Component} from 'react';
import "../styles/colorgame.css"
class Event extends Component {

	render() {
		return (
			<div>
				<div id="bg-event">
					<h2 id="head">Guess the colour of the code below in one guess to start creating a streak!</h2>
					<h1 id="color">COLOUR: <span id="colorDisplay"> RGB </span></h1>
					<h5 id="refresh"> Refresh if you just landed on the page </h5>
					<div id="stripe">
						<button id="reset"> New Colours </button>
						<span id="message"></span>
						{/*<!-- <button class="easyBtn">Easy</button> -->
						<!-- <button class="hardBtn">Hard</button> -->
					*/}
					</div>
					<div id="container">
						<div class="square"></div>
						<div class="square"></div>
						<div class="square"></div>
						<div class="square"></div>
						<div class="square"></div>
						<div class="square"></div>
					</div>
					<div id="container2">
						<h2 id="color">Your streak: <span id="streak">0</span></h2>
					</div>
					<br />
					<hr />
					<br />
					<div id="container3"> 
						<h3 id="directions"><strong>DIRECTIONS:</strong> Based on the RGB value above (three numbers), select the color you think is being represented. When you guess the answer in the first try you get 1 point added to your streak. The streak breaks when you answer incorrectly in the first try. This is one of the best games for the brain of web developers and designers, helping you to learn and understand the RGB color model.
						<br/><br/>
						<strong>WHAT IS RGB?</strong> RGB (Red, Green, Blue) is a system of representing colors on a computer display. Each color is represented by three numbers, each ranging from 0 to 255. The first number represents red, the next represents green and the final number represents how much blue there is. The higher the number, the more of that color. So, for example (255, 0, 0) represents a full red color, because the number representing red is the highest possible value (255) and there is zero green and zero blue. (0, 0, 0) produces black and (255, 255, 255) produces white (see image). These 3 colors can be combined to produce any visible color. In this guess the color game, three random number are generated which, when combined, produce a color within the visible spectrum. This color system is used online in web deveopment and design. Visit <a href="https://en.wikipedia.org/wiki/RGB_color_model"> Wikipedia </a> to learn more.</h3>
				</div>
				</div>
			</div>
		);
	}
}

export default Event
