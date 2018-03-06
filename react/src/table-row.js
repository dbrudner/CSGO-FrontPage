import React from 'react'

export default function(props) {
    const team1imgUrl = `https://static.hltv.org/images/team/logo/${props.match.team1.id}`
    const team2imgUrl = `https://static.hltv.org/images/team/logo/${props.match.team2.id}`
    
    const imageStyle = {
        width: '25px',
        marginLeft: '10px'
    }

    return (
        <tr>
            <td>'countdown'</td>
            <td>
                {props.match.team1.name}
                <span><img src={team1imgUrl} style={imageStyle} /></span>
            </td>
            <td>
                {props.match.team2.name}
                <span><img src={team2imgUrl} style={imageStyle} /></span>
            </td>
            <td>{props.match.event.name}</td>
            <td>{props.match.UTCTime}</td>
        </tr>
    )
}