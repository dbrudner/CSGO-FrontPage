import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'

import Header from './header/header'
import ImageGroupBackground from './header/image-group-background'

import Button from './button/button'
import DropDown from './dropdown/dropdown'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: [],
			selectedMatches: [],
			team: null,
			itemsReturned: 0,
			showScheduleDropDown: false,
			showResultsDropDown: false
		}
	}

	getSomething = (route, name) => {
		axios.get(route)
		.then(things => {
			this.setState({[name]: things.data, itemsReturned: this.state.itemsReturned + 1})
		})
	}

	componentDidMount() {

		this.getSomething('/topmatches/all', "upcomingTopMatches")
		this.getSomething('/topmatches/today', "todayTopMatches")
		this.getSomething('/matches/all', "allMatches")
		this.getSomething('/livematches', "liveMatches")
		this.getSomething('/topteams', "topTeams")



		// This is seperate from the other requests because it's used to get all teams for teams select
		// axios.get('/matches/all')
		// .then(matches => {
		// 	const matchesObject = {name: 'All Matches', matches: matches.data.matches}
		// 	let teams = matches.data.matches.reduce((acc, match) => {return acc = [...acc, match.team1, match.team2]}, [])
		// 	teams = _.uniqBy(teams, 'name')

		// 	let events = matches.data.matches.reduce((acc, match) => {
		// 		if (match.event && !acc.includes(match.event.name)) {
		// 			return acc = [...acc, match.event.name]
		// 		} else {
		// 			return acc
		// 		}
		// 	}, [])


		// 	this.setState({matches: [...this.state.matches, matchesObject], teams, events})
		// })
	}

	setMode = mode => {
		if (this.state[mode]) {
			return this.setState({[mode]: false})
		} else {this.setState({[mode]: true})}
	}


	render() {

		if (this.state.itemsReturned === 5) {

			const srcArray = this.state.topTeams.map(topTeam => `https://static.hltv.org/images/team/logo/${topTeam.id}`)

			return (
				<div>
					<div className='header-container'>
						<div className='arrayCntr'>
							<ImageGroupBackground srcArray={srcArray} />
						</div>
						<Header/>
					</div>
					<main className='main'>
						<div className='buttons'>
							<div>
								<Button btnClass='live' btnText='Live' />
							</div>
							<div>
								<Button 
									onClick={() => this.setMode('showScheduleDropDown')}dropDown 
									active={this.state.showScheduleDropDown}
									btnClass='schedule' 
									btnText='Schedule'
								/>
								
								<DropDown 
									reveal={this.state.showScheduleDropDown} 
									items={['Top', 'Teams', 'Events', 'All']}
								/>
							</div>
							<div>
								<Button dropDown btnClass='results' btnText='Results'/>
							</div>
						</div>
					</main>
				</div>
			)
		} else {
			return <div/>
		}
	}
}

export default App;
