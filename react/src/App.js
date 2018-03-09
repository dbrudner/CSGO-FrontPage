import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'

import Header from './header/header'
import TeamImages from './header/team-images'

import Button from './button/button'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: [],
			selectedMatches: [],
			team: null
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
		
		this.getMatches('/topmatches/all', "Upcoming Top Matches")			
		this.getMatches('/topmatches/today', "Today's Top Matches")
		this.getMatches('/livematches', "Live Matches")
		

		// This is seperate from the other requests because it's used to get all teams for teams select
		axios.get('/matches/all')
		.then(matches => {
			const matchesObject = {name: 'All Matches', matches: matches.data.matches}
			let teams = matches.data.matches.reduce((acc, match) => {return acc = [...acc, match.team1, match.team2]}, [])
			teams = _.uniqBy(teams, 'name')

			let events = matches.data.matches.reduce((acc, match) => {
				if (match.event && !acc.includes(match.event.name)) {
					return acc = [...acc, match.event.name]		
				} else {
					return acc
				}
			}, [])

			
			this.setState({matches: [...this.state.matches, matchesObject], teams, events})
		})
	}


	render() {
		return (
			<div>
				<div className='header-container'>
					<TeamImages />
					<Header/>
				</div>
				<main className='main'>
					<div className='buttons'>
						<Button btnClass='live' btnText='Live' />
						<Button dropDown btnClass='schedule' btnText='Schedule'/>
						<Button dropDown btnClass='results' btnText='Results'/>
					</div>
				</main>
			</div>
		)	
	}
}

export default App;
