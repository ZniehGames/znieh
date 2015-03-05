var SearchPage = function () {
  this.url = '/#/search';
  this.submitElement = element(by.css('.search button'));

  this.success = function() {
     return element(by.css('.toast-success')).getText().then(function(text) {
      return text;
     });
  }

  this.info = function() {
     return element(by.css('.toast-info')).getText().then(function(text) {
      return text;
     });
  }

  this.search = function() {
    this.submitElement.click();
  }

};

module.exports = new SearchPage();
