import React from 'react'

export default function(props) {

    console.log(props)

    const renderList = () => {
        return props.items.map(item => {
            return <li className='drop-list-item'>{item}</li>
        })
    }

    if (props.reveal) {
        return (
            <ul className='dropdown-list text-center'>
                {renderList()}
            </ul>
        )
    } else {
        return <div/>
    }
}