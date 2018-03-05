// app/routes.js
const bodyParser = require('body-parser')
const {hltv, time} = require('../app-functions')



module.exports = function(app) {


    app.get('/events', (req, res) => {
        console.log(time)
        hltv.getEvents().then(events => {
            res.json(events)
        })
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/build/index.html'))
      });
};