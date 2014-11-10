var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;


module.exports = function() {

    var HomePage = require('./pages/home.page.js');

    this.After(function(done){
        //browser.executeScript('window.sessionStorage.clear();');
        //browser.executeScript('window.localStorage.clear();');
        done();
    });

    this.Given(/^I am on the homepage$/, function(done) {
        browser.get(env.baseUrl + HomePage.url);
        done();
    });

    this.Given(/^I am on the homepage with registration enabled$/, function(done) {
        browser.get(env.baseUrl + HomePage.registrationUrl);
        done();
    });

    this.Then(/^I submit email registration form with "([^"]*)"$/, function(email, done) {
        HomePage.registerEmail(email);
        done();
    });

    this.When(/^^I submit registration form with good values$/, function(done) {
        HomePage.register('Salut', 'cavaman', 'ouibien@gmail.com');
        done();
    });

    this.When(/^^I submit registration form with wrong values$/, function(done) {
        HomePage.register('Salsqdut', 'cavaqsdman', 'ouibien.com');
        done();
    });

    this.Then(/^I should see my email has been registered$/, function(done) {
        expect(HomePage.registerSuccess()).to.eventually
        .equal('Bienvenue sur Znieh\nFélicitations ton email a bien été enregistré, tu pourras jouer avant tout les autres !')
        .and.notify(done);
    });

    this.Then(/^I should be registered$/, function(done) {
        expect(HomePage.registerSuccess()).to.eventually
        .equal('Bienvenue sur Znieh\nFélicitations ton compte a bien été enregistré, tu vas pouvoir jouer !')
        .and.notify(done);
    });

    this.Then(/^I should not be registered$/, function(done) {
        expect(HomePage.registerError()).to.eventually.equal('Oops !\nTu n\'pas l\'air tout à fait prêt !').and.notify(done);
    });

    this.Then(/^I should see my email is not valid$/, function(done) {
        expect(HomePage.registerError()).to.eventually
        .equal('Oops !\nCette email n\'a pas l\'air valide... Essayes en un autre ;-)')
        .and.notify(done);
    });
};
