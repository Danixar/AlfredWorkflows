const alfy = require('alfy');

const result = alfy.input;

if (result) alfy.output([{ title: 'worked!' }]);
else alfy.output([{ title: 'no dice :(' }]);
