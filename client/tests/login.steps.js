var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;


module.exports = function() {

    var HomePage = require('./pages/home.page.js');

    this.When(/^I submit login form as test$/, function(done) {
        HomePage.login('test', 'test');
        done();
    });

    this.When(/^I should be logged in$/, function(done) {
        expect(HomePage.loginWelcome()).to.eventually
        .equal('Bienvenue test !')
        .and.notify(done);
    });

    this.Given(/^I am logged in as test$/, function(done) {
        browser.get(env.baseUrl + HomePage.url);
        HomePage.login('test', 'test');
        expect(HomePage.loginWelcome()).to.eventually
        .equal('Bienvenue test !')
        .and.notify(done);
    });
};
