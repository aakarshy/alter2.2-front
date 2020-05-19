import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { fbLogin, authenticate } from "../auth";
import { Redirect } from "react-router-dom";


export default class Facebook extends Component {
    constructor() {
      super();
      this.state = {
        redirectToReferrer: false
       };
    }

    responseFacebook = response => {
      // console.log(response);

      const user = {
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      };

      fbLogin(user).then(data => {
          console.log("signin data: ", data);
          if (data.error) {
              console.log("Error Login. Please try again..");
          } else {
              console.log("signin success - setting jwt: ", data);
              authenticate(data, () => {
                  this.setState({ redirectToReferrer: true });
              });
            }
      });
    };


  render() {
      // redirect
      const { redirectToReferrer } = this.state;
      if (redirectToReferrer) {
          return <Redirect to="/" />;
      }
  
      return (
          <div className="container">
              <FacebookLogin
                  appId="2942181802498041"
                  size = "small"
                  buttonText="Login with Facebook"
                  onSuccess={this.responseFacebook}
                  onFailure={this.responseFacebook}
              />
          </div>
      );
  }
}

/*  componentClicked = () => console.log("clicked");

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="189486938370592"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}*/