import React from 'react'

export default function TableHead() {
    
    const trStyle = {
        textAlign: 'center',
        fontSize: '1em !important',

    }

    const cell = {
        textAlign: 'center'
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    return (
        <thead>
            <tr style={trStyle}>
                <th style={cell}>Start</th>
                <th style={cell}>Team 1</th>
                <th style={cell}>Team 2</th>
                <th style={cell}>Event</th>
                <th style={cell}>Time {timeZone}</th>
            </tr>
        </thead>
    )
}