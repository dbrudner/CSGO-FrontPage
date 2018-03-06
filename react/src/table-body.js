import React from 'react'
import TableRow from './table-row'

export default function TableBody(props) {

    const renderMatchRows = () => {
        return props.matches.matches.map(match => {
            console.log(match)
            return <TableRow key={match.id} match={match} />
        })
    }

    return <tbody>{renderMatchRows()}</tbody>
}