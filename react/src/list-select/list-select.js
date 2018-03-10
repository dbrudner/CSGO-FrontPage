import React from 'react'

export default function ListSelect(props) {

    const renderList = () => {
        return props.listItems.map(item => {
            return (
                <li className='list-item' key={item}>
                    {item}
                </li>
            )
        })
    }

    return (
        <ul className='list-select'>
            {renderList()}
        </ul>
    )
}