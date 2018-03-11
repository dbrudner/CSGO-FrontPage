// app/routes.js
const bodyParser = require('body-parser')
const {hltv, time} = require('../app-functions')
const path = require('path')


module.exports = function(app) {

    app.get('/events', (req, res) => {
        hltv.timeUntilUpcomingMatches()
        .then(matches => {
            res.json(matches)
        })
    }),

    app.get('/topmatches/today', (req, res) => {
        hltv.nextDayTopMatches().then(matches => {
            const returnObject = {
                name: 'Top Matches Next 24 Hours',
                matches
            }
            res.json(returnObject)
        })
    }),

    app.get('/topmatches/all', (req, res) => {
        hltv.getUpcomingTopMatches().then(matches => {
            const returnObject = {
                name: 'Top Upcoming Matches',
                matches
            }
            res.json(returnObject)
        })
    }),

    app.get('/matches/all', (req, res) => {
        hltv.getAllMatches().then(matches => {
            const returnObject = {
                name: 'All Matches',
                matches
            }
            res.json(returnObject)
        })
    }),

    app.get('/matches/today', (req, res) => {
        hltv.nextDayMatches().then(matches => {
            const returnObject = {
                name: 'Matches Next 24 Hours',
                matches
            }
            res.json(returnObject)
        })
    }),

    app.get('/events', (req, res) => {
        hltv.getEvents().then(events => res.json(events))
    }),

    app.get('/livematches', (req, res) => {
        hltv.getLiveMatches().then(matches => res.json(matches))
    }),

    app.get('/topteams', (req, res) => {
        hltv.getAllTopTeams().then(teams => res.json(teams))
    })

    app.get('/results', (req, res) => {
        hltv.getResults().then(results => res.json(results))
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/build/index.html'))
    });
};