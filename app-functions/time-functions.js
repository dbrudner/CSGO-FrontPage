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
        
        if (seconds < 60) {
            return seconds + " Sec";
        } else if (minutes < 60) {
            return minutes + " Min";
        } else if (hours < 24) {
            return hours + " Hrs";
        } else {
            return days + " Days"
        }
        // return {milliseconds, seconds, minutes, hours, days}
    },

    timeUntil: function(futureTime) {
        const now = this.getCurrentUnixTime()
        const difference = (futureTime - now) * 1000
        return this.timeConversion(difference)
    },

    convertUnixToUtc: function(unixTime) {
        const time = unixTime/1000
        return moment.unix(time).format("MM/DD/YYYY HH:mm:ss");
    }
}