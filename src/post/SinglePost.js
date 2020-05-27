import React, {Component} from 'react'
import {singlePost, remove, like, unlike} from './apiPost'
import DefaultImage from "../images/abstract.png"
import { Link, Redirect } from "react-router-dom"
import {isAuthenticated} from "../auth"
import Comment from "./Comment"
import Linkify from 'react-linkify'
class SinglePost extends Component {
	state = {
		post: '',
		redirectToHome: false,
		redirectToSignin: false,
		like: false,
		likes: 0,
		comments: []
	}

	checkLike = (likes) => {
		const userId = isAuthenticated() && isAuthenticated().user._id
		let match = likes.indexOf(userId) != -1 //indexOf method finds the userId in the likes array, return -1 if not found
		return match;
	}

	componentDidMount = () => {
		const postId = this.props.match.params.postId
		singlePost(postId).then(data => {
			if(data.error){
				console.log(data.error)
			} else {
				this.setState({
					post: data, 
					likes: data.likes.length,
					like: this.checkLike(data.likes),
					comments: data.comments 	
				});
			}
		});
	};

	updateComments = comments => {
		this.setState({ comments })
	}

	likeToggle = () => {
		if(!isAuthenticated()) {
			this.setState({redirectToSignin: true})
			return false
		}
		let callApi = this.state.like ? unlike : like
		const userId = isAuthenticated().user._id
		const postId = this.state.post._id
		const token = isAuthenticated().token

		callApi(userId, token, postId).then(data => {
			if(data.error){
				console.log(data.error)
			} else{
				this.setState({
					like: !this.state.like,
					likes: data.likes.length
				})
			}
		})
	}

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
		const {like, likes} = this.state
		return (
		  <div className="card-body">
		  	<div className="text-center">
		  	<img 
		  		src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
		    	alt={post.title}
		    	onError={i => 
		    		{i.target.src = `${DefaultImage}`}
		    	}
		    	className = "img-thumbnail mb-3 text-center"
		    	style={{ height: "300px", width: "auto", objectFit: "cover"}}
		    />
		    </div>

		    {like ? (
		    	<h3 onClick={this.likeToggle}>
		    	<i 
		    		className = "fa fa-thumbs-up text-success bg-dark" 
		    		style={{padding: "10px", borderRadius: "50%"}} 
		    	/> {" "}
		    	{likes} Unlike </h3>
		    ) : (
		    	<h3 onClick={this.likeToggle}>
		    	<i 
		    		className = "fa fa-thumbs-up text-warning bg-dark" 
		    		style={{padding: "10px", borderRadius: "50%"}} 
		    	/> {" "}
		    	{likes} Like </h3>
		    )}
		   
		    <p className="card-text mt-5">
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
					to={`/`} 
		     		className="btn btn-raised btn-primary btn-sm mr-5"
		    	 >	
		     		Back to Posts
		    	</Link>

		    	{isAuthenticated().user && 
		    		isAuthenticated().user._id === post.postedBy._id && (
		  			<>
			  			<Link 
			  				to={`/post/edit/${post._id}`}
			  				className="btn btn-raised btn-info btn-sm mr-5 "
			  			>
					     	Update Post
						</Link>

			    		<button 
			    			onClick={this.deleteConfirmed}
			    			className="btn btn-raised btn-danger btn-sm"
			    		>
				     		Delete Post
				     	</button>
					</>
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
			                    <Link
			                        to={`/post/edit/${post._id}`}
			                        className="btn btn-raised btn-warning btn-sm mr-5"
			                    >
			                        Update Post
			                    </Link>
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
		

			<Comment 
				postId= {post._id} 
				comments={comments}
				updateComments={this.updateComments} 
			 />
			</div>

		)
	}
}

export default SinglePost