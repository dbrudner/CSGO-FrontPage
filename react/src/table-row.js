import React from 'react'
import moment from 'moment'

export default function(props) {
    const team1imgUrl = `https://static.hltv.org/images/team/logo/${props.match.team1.id}`
    const team2imgUrl = `https://static.hltv.org/images/team/logo/${props.match.team2.id}`
    
    const imageStyle = {
        width: '25px',
        marginLeft: '10px'
    }

    const date = new Date();
    const timeZone = date.getTimezoneOffset()/60;
    let newTime = moment(props.match.UTCTime).add(timeZone, 'h')
    // newTime = newTime._d

    console.log(newTime)
    const formattedTime = moment(newTime).format("dddd, MMMM Do YYYY, h:mm:ss a")


    return (
        <tr>
            <td>{props.match.timeUntil}</td>
            <td>
                {props.match.team1.name}
                <span><img src={team1imgUrl} style={imageStyle} /></span>
            </td>
            <td>
                {props.match.team2.name}
                <span><img src={team2imgUrl} style={imageStyle} /></span>
            </td>
            <td>{props.match.event.name}</td>
            <td>{formattedTime}</td>
        </tr>
    )
}