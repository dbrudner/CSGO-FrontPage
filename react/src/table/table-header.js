import React from 'react'

export default function TableHeader(props) {
    console.log(props)
    const renderHeaders = () => {
        return props.headers.map(header => <th key={header}>{header}</th>)
    }
    
    return (
        <thead>
            <tr className='table-header'>
                {renderHeaders()}
            </tr>
        </thead>
    )
}