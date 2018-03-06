import React from 'react'
import TableRow from './table-row'

export default function TableBody(props) {

    const renderMatchRows = () => {
        return props.matches.matches.map(match => {
            return <TableRow match={match} />
        })
    }

    return <tbody>{renderMatchRows()}</tbody>
}