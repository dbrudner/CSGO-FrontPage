import React from 'react'

export default function(props) {

    const getOption = option => {
        const renderObject = {
            option,
            category: props.category
        }
        props.getOption(renderObject)
    }

    const renderList = () => {
        return props.items.map(item => {
            return <li onClick={() => getOption(item)} key={item} className='drop-list-item'>{item}</li>
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