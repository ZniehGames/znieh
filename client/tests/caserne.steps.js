var env = require('./environment.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;


module.exports = function() {

    var CasernePage = require('./pages/caserne.page.js');

    this.Given(/^I go on the caserne page$/, function(done) {
        browser.get(env.baseUrl + CasernePage.url);
        done();
    });

    this.Then(/^helm slot should be selected$/, function(done) {
        expect(CasernePage.currentSlot().getAttribute('class')).to.eventually
        .contain('helm')
        .and.notify(done);
    });

    this.Then(/^I can select only one helm$/, function(done) {
        CasernePage.selectObject(0, 2);
        expect(CasernePage.getObject(0, 2).getAttribute('class')).to.eventually
        .contain('active');

        CasernePage.selectObject(0, 0);
        expect(CasernePage.getObject(0, 0).getAttribute('class')).to.eventually
        .contain('active');

        expect(CasernePage.getObject(0, 2).getAttribute('class')).to.eventually
        .not.contain('active').and.notify(done);
    });


    this.Then(/^I can select only one rune$/, function(done) {
        CasernePage.selectObject(1, 1);
        expect(CasernePage.getObject(1, 1).getAttribute('class')).to.eventually
        .contain('active');

        CasernePage.selectObject(1, 0);
        expect(CasernePage.getObject(1, 0).getAttribute('class')).to.eventually
        .contain('active');

        expect(CasernePage.getObject(1, 1).getAttribute('class')).to.eventually
        .not.contain('active').and.notify(done);
    });

    this.Then(/^preview should be updated$/, function(done) {
        expect(CasernePage.previewArmorStat()).to.eventually
        .equal('20')
        .and.notify(done);
    });

    this.Then(/^I can submit my unit$/, function(done) {
        CasernePage.submit();
        done();
    });

    this.Then(/^I should be redirected to the search page$/, function(done) {
        expect(browser.getCurrentUrl()).to.eventually
        .contain('/#/search')
        .and.notify(done);
    });

    this.When(/^I add full armor components$/, function(done) {
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(1);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(2);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(2);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(3);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(4);
        CasernePage.selectObject(0, 0);
        expect(CasernePage.previewArmorStat()).to.eventually
        .equal('100')
        .and.notify(done);
    });

    this.When(/^I add full sword components$/, function(done) {
        CasernePage.selectSlot(5);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(6);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(7);
        CasernePage.selectObject(0, 0);
        CasernePage.selectSlot(8);
        CasernePage.selectObject(0, 0);
        expect(CasernePage.previewWeaponStat()).to.eventually
        .equal('10-20')
        .and.notify(done);
    });
};
