// app/routes.js
const bodyParser = require('body-parser')
const {hltv, time} = require('../app-functions')
const path = require('path')


module.exports = function(app) {

    app.get('/topteams', (req, res) => {
        hltv.getAllTopTeams().then(teams => res.json(teams))
    }),

    app.get('/all', (req, res) => {
        hltv.getAllObjects().then(all => res.json(all))
    }),

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/build/index.html'))
    })
};