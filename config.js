'use strict'
var config = {
    PORT: process.env.PORT || 9000, //dev env only 
    PAGEKEY:process.env.PAGEKEY || 'EAAHSZClmIeC4BALKCELUavbhGdZAXRyvjkJ2b3rSTQty41P8fopotWQYm72nZCmdJxKjPgDVdxDN53o0tZBV9o7rLrZC3GGdZCDSwkGUYqZBgcmnE4ZBlrI4iLEMBqapar0B8Huf5WIaYlqBim1ktH98Ckx7h5y4PKgfLmqkSKU1QPnfAblReBHa',
    TOKENMSN: process.env.TOKENMSN || 'my_token_test_bot',
    WEATHERKEY: process.env.WEATHERKEY || 'f7b011bd1f611507e8454fe16bb4f3ec',
    APODKEY: process.env.APODKEY || 'BPhurLQHcrwF0bjAbBG4hruHMtOMnOIzuCQnDQ4f', 
    DEFAULT_IMAGE: 'http://d38zt8ehae1tnt.cloudfront.net/Cosmos_A_Spacetime_Odyssey__Episode_1_Standing_up_in_the_Milky_Way__168516.jpg?v=1468314436'
};

module.exports = config;