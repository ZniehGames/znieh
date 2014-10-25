"use strict";

var app=angular.module("znieh",["ngRoute","restangular"]);

app.config(["$interpolateProvider","$routeProvider","RestangularProvider",function(r,e,a){r.startSymbol("{[{"),r.endSymbol("}]}"),a.setBaseUrl("/api")}]);
