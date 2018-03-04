const moment = require('moment')

module.exports = {

    getCurrentUnixTime: function() {
        return moment().unix()
    },

    timeConversion: function(millisec) {
        const milliseconds = millisec
        const seconds = (millisec / 1000).toFixed(1);
        const minutes = (millisec / (1000 * 60)).toFixed(1);
        const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
        const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
    
        return {milliseconds, seconds, minutes, hours, days}
    },

    timeUntil: function(futureTime) {
        const now = this.getCurrentUnixTime()
        const difference = (futureTime - now) * 1000
        return this.timeConversion(difference)
    }
}