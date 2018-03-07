import React,{Component} from 'react'

export default class SelectTable extends Component {
    constructor(props) {
        super(props)

        this.state = {table: null}
    }

    render() {
        const options = this.props.matches.map(match => <option key={match.name} value={match.name}>{match.name}</option>)

        return (
            <select onChange={event => this.props.getSelectTable(event.target.value)}>
                {options}
                <option key='team' value='team'>By Specific Team</option>
                <option key='event' value='event'>By Specific Event</option>
            </select>
        )
    }
}