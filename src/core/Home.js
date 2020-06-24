import React from 'react';
import '../App.css'
import Posts from '../post/Posts'
import Logo from "../images/logo.png"
import "../styles/home.css"

const Home = () => (
	<div>
		<div id="bg-home">
		<div className="jumbotron row">
		<div className="col-md-4">
			<span className="row" id="alter">
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

<a href="https://www.iubenda.com/privacy-policy/48668821" class="iubenda-white iubenda-embed" title="Privacy Policy ">Privacy Policy</a><script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script>
  </div>
	</div>

);

export default Home;
