'use strict'
var config = {
    PORT: process.env.PORT || 9000, //dev env only 
    PAGEKEY:process.env.PAGEKEY || 'EAAHSZClmIeC4BALKCELUavbhGdZAXRyvjkJ2b3rSTQty41P8fopotWQYm72nZCmdJxKjPgDVdxDN53o0tZBV9o7rLrZC3GGdZCDSwkGUYqZBgcmnE4ZBlrI4iLEMBqapar0B8Huf5WIaYlqBim1ktH98Ckx7h5y4PKgfLmqkSKU1QPnfAblReBHa',
    TOKENMSN: process.env.TOKENMSN || 'my_token_test_bot',
    WEATHERKEY: process.env.WEATHERKEY || 'f7b011bd1f611507e8454fe16bb4f3ec' 
};

module.exports = config;