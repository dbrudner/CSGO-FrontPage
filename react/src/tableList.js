import React from 'react'
import Table from './table'

export default function TableList(props) {

    const renderTables = () => {
        return Object.keys(props).map((object, index) => {
            return (
                <Table matches={props[object]}/>
            )
        })
        
    }

    return (
        <div>
            {renderTables()}
        </div>
    )
    
}