const assert = require('chai').assert;
const app = require('../test')


describe('app', function() {
    it('should say hello', function() {
        assert.equal(sayHi(), 'hi');
    })

    it('should return a string', function() {
        let result = sayHi();
        assert.typeOf(result, 'string');
    })

})