import React,{Component} from 'react'

export default class SelectTable extends Component {
    constructor(props) {
        super(props)

        this.state = {table: null}
    }

    render() {
        const options = this.props.matches.map(match => <option key={match.id} value={match.name}>{match.name}</option>)

        return (
            <select onChange={event => this.props.getSelectTable(event.target.value)}>
                {options}
            </select>
        )
    }
}