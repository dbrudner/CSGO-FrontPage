import React from 'react'
import MatchesTable from './matches-table'

export default function TableList(props) {

    const renderTables = () => {
        return Object.keys(props).map((object, index) => {
            return (
                <MatchesTable matches={props[object]}/>
            )
        })
        
    }

    return (
        <div>
            {renderTables()}
        </div>
    )
}