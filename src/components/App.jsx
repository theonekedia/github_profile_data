import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: 'theonekedia',
			userData: [],
			userRepos: [],
			perPage: 5
		} 
	}
	// Get User data from github
	getUserData(){
		$.ajax({
			url: "https://api.github.com/users/"+this.state.username+"?clientId="+this.props.clientId+"&clientSecret="+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userData: data})
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({username: null})
				alert(err);
			}.bind(this)
		})
	}
	// Get User Repos from github
	getUserRepos(){
		$.ajax({
			url: "https://api.github.com/users/"+this.state.username+"/repos?per_page="+this.state.perPage+"&clientId="+this.props.clientId+"&clientSecret="+this.props.clientSecret+"&sort=created",
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userRepos: data})
				console.log(data);
			}.bind(this),
			error: function(xhr,status,err){
				this.setState({username: null})
				alert(err);
			}.bind(this)
		})
	}

	// Search username
	handleFormSubmit(username){
		this.setState({
			username: username
		},function(){
			this.getUserRepos();
			this.getUserData();
		})
	}

	componentDidMount(){
		this.getUserRepos();
		this.getUserData();
	}
	render(){
		return(
			<div>
				<Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
				<Profile userData={this.state.userData} userRepos={this.state.userRepos} />
			</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
}
App.defaultProps = {
	clientId: '4887b7701c6cdf646508',
	clientSecret: 'd6b239f3a9c3f07d7310300aaff6d78ae11b4528'
}
export default App