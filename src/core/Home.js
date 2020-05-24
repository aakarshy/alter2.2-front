import React from 'react';
import '../App.css'
import Posts from '../post/Posts'
import Logo from "../images/logo.png"
import "../styles/home.css"

const Home = () => (
	<div>
		<div className="jumbotron row">
		<div className="col-md-4">
			<span className="row">
			{/*<img src={Logo} height="100px" width="auto" />*/}
			<div className="ml-3"><h3 className="text-center"><strong> A L T E R 2 . 2 </strong></h3>
			<hr /><p className="lead text-center">FORUM [BARE MODERATION]</p></div>
			</span>
		</div>
		<div className="col-md-8 text-center">
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
		</div>
		<div className="container">
			<Posts />
		</div>

  <div class="footer"><a href="https://sites.google.com/view/privacy-policy-alter/home">
  	Privacy Policy
  	</a>
  </div>
	</div>

);

export default Home;