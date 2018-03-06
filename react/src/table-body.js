import React from 'react'
import TableRow from './table-row'

export default function TableBody(props) {

    const renderMatchRows = () => {
        if (!props.matches.matches) {
            console.log(props)
            return
        }
        return props.matches.matches.map(match => {
            return <TableRow key={match.id} match={match} />
        })
    }

    return <tbody>{renderMatchRows()}</tbody>
}