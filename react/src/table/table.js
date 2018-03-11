import React from 'react'
import TableHeader from './table-header'
import TableBody from './table-body'

export default function Table(props) {
    console.log(props)

    if (props.tableObject) {
        console.log('hey')
        return (
            <div>
                <table>
                    <TableHeader headers={props.tableObject.headers} />
                    <TableBody matches={props.tableObject.selectedMatches} />
                </table>
            </div>
        )
    } else {
        return null
    }

    
}