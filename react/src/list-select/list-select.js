import React from 'react'

export default function ListSelect(props) {
    
    const renderList = () => {
        return props.listItems.map(item => {
            if (props.highlight.includes(item)) {
                return (
                    <li onClick={() => {props.getListItem(item)}} className='list-item-cntr' key={item}>
                        <div className='list-item list-item-highlight'>{item}</div>
                    </li>
                )
            } else {
                return (
                    <li onClick={() => {props.getListItem(item)}} className={props.longText ? 'list-item-cntr-long' : 'list-item-cntr'} key={item}>
                        <div className={props.longText ? 'long-list-item' : 'list-item'}>{item}</div>
                    </li>
                )
            }
        })
    }

    return (
        <ul className={props.longText ? 'list-select-long' : 'list-select'}>
            {renderList()}
        </ul>
    )
}