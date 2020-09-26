import React from 'react';
import '../App.css'
import Posts from '../post/Posts'
import Logo from "../images/logo.png"
import "../styles/home.scss"

const Home = () => (
	<div>
		<div id="bg-home">
	
		{/*<div className="col-md-4">*/}
		<div className="container">
			<div className="alter">
			<div className="container_alter">
  				<div className="glitch" data-text="ALTER2.2">ALTER2.2</div>
 			 	<div className="glow">ALTER2.2</div>
 		 		<p className="subtitle">BARE MODERATION</p>
  			</div>
 			<div className="scanlines"></div>
			{/*<img src={Logo} height="100px" width="auto" />*/}
			</div>
		</div>
		{/*</div>*/}

		{/*<div className="jumbotron row">
		<div className="text-center" id="about">
			<h2><strong> A B O U T </strong></h2>
		<span id="rules">

				A L T E R is a minimalistic, dedicated social network limited to KGPians [mostly]. 
				The platform aims to build an online community through it's discussion forum. 
				It's more like a reddit-twitter cross where you can choose to remain completely anonymous
				(even to the admin) and post without approval. Rebellious. Eh? 
		
				<p className="mt-3">
				Informative posts pertaining to Institute, Academic guidelines etc. are invited because 
				"APES TOGETHER STRONG" 
				</p>
				P.S. Lenient moderation remains though. :)      
		
		</span>
		</div>
		</div>*/}
		
	<div className="container">
			<Posts />
		</div>

  <div className="footer"><a href="https://sites.google.com/view/privacy-policy-alter/home">
  	Privacy Policy
  	</a>
  	</div>
	</div>
	</div>

);

export default Home;
