'use strict'
var config = {
    port: process.env.port || 9000, //dev env only 
    pageKey:process.env.pageKey || 'EAAHSZClmIeC4BALKCELUavbhGdZAXRyvjkJ2b3rSTQty41P8fopotWQYm72nZCmdJxKjPgDVdxDN53o0tZBV9o7rLrZC3GGdZCDSwkGUYqZBgcmnE4ZBlrI4iLEMBqapar0B8Huf5WIaYlqBim1ktH98Ckx7h5y4PKgfLmqkSKU1QPnfAblReBHa',
    tokenMsn: 'my_token_test_bot',
    weatherKey: process.env.weatherKey || 'f7b011bd1f611507e8454fe16bb4f3ec' 
};

module.exports = config;