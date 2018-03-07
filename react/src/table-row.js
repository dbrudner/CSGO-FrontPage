import React from 'react'
import moment from 'moment'

export default function(props) {

    let team1imgUrl
    let team2imgUrl
    let team1name
    let team2name

    if (props.match.team1) {
        team1imgUrl = `https://static.hltv.org/images/team/logo/${props.match.team1.id}`
        team1name = props.match.team1.name
    }

    if (props.match.team2) {
        team2imgUrl = `https://static.hltv.org/images/team/logo/${props.match.team2.id}`
        team2name = props.match.team2.name
    }

    const imageStyle = {
        width: '25px',
        marginLeft: '10px'
    }

    let formattedTime
    let timeUntil

    const date = new Date();
    const timeZone = date.getTimezoneOffset()/60;
    let newTime = moment(props.match.UTCTime).add(timeZone, 'h')



    if (!props.match.event) {
        return null
    }

    const handleClick = () => {
        console.log(props.match)
    }

    if (props.match.live) {
        timeUntil = (() => <strong>LIVE</strong>)()
        formattedTime = (() => <strong>LIVE</strong>)()
    } else {
        timeUntil = props.match.timeUntil
        formattedTime = moment(newTime._d).format("dddd, MMMM Do YYYY, h:mm:ss a")
    }

    return (
        <tr onClick={handleClick}>
            <td>{timeUntil}</td>
            <td>
                {team1name || 'Unknown'}
                <span><img src={team1imgUrl || 'https://seeklogo.com/images/C/Counter-Strike-logo-EAC70C9C3A-seeklogo.com.png'} style={imageStyle} /></span>
            </td>
            <td>
                {team2name || 'Unknown'}
                <span><img src={team2imgUrl || 'https://seeklogo.com/images/C/Counter-Strike-logo-EAC70C9C3A-seeklogo.com.png'} style={imageStyle} /></span>
            </td>
            <td>{props.match.event.name}</td>
            <td>{formattedTime}</td>
        </tr>
    )
}