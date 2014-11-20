var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.Given(/^I started a game$/, function(done) {
        browser.get(env.baseUrl + '/#/fight');
        done();
    });

    this.Then(/^I should be abble to see the map$/, function(done) {
        canvas = element(by.css('canvas')).isPresent();

        expect(canvas).to.eventually.equal(true).and.notify(done);
    });
};
