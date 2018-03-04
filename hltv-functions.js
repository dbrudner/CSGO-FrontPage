const { HLTV } = require('hltv')
const _ = require('lodash')
const moment = require('moment')

const time = require('./time-functions')

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

    // Returns all matches, usually ~250 items
    getAllMatches: function() {
        return HLTV.getMatches().then(res => {
            return res;
        })
    },

    // Returns all live matches
    getLiveMatches: function() {
        return HLTV.getMatches().then(res => {
            return res.filter(match => {
                return match.live
            })
        })
    },

    // Returns all upcoming matches
    getUpcomingMatches: function() {
        return HLTV.getMatches().then(res => {
            return res.filter(match => {
                return !match.live
            })
        })
    },

    // Returns all upcoming matches with time until property
    // timeUntil = {units of time}
    timeUntilUpcomingMatches: function() {
        return this.getUpcomingMatches().then(res => {
            return res.map(match => {
                if (match.date/1000 > moment().unix()) {
                    let newMatch = match
                    newMatch.timeUntil = time.timeUntil(newMatch.date/1000)
                    return match
                } else {return null}
            })
        })
    },

    timeUntilUpcomingTopMatches: function() {
        return this.getTeamRanking().then(res => {
            return res
        }).then(topTeams => {
            return this.getTopMatches(topTeams)
        })
    },

    // Get all matches where at least one team is a top 10 team
    getTopMatches: function(topTeams) {
        return this.getUpcomingMatches().then(res => {
            return res.filter(match => {
                return topTeams.includes(match.team1.name) || topTeams.includes(match.team2.name)
            })
        })
    },

    getMatches: function() {
        return HLTV.getMatches().then(res => {
            return res
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
                console.log(newData)``
            },
            onDisconnect: () => {
                console.log('disconnected')
            }	
        })
    }, 

    getTopTeams: function() {
        return HLTV.getTeamRanking().then(res => {
            const teams = res.map(team => {
                return team.team.name
            })
            return teams.slice(0, 10)
        })
    },

    getTopRankings: function() {
        return HLTV.getTeamRanking().then(res => {
            const teams = res.map(team => {
                return team
            })
            return teams.slice(0, 10)
        })
    }
}