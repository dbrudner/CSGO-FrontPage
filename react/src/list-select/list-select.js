import React from 'react'

export default function ListSelect(props) {

    const renderList = () => {
        return props.listItems.map(item => {
            return (
                <li className='list-item-cntr' key={item}>
                    <div className='list-item'>{item}</div>
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