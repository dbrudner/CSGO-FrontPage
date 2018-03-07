import React from 'react'
import TableRow from './table-row'

export default function TableBody(props) {

    const renderMatchRows = () => {
        if (!props.matches) {
            console.log(props)
            return
        }
        return props.matches.map(match => {
            return <TableRow key={match.id} match={match} />
        })
    }

    return <tbody>{renderMatchRows()}</tbody>
}