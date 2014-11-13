var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    this.Given(/^I am on the hello page$/, function(next) {
        browser.get(env.baseUrl + '/#/hello');
        next();
    });

    this.Then(/^I can see a list of names$/, function(next) {
        names = element.all(by.css('ul:not(.nav) li')).map(function(e, index) {
          return {
            index: index,
            text: e.getText()
          };
        });

        expect(names).to.eventually.eql([
            {index: 0, text: 'Hello greg !'},
            {index: 1, text: 'Hello florian !'},
            {index: 2, text: 'Hello ramos !'}
        ]).and.notify(next);
    });
};
