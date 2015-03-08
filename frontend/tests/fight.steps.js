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
        browser.sleep(1000);
        canvas = element(by.css('canvas')).isPresent();

        expect(canvas).to.eventually.equal(true).and.notify(done);
    });

    this.Then(/^I should be able to see my team$/, function(done) {

      var names = element(by.css('.right-side')).all(by.repeater('unit in units').column('unit.name')).map(function(e, index) {
         return {
           index: index,
           text: e.getText()
         };
       });

       expect(names).to.eventually.eql([
        { index: 0, text: 'Gobelin'},
        { index: 1, text: 'Murden' },
        { index: 2, text: 'Toubib' },
        { index: 3, text: 'Frodon' }
      ]).and.notify(done);
    });
};
