// Packages
const moment = require('moment-timezone')


// Internal reqs
const time = require('./time-functions')
const hltv = require('./hltv-functions')

hltv.getEvents().then((res) => console.log(res))