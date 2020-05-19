import React, { Component } from 'react'
import { Link } from "react-router-dom"
import DefaultProfile from "../images/avatar.png"

class ProfileTabs extends Component {
	render() {
		const {following, followers, posts} = this.props;
		return ( 
			<div className="col-md-12">
				<div className="row">
					<div className="col-md-4">
						<h3 className="text-primary">Followers</h3>
						<hr/>

						{followers.map((person, i) => (
							<div key={i}>
								<div className="row">
									<img 
								     	style={{
								     		borderRadius: "50%",
								     		border: "1px solid black"
								     	}}
								     	className="float-left mr-2"
										height="30px"
										width="30px"
										onError={i => (i.target.src = `${DefaultProfile}`) }
										src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
										alt={person.name}
									/>
									<Link to={`/user/${person._id}`}>
				
											<p className="lead mt-3"> {person.name} </p>
									</Link>
									</div>
								</div>
						))}
					</div>
					<div className= "col-md-4">
						<h3 className="text-primary">Following</h3>
						<hr/>
						{following.map((person, i) => (
							<div key={i}>
								<div className='row'>
										<img 
											style={{
								     		borderRadius: "50%",
								     		border: "1px solid black"
								     		}}
											className="float-left mr-2 mt-3"
											height="30px"
											width="30px"
											onError={i => (i.target.src = `${DefaultProfile}`) }
											src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
								
											alt={person.name}
										/>
									<Link to={`/user/${person._id}`}>
										<p className="lead mt-3"> {person.name} </p>
									</Link>
								</div>
							</div>
						))}
					</div>
					<div className= "col-md-4">
						<h3 className="text-primary">Posts</h3>
						<hr/>
						{posts.map((post, i) => (
							<div key={i}>
								<div>		
									<Link to={`/post/${post._id}`}>
										<p className="lead"> {post.title} </p>
									</Link>
								</div>
							</div>
						))}

					</div>
				</div>
			</div>
		);
	}
}

export default ProfileTabs