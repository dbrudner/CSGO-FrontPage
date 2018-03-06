import React from 'react'

export default function TableTitle(props) {

    const style = {
        textAlign: 'left',
        fontSize: '14px'
    }

    return (
        <div style={style}>
            {props.name}
        </div>
    )
}