var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function() {

    var SearchPage = require('./pages/search.page.js');

    this.Given(/^I am on the search page$/, function(done) {
        browser.get(env.baseUrl + SearchPage.url);
        done();
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

    this.Then(/^a match should be found$/, function(done) {
        expect(SearchPage.success()).to.eventually
        .equal('Cool\nMatch trouvé')
        .and.notify(done);
    });
};
