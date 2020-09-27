import React, { Component } from "react";
import { list } from "./apiCdcPost";
import { Link } from "react-router-dom"
import {isAuthenticated} from "../auth"


class CdcPosts extends Component {
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


	renderPosts= posts => {
		return(
			<div className="row">
				{posts.map((post, i) => {
					const posterId = post.postedBy ? post.postedBy._id : ""
					const posterName = post.postedBy ? post.postedBy.name : "Unknown"
					return (
						<div className="card col-md-12" key={i} style={{backgroundColor: "#000000",marginLeft: "0%", marginBottom: "2%"}} > 
						  <div className="card-body" style={{backgroundColor: "#cccccc"}}>
						    <h5 className="card-title">{post.title}</h5>
						    <p className="card-text">
								{post.body.substring(0, 90)}
							</p>
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
								to={`/cdcpost/${post._id}`} 
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
		<div>
			<div style={{backgroundColor: "#000000"}}>
			{isAuthenticated() && (
				<>
				<div className="button">
					<Link to = {`/cdcpost/create`}>
						Create Post
					</Link>
				</div>
				</>
			)}
			{!isAuthenticated() && (
				<>
				Login to create posts here
				</>
			)}
			<div className="container">
				<h2 className="mt-5 mb-5">
				<strong style={{color: "white"}}>
					{!posts.length ? 'No more posts!' : 'Recent Posts'}
				</strong>
				</h2>
			
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
			</div>
		</div>
		)
	}
}

export default CdcPosts;