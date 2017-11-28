'use strict'
var config = {
    port: process.env.port || 9000, //dev env only 
    pageKey:process.env.pageKey || 'EAAES8Cd3PxsBAM2Hj9tIOTS6jZBhZB94dh1Ys0tdixkzHQK9iNKYxGrRe6BMIEKv22BHagZCJ8lZBaZB6mMOZCLRiqySO9r60S1Bl7ASeykyKo8mjpuu2BZBfvALY0ZAZB8fZC7NPZCKtXZCnLKVJP5zXgvQaMvNH4KGYfpxLbdouFmmptXLuVpTDtrB',
    tokenMsn: 'my_token_test_bot',
    weatherKey: process.env.weatherKey || 'f7b011bd1f611507e8454fe16bb4f3ec' 
};

module.exports = config;