import React, { Component} from 'react'
import {singlePost, update} from './apiPost'
import {isAuthenticated} from '../auth'
import { Redirect } from "react-router-dom"
import DefaultImage from "../images/abstract.jpeg"
import imageCompression from 'browser-image-compression'

class EditPost extends Component {
	constructor() {
		super()
		this.state = {
			id: '',
            postId: '',
			title: '',
			body: '',
			redirectToProfile: false,
			error: '',
			fileSize: 0,
			loading: false
		}
	}
	init = postId => {
            singlePost(postId).then(data => {
                if (data.error) {
                    this.setState({ redirectToProfile: true });
                } else {
                    this.setState({
                        // id is not post.postedBy._id
                        id: data.postedBy._id,
                        postId: data._id,
                        title: data.title,
                        body: data.body,
                        error: ""
                    });
                }
            });
        };
	componentDidMount() {
		this.postData = new FormData()
		const postId = this.props.match.params.postId
		this.init(postId);
	}


    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };


    handleImageUpload = name => event => {
        var imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        const test = (compressedFile) => { 
            this.postData.set(name, compressedFile)
            console.log("ok")
            this.setState({ [name]: compressedFile})
        }
        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        imageCompression(imageFile, options)
        .then(function (compressedFile) {
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
       
            // write your own logic
            test(compressedFile)
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = event.target.value;

        // const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.state.postId;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true                    });
                }
            });
        }
    };

	editPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleImageUpload("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update Post
            </button>
        </form>
    );

	render() {
		const {id, title, body,redirectToProfile, error, loading } = this.state 

		if (redirectToProfile) {
			return <Redirect to={`/user/${isAuthenticated().user._id}`} />
		}
		return (
			<div className="container">
				<h2 className="mt-5 mb-5"> {title} </h2>
				<div 
					className="alert alert-danger"

					style={{ display: error ?"" : "none"}}
				>
					{error}
				</div>

				{loading ? (
					<div className="jumbotron text-center">
						<h2>Loading...</h2>
					</div>
					) : (
							""
				)}	
				<img 
					style={{height: "200px", width: "auto"}}
					className="img-thumbnail"
					src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
 					onError={i => (i.target.src = `${DefaultImage}`)}
					alt={title} 
				/>
		
	           	 { (isAuthenticated().user.role === "admin" ||
                    isAuthenticated().user._id == id ) &&
                 
                    this.editPostForm(title, body)}			
            </div>
		)
	}
}

export default EditPost