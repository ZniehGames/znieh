'use strict';

// import 'babel/runtime';
// import 'babel/polyfill';
import React from 'react';
import HelloWorld from './components/HelloWorld';

App.start = function() {
    React.render(<HelloWorld />, document.getElementById('content'));
};

export default App;

