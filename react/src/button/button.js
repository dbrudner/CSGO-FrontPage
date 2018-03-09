import React from 'react'

export default function Button(props) {

    const iconStyle = {
        marginLeft:'5px'
    }


    const active = () => {
        if (props.active) {
            return props.activeClass || 'btn-active'
        } else {return null}
    }

    return (
        <div 
            onClick={props.onClick} 
            className={`btn ${props.btnClass} ${active()}`}
        >
            {props.btnText}{props.dropDown ? <i style={iconStyle} className="fas fa-chevron-circle-down"></i> : <i style={iconStyle} className="fas fa-circle"></i>}
        </div>
    )
}