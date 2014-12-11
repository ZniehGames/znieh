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

    this.Then(/^I should be able to see my team$/, function(done) {
      browser.sleep(1000);
       names = element.all(by.repeater('unit in team.units').column('unit.name')).map(function(e, index) {
         return {
           index: index,
           text: e.getText()
         };
       });

       expect(names).to.eventually.eql([
           {index: 0, text: 'Jacky'},
           {index: 1, text: 'Bobby'},
           {index: 2, text: 'Neirda'},
           {index: 3, text: 'Sam Soul'}
       ]).and.notify(done);
    });
};
