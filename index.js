// Packages
const moment = require('moment-timezone')


// Internal reqs
const time = require('./time-functions')
const hltv = require('./hltv-functions')

const times = hltv.timeUntilUpcomingTopMatches()
.then(res => {
	console.log(res)
})