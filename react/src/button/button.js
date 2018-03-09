import React from 'react'

export default function Button(props) {
    return (
        <div className={`btn ${props.btnClass}`}>
            {props.btnText}{props.dropDown ? ' dropdown' : null}
        </div>
    )
}