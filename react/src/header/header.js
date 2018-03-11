import React from 'react'
import {BeatLoader} from 'react-spinners'


export default function Header(props) {

    if (props.alreadyLoaded) {
        return (
            <div className='header text-center'>
                <h1 className='header-title-loaded'>
                    CSGO
                </h1>
                <h3 className='header-description-loaded'>
                    Times and Results
                </h3>
            </div>
        )
    }

    return (
        <div className='header text-center'>
            <h1 className='header-title'>
                CSGO
            </h1>
            <h3 className='header-description'>
                Times and Results
            </h3>
            <div className='loader-container'>
                <div className='loading-message'>
                    Loading
                </div>
                <BeatLoader />
            </div>
        </div>
    )
}