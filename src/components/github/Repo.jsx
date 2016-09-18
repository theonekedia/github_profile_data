import React, {Component} from 'react';

class Repo extends Component {
	render(){
		const repo = this.props.repo;
		return(
			<li className="list-group-item">
				<a href={this.props.html_url}>
					{this.props.name}
				</a> : {this.props.description}
			</li>
		)
	}
}
export default Repo
