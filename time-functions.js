const moment = require('moment')

module.exports = {

    getCurrentUnixTime: function() {
        return moment().unix()
    },

    timeConversion: function(millisec) {

        var seconds = (millisec / 1000).toFixed(1);
    
        var minutes = (millisec / (1000 * 60)).toFixed(1);
    
        var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    
        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
    
        // return {seconds, minutes, hours, day}

        if (seconds < 60) {
            return seconds + " Sec";
        } else if (minutes < 60) {
            return minutes + " Min";
        } else if (hours < 24) {
            return hours + " Hrs";
        } else {
            return days + " Days"
        }
    },

    timeUntil: function(futureTime) {
        const now = this.getCurrentUnixTime()
        const difference = (futureTime - now) * 1000
        return this.timeConversion(difference)
    }
}