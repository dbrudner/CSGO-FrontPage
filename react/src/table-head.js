import React from 'react'

export default function TableHead() {
    
    const trStyle = {
        textAlign: 'center',
        fontSize: '.78em'
    }

    const thStyle = {
        textAlign: 'center',        
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    return (
        <thead>
            <tr style={trStyle}>
                <th style={thStyle}>Start</th>
                <th style={thStyle}>Team 1</th>
                <th style={thStyle}>Team 2</th>
                <th style={thStyle}>Event</th>
                <th style={thStyle}>Time {timeZone}</th>
            </tr>
        </thead>
    )
}