// Packages


// Internal reqs
const {timeConversion} = require('./time-conversion')
const hltv = require('./hltv-functions')

hltv.getAllLiveMatches()
.then(res => console.log(res))