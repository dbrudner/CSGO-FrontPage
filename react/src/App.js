import React, { Component } from 'react';
import TableList from './tableList'
import SelectTable from './select-table'
import axios from 'axios'
import MatchesTable from './matches-table'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: [],
			selectedMatches: []
		}
	}

	getMatches = (route, name) => {
		axios.get(route)
		.then(matches => {
			const matchesObject = {name, matches: matches.data.matches}
			this.setState({matches: [...this.state.matches, matchesObject]})
		})
	}

	getSelectTable = value => {
		const selectedMatches = this.state.matches.filter(matchObj => matchObj.name === value)
		this.setState({selectedMatches})
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
					<SelectTable getSelectTable={this.getSelectTable} matches={this.state.matches}/>
					{this.state.selectedMatches.length ? <MatchesTable matches={this.state.selectedMatches} /> : null}
				</div>
			);
		}

		else {
			return <div>Loading</div>
		}
	}
}

export default App;
