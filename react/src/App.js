import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'

import Header from './header/header'
import ImageGroupBackground from './header/image-group-background'

import Button from './button/button'
import DropDown from './dropdown/dropdown'
import Table from './table/table'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			matches: [],
			selectedMatches: [],
			team: null,
			itemsReturned: 0,
			show: '',
			schedule: [],
			results: [],
			live: []
		}
	}

	getMatches = (route, name, category) => {
		axios.get(route)
		.then(res => {
			const key = category
			const matches = res.data
			const matchesObj = {name,matches}
				console.log(key)
				this.setState({
					[key]: [...this.state[key], matchesObj],
					itemsReturned: this.state.itemsReturned + 1
				})
		})
	}

	getTeams = (route, name) => {
		axios.get(route)
		.then(teams => {
			this.setState({[name]: teams.data, itemsReturned: this.state.itemsReturned + 1})
		})
	}

	componentDidMount() {

		this.getMatches('/topmatches/all', "upcomingTopMatches", 'schedule')
		this.getMatches('/topmatches/today', "todayTopMatches", 'schedule')
		this.getMatches('/matches/all', "allMatches", 'schedule')
		this.getMatches('/livematches', "liveMatches", 'live')
		this.getTeams('/topteams', "topTeams")



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
		if (this.state.show !== mode) {
			return this.setState({show: mode})
		} else {
			return this.setState({show: null})
		}
	}

	getRenderOption = render => {
		this.setState({
			render,
			show: null
		}, () => this.renderTable())
	}

	// renderTable = () => {
	// 	console.log(this.state.render)
	// 	if (this.state.render.category === 'schedule') {

	// 		tableObject = {
	// 			headers: ['Starting', 'Team 1', 'Team 2', 'Event', 'Time'],

	// 		}
	// 	}

	// 	if (this.state.render.category === 'schedule') {
	// 		tableObject = {
	// 			headers: ['Starting', 'Team 1', 'Team 2', 'Event', 'Time']
	// 		}
	// 	}

	// 	if (this.state.render.category === 'live') {
	// 		tableObject = {
	// 			headers: ['Starting', 'Team 1', 'Team 2', 'Event', 'Time']
	// 		}
	// 	}
	// }



	render() {
		console.log(this.state)

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
								<Button
									onClick={() => this.setMode('live')}
									active={this.state.show === 'live' ? true : false}
									btnClass='live'
									btnText='live'
									activeClass='live-active-btn'
								/>
							</div>
							<div>
								<Button
									onClick={() => this.setMode('schedule')}
									dropDown
									active={this.state.show === 'schedule' ? true : false}
									btnClass='schedule'
									btnText='schedule'
								/>

								<DropDown
									category='schedule'
									reveal={this.state.show === 'schedule' ? true : false}
									items={['top', 'teams', 'events', 'all']}
									getOption={this.getRenderOption}
								/>
							</div>
							<div>
								<Button
									onClick={() => this.setMode('results')}
									dropDown
									active={this.state.show === 'results' ? true : false}
									btnClass='results'
									btnText='results'
								/>

								<DropDown
									category='results'
									reveal={this.state.show === 'results' ? true : false}
									items={['top', 'teams', 'events', 'all']}
									getOption={this.getRenderOption}
								/>
							</div>
						</div>
						<div className='table-container'>
							<Table />
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
