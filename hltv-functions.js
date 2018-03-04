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

    getAllTeamsForEvents: function() {
        return this.getAllMatches()
        .then(res => {
            let matches = res;
        
            events = res.map(match => {
                return match.event
            })
            

            events = _.uniqBy(events, 'id')
            
            events.forEach(event => {
                event.teams = []
            })

            res.forEach(match => {
                events.forEach(event => {
                    if (event.name === match.event.name && !event.teams.includes(match.team1.name)) {
                        event.teams.push(match.team1.name)
                    }

                    if (event.name === match.event.name && !event.teams.includes(match.team2.name)) {
                        event.teams.push(match.team2.name)
                    }
                })
            })
            events.forEach(event => {
                _.uniqBy(event, 'teams')
            })
            return events
        })
    },

    sortEventsByQuality: function(events) {
        return this.getTopRankings().then(res => {
            return res
        }).then(teams => {
            // events.forEach(event => {
            //     event.teams.reduce(team => {
                    
            //     }, 0)
            // })
            return teams
        })
    },

    getAllEventTeamsAndSortByQuality: function() {
        return this.getAllTeamsForEvents().then(res => {
            return this.sortEventsByQuality(res)
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