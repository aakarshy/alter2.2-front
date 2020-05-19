import React from 'react';
import '../App.css'
import Posts from '../post/Posts'
import Logo from "../images/logo.png"

const Home = () => (
	<div>
		<div className="jumbotron row">
		<div className="col-md-4">
			<span className="row"><img src={Logo} height="100px" width="auto" />
			<div className="ml-3"><h3><strong> ALTER 2.2 </strong></h3>
			<hr /><p className="lead text-center">FORUM </p></div>
			</span>
		</div>
		<div className="col-md-8 text-center">
			<h1> Work in progress.... </h1>
		</div>
		</div>
		<div className="container">
			<Posts />
		</div>
	</div>
	

	

);

export default Home;