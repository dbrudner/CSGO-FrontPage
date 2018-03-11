import React from 'react'
import TableHeader from './table-header'
import TableBody from './table-body'

export default function Table(props) {
    console.log(props)

    

    if (props.tableObject) {
        if (!props.tableObject.selectedMatches) {
            return (
                <div className='no-matches'>
                    No Matches Found
                </div>
            )
        }

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