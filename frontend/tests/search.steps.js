var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    var SearchPage = require('./pages/search.page.js');

    this.Given(/^I go on the search page$/, function(done) {
        element(by.css('.nav li:nth-child(3)')).click().then(done());
    });

    this.When(/^I want to play$/, function(done) {
        SearchPage.search();
        done();
    });

    this.Then(/^I should be in the queue$/, function(done) {
        expect(SearchPage.info()).to.eventually
        .equal('Informations\nRecherche en cours')
        .and.notify(done);
    });
};
