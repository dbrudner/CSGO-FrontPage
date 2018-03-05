// app/routes.js
const bodyParser = require('body-parser')
const {hltv, time} = require('../app-functions')
const path = require('path')


module.exports = function(app) {

    app.get('/events', (req, res) => {
        hltv.timeUntilUpcomingMatches()
        .then(result => {
            res.json(result)
        })
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/build/index.html'))
      });
};