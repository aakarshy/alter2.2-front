import React, {Component} from 'react'
import {singlePost, remove} from './apiCdcPost'
import { Link, Redirect } from "react-router-dom"
import {isAuthenticated} from "../auth"
import Linkify from 'react-linkify'
class SingleCdcPost extends Component {
	state = {
		post: '',
		redirectToHome: false,
		redirectToSignin: false,
	}

	componentDidMount = () => {
		const postId = this.props.match.params.postId
		singlePost(postId).then(data => {
			if(data.error){
				console.log(data.error)
			} else {
				this.setState({
					post: data 	
				});
			}
		});
	};

	deletePost = () => {
		const postId = this.props.match.params.postId
		const token = isAuthenticated().token
		remove(postId, token)
		.then(data => {
			if(data.error){
				console.log(data.error)
			} else {
				this.setState({ redirectToHome: true })
			}
		})
	}

	deleteConfirmed = () => {
		let answer = window.confirm("Are you sure you want to delete this post?")
		if(answer){
			this.deletePost()
		}
	}


	renderPost = (post) => {
		const posterId = post.postedBy ? post.postedBy._id : ""
		const posterName = post.postedBy ? post.postedBy.name : "Unknown"
		return (
		  <div className="card-body">		   
		    <p className="card-text">
				<span style={{whiteSpace: "pre-line", fontFamily: 'Source Sans Pro ,sans-serif', fontSize: "1.5em", fontWeight: "500"}}>
					<Linkify>{post.body}</Linkify>
				</span>
			</p>
			<br/>
			<p className="font-italic mark">
				Posted by{" "}    
		
			<Link 
				to={`/user/${posterId}`}
			> 
				{posterName}{" "} 
			</Link>
				on {new Date (post.created).toDateString()}
			</p>

			<div className ="d-inline-block">
				<Link
					to={`/cdcposts`} 
		     		className="btn btn-raised btn-primary btn-sm mr-5"
		    	 >	
		     		Back to Posts
		    	</Link>

		    	{isAuthenticated().user && 
		    		isAuthenticated().user._id === post.postedBy._id && (
		  			//<>
			  	// 		<Link 
			  	// 			to={`/post/edit/${post._id}`}
			  	// 			className="btn btn-raised btn-info btn-sm mr-5 "
			  	// 		>
					 //     	Update Post
						// </Link>

			    		<button 
			    			onClick={this.deleteConfirmed}
			    			className="btn btn-raised btn-danger btn-sm"
			    		>
				     		Delete Post
				     	</button>
					//</>
			   )}

			</div>
						
		  </div>
		)
	}	


	render() {
	
		const {post, redirectToHome, redirectToSignin, comments} = this.state
			
		if(redirectToHome){
			return <Redirect to={`/`} />
		} else if(redirectToSignin){
			return <Redirect to={`/signin`} />
		}



		return (
			<div className="container">
				<h2 className="display-2 mt-5 mb-3">{post.title}</h2>
			
			{!post ? (
				<div className="jumbotron text-center">
					<h2>Loading...</h2>
				</div>
				) : (
					this.renderPost(post)
				)
			}

			<div>
			    {isAuthenticated().user &&
			        isAuthenticated().user.role === "admin" && (
			            <div className="card mt-5">
			                <div className="card-body">
			                    <h5 className="card-title">Admin</h5>
			                    <p className="mb-2 text-danger">
			                        Edit/Delete as an Admin
			                    </p>
			                  {/*  <Link
			                        to={`/post/edit/${post._id}`}
			                        className="btn btn-raised btn-warning btn-sm mr-5"
			                    >
			                        Update Post
			                    </Link> */}
			                    <button
			                        onClick={this.deleteConfirmed}
			                        className="btn btn-raised btn-danger"
			                    >
			                        Delete Post
			                    </button>
			                </div>
			            </div>
			        )}
			</div>
		
			</div>

		)
	}
}

export default SingleCdcPost