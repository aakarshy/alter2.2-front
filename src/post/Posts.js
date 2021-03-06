import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultImage from "../images/abstract.png"
import { Link } from "react-router-dom"


class Posts extends Component {
	constructor() {
		super()
		this.state = {
			posts: [],
			page: 1
		};
	}

	loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };
     
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

// const photoUrl = id ? 
		// `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile;

	renderPosts= posts => {
		return(
			<div className="row">
				{posts.map((post, i) => {
					const posterId = post.postedBy ? post.postedBy._id : ""
					const posterName = post.postedBy ? post.postedBy.name : "Unknown"
					return (
						<div className="card col-md-4" key={i} style={{backgroundColor: "#000000",marginLeft: "0%", marginBottom: "2%"}} > 
						  <div className="card-body" style={{backgroundColor: "#cccccc"}}>
						  	<img 
						  		src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
						    	alt={post.title}
						    	onError={i => 
						    		{i.target.src = `${DefaultImage}`}
						    	}
						    	className = "img-thumbnail mb-3"
						    	style={{ height: "150px", width: "auto"}}
						    />
						    <h5 className="card-title">{post.title}</h5>
						    <p className="card-text">
								{post.body.substring(0, 90)}
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
							
							<Link
								to={`/post/${post._id}`} 
						     	className="btn btn-raised btn-primary btn-sm "
						     >
						     Read More..
						    </Link>
						  </div>
					</div>
					)
				})}	
			</div>
		)	
	};

	render() {
		const { posts, page } = this.state;
		return (
			<div className="container">
				<h2 className="mt-5">
				<strong style={{color: "white"}}>
					{!posts.length ? 'No more posts!' : 'Recent Posts  '}
				</strong>
				</h2>
				<h4 className="mb-5">
				<em style={{color: "white"}}>
					Sign in to contribute. Remember. Apes together....strong
				</em>
				</h4>
			
				{this.renderPosts(posts)}

				{page > 1 ? (
				    <button
				        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
				        onClick={() => this.loadLess(1)}
				    >
				        Previous ({this.state.page - 1})
				    </button>
				) : (
				    ""
				)}
				
				{posts.length ? (
				    <button
				        className="btn btn-raised btn-success mt-5 mb-5"
				        onClick={() => this.loadMore(1)}
				    >
				        Next ({page + 1})
				    </button>
				) : (
				    ""
				)}
			</div>
		)
	}
}

export default Posts;
