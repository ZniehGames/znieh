var CasernePage = function () {
  this.url = '/#/caserne';
  this.submitElement = element(by.css('button'));

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

  this.selectSlot = function(index) {
    element.all(by.css('.stuff-slot')).get(index).click().then(function(){});
  }

  this.currentSlot = function() {
    return element(by.css('.stuff-slot.active'));
  }

  this.selectObject = function(tabset, index) {
    element.all(by.css('.tab-content')).get(tabset).all(by.css('.object-info')).get(index).click().then(function(){});
  }

  this.getObject = function(tabset, index) {
    return element.all(by.css('.tab-content')).get(tabset).all(by.css('.object-info-container')).get(index);
  }

  this.previewArmorStat = function() {
    return element.all(by.css('.stat')).get(1).getText().then(function(text) {
      return text;
    });
  }

  this.previewWeaponStat = function() {
    return element.all(by.css('.stat')).get(3).getText().then(function(text) {
      return text;
    });
  }

  this.submit = function() {
    this.submitElement.click();
  }

};

module.exports = new CasernePage();
