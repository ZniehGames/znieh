
var EmailRegistrationForm = function () {
    this.emailElement = element(by.css('#newsletter')).element(by.model('user.email'));
    this.submitElement = element(by.css('#newsletter button'));
};

var UserRegistrationForm = function () {
  this.emailElement = element(by.css('#registration')).element(by.model('user.email'));
  this.usernameElement = element(by.css('#registration')).element(by.model('user.username'));
  this.passwordElement = element(by.css('#registration')).element(by.model('user.plainPassword'));
  this.submitElement = element(by.css('#registration button'));
};

var HomePage = function () {
  this.url = '/#/';
  this.registrationUrl = '/#/?openRegistration=1';

  var emailForm = new EmailRegistrationForm();
  var userForm = new UserRegistrationForm();

  this.registerEmail = function(email) {
    emailForm.emailElement.sendKeys(email);
    emailForm.submitElement.click();
  }

  this.registerSuccess = function() {
     return element(by.css('.toast-success')).getText().then(function(text) {
      return text;
     });
  }

  this.registerError = function() {
     return element(by.css('.toast-error')).getText().then(function(text) {
      return text;
     });
  }

  this.register = function(username, password, email) {
    userForm.usernameElement.sendKeys(username);
    userForm.passwordElement.sendKeys(password);
    userForm.emailElement.sendKeys(email);
    userForm.submitElement.click();
  }

};

module.exports = new HomePage();
