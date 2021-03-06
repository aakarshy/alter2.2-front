import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'
import PrivateRoute from './auth/PrivateRoute'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import Admin from './admin/Admin'
import Event from './event/Event'
import CdcPosts from './cdcpost/CdcPosts'
import NewCdcPost from './cdcpost/NewCdcPost'
import SingleCdcPost from './cdcpost/SingleCdcPost'


const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
				<Route exact path="/" component={Home} />			
				<Route exact path="/users" component={Users} />			
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/signin" component={Signin} />
				<PrivateRoute exact path="/user/:userId" component={Profile} />
				<PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
				<Route exact path="/forgot-password" component={ForgotPassword} />
				<PrivateRoute exact path="/post/create" component={NewPost} />
				<Route exact path="/post/:postId" component={SinglePost} />			
				<Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
				<Route exact path="/event" component={Event} />
				<PrivateRoute exact path="/post/edit/:postId" component={EditPost} />	
				<PrivateRoute exact path="/findpeople" component={FindPeople} />
				<PrivateRoute exact path="/admin" component={Admin} />
				<Route exact path="/cdcposts" component={CdcPosts} />
				<PrivateRoute exact path="/cdcpost/create" component={NewCdcPost} />
				<Route exact path="/cdcpost/:postId" component={SingleCdcPost} />
		</Switch>
	</div>	
);

export default MainRouter;
