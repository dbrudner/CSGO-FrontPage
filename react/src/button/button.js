import React from 'react'

export default function Button(props) {

    const iconStyle = {
        marginLeft:'5px'
    }

    return (
        <div onClick={props.onClick} className={`btn ${props.btnClass}`}>
            {props.btnText}{props.dropDown ? <i style={iconStyle} className="fas fa-chevron-circle-down"></i> : <i style={iconStyle} className="fas fa-circle"></i>}
        </div>
    )
}