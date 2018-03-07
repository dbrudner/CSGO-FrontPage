import React, { Component } from 'react';
import TableList from './tableList'
import SelectTable from './select-table'
import axios from 'axios'
import MatchesTable from './matches-table'
import SelectTeam from './select-team'
import _ from 'lodash'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: [],
			selectedMatches: [],
			team: null,
			teamMode: false,
			eventMode: false
		}
	}

	getValue = (key, value) => {
		this.setState({[key]: value}, () => {
			let allMatches = this.state.matches.filter(matchObj => {return matchObj.name === 'All Matches'})

			allMatches = allMatches[0].matches
			const selectedMatches = allMatches.filter(match => {
				if (match.team1) {
					return match.team1.name === this.state.team || match.team2.name === this.state.team					
				}
			})

			console.log(selectedMatches)
			this.setState({selectedMatches})
		})
	}

	getMatches = (route, name) => {
		axios.get(route)
		.then(matches => {
			const matchesObject = {name, matches: matches.data.matches}
			this.setState({matches: [...this.state.matches, matchesObject]})
		})
	}

	getSelectTable = value => {

		if (value === 'team') {
			this.setState({teamMode: true})
		}

		const selectedMatches = this.state.matches.filter(matchObj => matchObj.name === value)
		this.setState({selectedMatches})
	}

	componentDidMount() {
		const date = new Date();
		const timeZone = date.getTimezoneOffset();
		
		this.getMatches('/topmatches/all', "Upcoming Top Matches")			
		this.getMatches('/topmatches/today', "Today's Top Matches")

		// This is seperate from the other requests because it's used to get all teams for teams select
		axios.get('/matches/all')
		.then(matches => {
			const matchesObject = {name: 'All Matches', matches: matches.data.matches}
			let teams = matches.data.matches.reduce((acc, match) => {return acc = [...acc, match.team1, match.team2]}, [])
			teams = _.uniqBy(teams, 'name')

			this.setState({matches: [...this.state.matches, matchesObject], teams})
		})
	}


	render() {

		if (this.state.matches.length) {

			if (this.state.teamMode) {

				const matches = {name: this.state.team, matches: this.state.selectedMatches}

				return (
					<div className="App">
						<SelectTable value='Specific Team' getSelectTable={this.getSelectTable} matches={this.state.matches}/>
						<SelectTeam getTeam={this.getValue} teams={this.state.teams}/>
						{this.state.team && this.state.selectedMatches.length ? <MatchesTable matches={[matches]} /> : null}
					</div>
				)
			}

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
