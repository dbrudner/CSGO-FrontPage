import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'

import Header from './header/header'
import ImageGroupBackground from './header/image-group-background'

import Button from './button/button'
import DropDown from './dropdown/dropdown'
import Table from './table/table'
import ListSelect from './list-select/list-select'


class App extends Component {

	constructor(props) {
		super(props)
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
		this.scheduleHeaders = ['Starting', 'Team 1', 'Team 2', 'Event', `Time - (${timeZone})`]
		this.resultsHeaders = ['Team 1', 'Team 2', 'Result', 'Format', 'Event']

		this.state = {
			matches: [],
			selectedMatches: [],
			team: null,
			itemsReturned: 0,
			show: '',
			schedule: [],
			results: [],
			live: [],
			render: {
				option: null,
				category: null
			},
			listItems: [],
			tableObject: null
		}
	}

	getMatches = (route, name, category) => {
		axios.get(route)
		.then(res => {
			const key = category
			const matches = res.data.matches
			const matchesObj = {name,matches}
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

		this.getTeams('/topteams', "topTeams")
		axios.get('/all')
		.then(res => {
			const events = res.data.events;
			const liveMatches = res.data.liveMatches;
			const upcomingMatches = res.data.upcomingMatches;
			const nextDayMatches = res.data.nextDay;

			this.setState({events,liveMatches,upcomingMatches, nextDayMatches})
		})
	}

	setMode = mode => {

		if (mode === 'live') {
			this.setState({
				tableObject: {
					headers: this.scheduleHeaders,
					selectedMatches: this.state.liveMatches
				}
			})
		}

		if (this.state.show !== mode) {
			if (this.state.show === 'live') {
				this.setState({tableObject: null})
			}
			return this.setState({show: mode, listItems: []})
		} else {
			if (this.state.show === 'live') {
				this.setState({tableObject: null})
			}
			return this.setState({show: null, listItems: [], tableObject: null})
		}
	}

	getRenderOption = render => {
		this.setState({
			render,
			show: null
		}, () => this.renderOrMoreInfo())
	}

	getAndSortTeams = allMatches => {

		let teams = allMatches.reduce((acc, match) => {
			if (!match.team1) {
				return acc
			}
			if (!acc.includes(match.team1.name)) {
				acc = [...acc, match.team1.name]
			}
			if (!acc.includes(match.team2.name)) {
				acc = [...acc, match.team2.name]
			} 
			return acc;
		}, [])


		return teams.sort(function (a, b) {
			return a.toLowerCase().localeCompare(b.toLowerCase());
		});
	}

	getAndSortEvents = allMatches => {
		let events = allMatches.reduce((acc, match) => {
				if (match.event) {
					if (!acc.includes(match.event.name)) {
						return acc = [...acc, match.event.name]
					} 
				}
				return acc;
		}, [])
		
		return events.sort(function (a, b) {
			return a.toLowerCase().localeCompare(b.toLowerCase());
		});
	}

	renderOrMoreInfo = () => {
		const allMatches = this.state.upcomingMatches
		const teams = this.getAndSortTeams(allMatches)
		const events = this.getAndSortEvents(allMatches)

		if (this.state.render.category === 'schedule') {
			if (this.state.render.option === 'teams') {
				this.setState({listItems: teams, tableObject: null})
			}
			if (this.state.render.option === 'events') {
				this.setState({listItems: events, tableObject: null})
			}

			if (this.state.render.option === 'top') {

				let topTeamList = this.state.topTeams.map(topTeam => {
					return topTeam.name
				})

				topTeamList = topTeamList.slice(0, 10)
				

				const selectedMatches = this.state.upcomingMatches.filter(match => {
					if (!match.team1 || !match.team2) {
						return false
					}
					return topTeamList.includes(match.team1.name) || topTeamList.includes(match.team2.name)
				})

				this.setState({
					tableObject: {
						headers: this.scheduleHeaders,
						selectedMatches
					}
				})
			}

			if (this.state.render.option === '24 hours') {
				this.setState({
					tableObject: {
						headers: this.scheduleHeaders,
						selectedMatches: this.state.nextDayMatches
					}
				})
			}
		}
	}

	getListItem = item => {

		this.setState({show: null, listItems: [], tableObject: null})
		// Sets either 'live', 'schedule', or 'results'
		const category = this.state.render.category

		// Get all matches that are live, upcoming (schedule), or results (finished)
		const matches = this.state.upcomingMatches

		if (category === 'schedule') {
			if (this.state.render.option === 'teams') {

				// Filter through matches and find matches with selected team
				const selectedMatches = matches.filter(match => {
					if (match.team1 && match.team2) {
						
						if (match.team1.name === item || match.team2.name === item) {
							
							return match
						}
					}
				})

				// use this to render table
				const tableObject = {
					selectedMatches,
					headers: this.scheduleHeaders
				}
				this.setState({tableObject})			
			}
	
			if (this.state.render.option === 'events') {
				const selectedMatches = matches.filter(match => {
					if (match.event) {
						if (match.event.name === item) {
							return match
						}
					}	
				})
	
				const tableObject = {
					selectedMatches,
					headers: this.scheduleHeaders
				}
				this.setState({tableObject})	
			}

			if (this.state.render.option === 'top') {

			}
		}
	}

	render() {

		if (this.state.events && this.state.topTeams) {

			const srcArray = this.state.topTeams.map(topTeam => `https://static.hltv.org/images/team/logo/${topTeam.id}`)

			return (
				<div>
					<div className='header-container'>
						<div className='arrayCntr'>
							<ImageGroupBackground srcArray={srcArray} />
						</div>
						<Header alreadyLoaded/>
					</div>
					<main className='main'>
						<div className='buttons'>
							<div>
								<Button
									onClick={event => this.setMode('live')}
									active={this.state.show === 'live' ? true : false}
									btnClass='live'
									btnText='live'
									activeClass='live-active-btn'
								/>
							</div>
							<div>
								<Button
									onClick={event => {
										event.preventDefault()
										this.setMode('schedule')
									}}
									dropDown
									active={this.state.show === 'schedule' ? true : false}
									btnClass='schedule'
									btnText='schedule'
								/>

								<DropDown
									category='schedule'
									reveal={this.state.show === 'schedule' ? true : false}
									items={['top', 'teams', 'events', '24 hours']}
									getOption={this.getRenderOption}
								/>
							</div>
						</div>
						<div className='list-select-container text-center'>
							<ListSelect 
								listItems={this.state.listItems}
								highlight={this.state.topTeams.slice(0, 10).map(team => {return team.name})}
								getListItem={this.getListItem}
								longText={this.state.render.option === 'events' ? true : false}
							/>
						</div>
						<div className='table-container'>
							<Table tableObject={this.state.tableObject}/>
						</div>
					</main>
				</div>
			)
		} else {
			return (
				<div className='header-container'>
					<Header loading/>
				</div>
			)
		}
	}
}

export default App;
