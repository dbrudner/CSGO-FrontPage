const assert = require('chai').assert;
const time = require ('../time-functions')
const timeUntil = time.timeUntil
const moment = require('moment')

describe('time', function() {

    const oneMin = moment().unix() + 6000

    it('should return 1 minute', function() {
        assert.equal(time.timeUntil(oneMin), '1.0 Min');
    })
})