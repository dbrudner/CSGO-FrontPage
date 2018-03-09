import React from 'react'

export default function(props) {
    
    const imgCntr = {padding: '2rem'}
    const img = {width: '100px', opacity: '.1'}
    const imageArray = {display: 'grid', gridTemplateColumns: 'auto auto auto auto', position: 'absolute'}

    const renderImages = () => {
        const images = props.srcArray.map(src => {
            return (
                <div style={imgCntr}>
                    <img style={img} src={src} />
                </div>
            )
        })

        return images.slice(0,24)
    }
    
    return (
        <div style={imageArray}>
            {renderImages()}
        </div>
    )
}