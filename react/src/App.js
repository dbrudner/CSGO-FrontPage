import React, { Component } from 'react';
import TableList from './tableList'
import axios from 'axios'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: []
		}
	}

	getMatches = (route, name) => {
		axios.get(route)
		.then(matches => {
			const matchesObject = {name, matches: matches.data.matches}
			this.setState({matches: [...this.state.matches, matchesObject]})
		})
	}

	componentDidMount() {
		const date = new Date();
		const timeZone = date.getTimezoneOffset();
		this.getMatches('/topmatches/all', "Upcoming Top Matches")				

		this.getMatches('/topmatches/today', "Today's Top Matches")
	}


	render() {
		if (this.state.matches.length) {
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
