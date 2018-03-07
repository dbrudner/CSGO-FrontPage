import React,{Component} from 'react'

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {team: 'null'}
    }

    renderOptions = () => {
        const options = this.props.options.sort((a, b) => {
            if (this.props.eventMode) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            } else {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            }
        })

        return options.map(option => {

            if (this.props.eventMode) {
                return <option key={option} value={option}>{option}</option>                
            }

            else if (option) {
                return <option key={option.name} value={option.name}>{option.name}</option>
            }
        })
    }

    render() {

        console.log(this.props.options)

        return (
            <select onChange={event => this.props.getValue('team', event.target.value) }>
                {this.renderOptions()}
            </select>
        )
    }
}