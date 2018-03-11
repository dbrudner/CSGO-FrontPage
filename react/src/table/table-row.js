import React from 'react'
import moment from 'moment'

export default function(props) {

    // Some matches don't have team1 or team2, so we do this complicated shit
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

    // Convert time to user's timezone and format
    let formattedTime
    let timeUntil

    const date = new Date();
    const timeZone = date.getTimezoneOffset();
    let newTime = moment(props.match.UTCTime).subtract(timeZone, 'm')

    const liveText = {
        color: 'red',
        fontWeight: '700'
    }
    // If the match is live, print "LIVE" instead of time
    if (props.match.live) {
        timeUntil = (() => <div style={liveText}>LIVE</div>)()
        formattedTime = (() => <div style={liveText}>LIVE</div>)()
    } else {
        timeUntil = props.match.timeUntil
        formattedTime = (moment(props.match.date).format("dddd, MMMM Do YYYY, h:mm:ss a"))
    }
    
    //For Debugging
    const handleClick = () => {
        console.log(props.match)
    }

    // S T Y L E B O Y Z
    const imageStyle = {
        width: '25px',
        height: '25px',
        marginLeft: '10px'
    }

    const cell = {
        whiteSpace: 'nowrap',
        width: '1%'
    }
    
   
    
    if (!props.match.event) {
        return null
    }

    return (
        <tr className='trow' onClick={handleClick}>
            <td style={cell}>{timeUntil}</td>
            <td style={cell}>
                {team1name || 'Unknown'}
                <span><img src={team1imgUrl || 'https://seeklogo.com/images/C/Counter-Strike-logo-EAC70C9C3A-seeklogo.com.png'} style={imageStyle} /></span>
            </td>
            <td style={cell}>
                {team2name || 'Unknown'}
                <span><img src={team2imgUrl || 'https://seeklogo.com/images/C/Counter-Strike-logo-EAC70C9C3A-seeklogo.com.png'} style={imageStyle} /></span>
            </td>
            <td style={cell}>{props.match.event.name}</td>
            <td style={cell}>{formattedTime}</td>
        </tr>
    )
}