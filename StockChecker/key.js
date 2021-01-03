const alfy = require('alfy');

alfy.cache.set('token', alfy.input.trim());
alfy.output([{ title: `IEX CLoud API Key set to: ${alfy.cache.get('token')}` }]);
