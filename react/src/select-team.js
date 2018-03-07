import React,{Component} from 'react'

export default class SelectTeam extends Component {
    constructor(props) {
        super(props)
        this.state = {team: 'null'}
    }

    renderTeams = () => {
        const teams = this.props.teams.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        })

        return teams.map(team => {
            if (team) {
                return <option value={team.name}>{team.name}</option>                
            }
        })
    }

    render() {
        return (
            <select onChange={event => this.props.getTeam('team', event.target.value) }>
                {this.renderTeams()}
            </select>
        )
    }
}