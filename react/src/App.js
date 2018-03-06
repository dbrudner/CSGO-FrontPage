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
		console.log('hey')
		axios.get(route)
		.then(matches => {
			console.log(matches)
			const matchesObject = {name, matches}
			this.setState({matches: [...this.state.matches, matchesObject]})
		}, () => console.log(this.state))
	}

	componentDidMount() {
		const date = new Date();
		const timeZone = date.getTimezoneOffset();
		
		// axios.get('/matches/today')
		this.getMatches('/topmatches/today', "Today's Top Matches")
		this.getMatches('/topmatches/all', "Upcoming Top Matches")
	}


	render() {
		console.log(this.state)
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
