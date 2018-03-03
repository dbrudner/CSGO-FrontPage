const { HLTV } = require('hltv')
const _ = require('lodash')
const moment = require('moment')

const {timeConverstion} = require('./time-conversion')

module.exports = {

    // Returns all events
    // SCHEMA:
    // [{name: string, id: number}]
    getEvents: function() {

        return HLTV.getMatches().then((res) => {

            let matches = res;
        
            events = res.map(match => {
                return match.event
            })
            

            events = _.uniqBy(events, 'id')                
            return events
        })
    },

    getAllMatches: function() {
        return HLTV.getMatches().then(res => {
            return res;
        })
    },

    getAllLiveMatches: function() {
        return HLTV.getMatches().then(res => {
            return res.filter(match => {
                return match.live
            })
        })
    },

    getAllDeadMatches: function() {
        return HLTV.getMatches().then(res => {
            return res.filter(match => {
                return !match.live
            })
        })
    },

    getMatches: function() {
        HLTV.getMatches().then(res => {

            let matches = res;      
        
            const kat = matches.filter(match => {
                if (match.event) {
                    return match.event.id === 3309
                } else {return}
            })
        
            const liquid = kat.filter(match => {
                return match.team1.name === 'Liquid' || match.team2.name === 'Liquid'
            })
        
            let unix = liquid[0].date
            // const time = moment.unix(unix/1000).format("MM/DD/YYYY/HH:MM:SS");
        
            const current = Date.now()
        
            console.log('unix', unix)
            console.log(current)
        
            const difference = unix - current;
        
            console.log(timeConversion(difference))
            console.log(time)
        
        
            const liveMatches = matches.filter(match => {
                return match.live
            })
            // console.log(liveMatches)
        })
    },
    
    getMatchesStats: function(start, end) {
        return HLTV.getMatchesStats({startDate: start, endDate: end}).then((res) => {
            return res
        })
    },

    connectToScorebot: function(matchId) {
        HLTV.connectToScorebot({id: matchId, onScoreboardUpdate: (data) => {
            console.log("scoreboard update")
            console.log('scoreupdate', data)
        }, onConnect: () => {
            console.log('connected')
        }, onLogUpdate: (newData) => {
            console.log("log update")
            console.log(newData)
        },
        onDisconnect: () => {
            console.log('disconnected')
        }	
        })
    },

    getTeamRanking: function() {
        return HLTV.getTeamRanking().then(res => {
            const teams = res.map(team => {
                return team.team.name
            })
            return teams
        })
    }
}