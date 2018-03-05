import React, { Component } from 'react';
import TableList from './tableList'
import axios from 'axios'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: {}
		}
	}

	componentDidMount() {
		const date = new Date();
		const timeZone = date.getTimezoneOffset();
		
		axios.get('/matches/today')
		.then(todayTopMatches => 
			this.setState({matches: {...this.state.matches, todayTopMatches}})
		)
	}


	render() {

		if (this.state.matches.todayTopMatches) {
			return (
				<div className="App">
					<TableList matches={this.state.matches}/>
				</div>
			);
		}

		else {
			return <div>Loading</div>
		}

		
	}
}

export default App;
