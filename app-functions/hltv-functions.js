const { HLTV } = require('hltv')
const _ = require('lodash')
const moment = require('moment')

const time = require('./time-functions')

module.exports = {

    getAllObjects: function() {
        return this.getAllMatches()
        .then(res => {
            return this.convertMatchTimes(res)
        })
        .then(matches => {
            return this.addTimeUntil(matches)
        })
        .then(matches => {
            let events = matches.map(match => {
                return match.event
            })

            events = _.uniqBy(events, 'id')
            return {events, matches}
        })
        .then(object => {
            const liveMatches = object.matches.filter(match => {
                return match.live
            })

            const upcomingMatches = object.matches.filter(match => {
                return !match.live
            })

            const nextDay = this.nextDayOnly(object.matches)
            return {...object, liveMatches, upcomingMatches, nextDay}
        })
    },
    // Returns all events
    // SCHEMA:
    // [{name: string, id: number}]
    getEvents: function() {

        return HLTV.getMatches()
        .then((res) => {

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
        return HLTV.getMatches()
        .then(res => {
            return res;
        })
    },

    // Returns all live matches
    getLiveMatches: function() {
        return HLTV.getMatches()
        .then(res => {
            return res.filter(match => {
                return match.live
            })
        })
    },

    // Returns all upcoming matches
    getUpcomingMatches: function() {
        return HLTV.getMatches()
        .then(res =>  res)
    },

    // Gets all matches
    getAllMatches: function() {
        return HLTV.getMatches()
        .then(matches => {
            return this.addTimeUntil(matches)
        })
        .then(matches => {
            return this.convertMatchTimes(matches)
        })
    },

    // Get all matches where at least one team is ranked top 10
    getUpcomingTopMatches: function() {
        return this.getTopRankings()
        .then(res => {
            return res
        })
        .then(topTeams => {
            return this.getTopMatches(topTeams)
        })
        .then(topMatches => {
            return this.convertMatchTimes(topMatches)
        })
        .then(matches => {
            return this.addTimeUntil(matches)
        })
    },

    // Get all matches where at least one team is a top 10 team
    getTopMatches: function(topTeams, matches) {
        const topTeamList = topTeams.map(topTeam => {
            return topTeam.team.name
        })

        return matches.filter(match => {
            if (!match.team1 || !match.team2) {
                return false
            }
            return topTeamList.includes(match.team1.name) || topTeamList.includes(match.team2.name)
        })
    },

    getMatchesStats: function(start, end) {
        return HLTV.getMatchesStats({startDate: start, endDate: end})
        .then((res) => {
            return res
        })
    },

    connectToScorebot: function(matchId) {
        HLTV.connectToScorebot({id: matchId, onScoreboardUpdate: (data) => {
            }, onConnect: () => {
            }, onLogUpdate: (newData) => {
            },
            onDisconnect: () => {
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

    getAllTopTeams: function() {
        return HLTV.getTeamRanking().then(res => {
            return res.reduce((acc, topTeam) => {
                return [...acc, {name: topTeam.team.name, id: topTeam.team.id}]
            }, [])
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
        return this.getTopRankings()
        .then(res => {
            return res
        })
        .then(topTeams => {
            events.forEach(event => {
                let quality = event.teams.reduce((acc, team) => {
                    let value = 31
                    topTeams.forEach(topTeam => {
                        if (topTeam.team.name === team) {
                            return value = topTeam.place
                        }
                    })

                    return acc + value
                }, 0)
                event.quality = quality/event.teams.length
            })
            return _.sortBy(events, 'quality')
        })
    },

    getAllEventsAndSortByQuality: function() {
        return this.getAllTeamsForEvents()
        .then(res => {
            return this.sortEventsByQuality(res)
        })
    },

    convertMatchTimes: function(matches) {
        return matches.map(match => {
            let newMatch = match
            // newMatch.UTCTime = time.convertUnixToUtc(match.date)
            return newMatch
        })
    },

    getTopRankings: function() {
        return HLTV.getTeamRanking()
        .then(res => {
            const teams = res.map(team => {
                return team
            })
            return teams.slice(0, 10)
        })
    },

    getLiveTopMatches: function() {
        return this.getLiveMatches()
        .then(liveMatches => {

        })
    },

    filterTopMatches: function(matches) {
        return this.getTopRankings()
        .then(topTeams => {
            const topTeamsList = topTeams.map(topTeam => {
                if (topTeam) {
                    return topTeam.name
                }
            })

            return matches.filter(match => {
                if (match.team1 && match.team2) {
                return topTeamsList.includes(match.team1.name) || topTeamsList.includes(match.team2.name)
                }
            })
        })
    },

    nextDayOnly: function(matches) {
        return matches.filter(match => {
            if (match.date/1000 - time.getCurrentUnixTime() < (24 * 60 * 60 )) {
                return true
            } else {
                return false
            }
        })
    },

    nextDayMatches: function() {
        return this.getAllMatches()
        .then(matches => {
            return this.nextDayOnly(matches)
        }).then(matches => {
            return this.convertMatchTimes(matches)
        }).then(matches => {
            return this.addTimeUntil(matches)
        })
    },

    nextDayTopMatches: function() {
        return this.nextDayMatches()
        .then(matches => {
            return this.filterTopMatches(matches)
        })
        .then(matches => {
            return this.addTimeUntil(matches)
        })
    },

    addTimeUntil: function(matches) {
        return matches.map(match => {
            let newMatch = match
            newMatch.timeUntil = time.timeUntil(newMatch.date/1000)
            return match
        })
    },

    getResults: function() {
        return HLTV.getResults({pages: 2}).then(res => {
            return res
          })
    }
}