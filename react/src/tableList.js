import React,{Component} from 'react'
import axios from 'axios'

export default class TableList extends Component {

    componentDidMount() {
        axios.get('/events')
        .then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                a tableLis
            </div>
        ) 
               
    }
}