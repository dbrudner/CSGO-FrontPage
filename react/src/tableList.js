import React from 'react'
import MatchesTable from './matches-table'

export default function TableList(props) {


    const renderTables = () => {
        return props.matches.map(matchSet => {
            return <MatchesTable key={matchSet.name} matches={matchSet} />
        })
    }

    return (
        <div>
            {renderTables()}
        </div>
    )
}