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
			<h2>Rules</h2>
		<span id="rules">

				<li>Forum meant for KGP peeps</li>
				<li>Post your fundae query, or anything that you might like to share</li>
				<li>Your identity can remain anonymous [User's discretion]</li>
				<li>More features will be added as time progresses </li>
			
		</span>
		</div>
		</div>
		<div className="container">
			<Posts />
		</div>
	</div>

);

export default Home;