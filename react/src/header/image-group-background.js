import React from 'react'

export default function(props) {
    
    const imgCntr = {padding: '1rem'}
    const imageArray = {display: 'grid', gridTemplateColumns: 'auto auto auto auto', position: 'absolute'}

    const renderImages = () => {
        const images = props.srcArray.map(src => {
            return (
                <div key={src} style={imgCntr}>
                    <img className='teamArrayImg' src={src} />
                </div>
            )
        })

        return images.slice(0,28)
    }
    
    return (
        <div style={imageArray}>
            {renderImages()}
        </div>
    )
}