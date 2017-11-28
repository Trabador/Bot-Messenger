'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const configuration = require('./config');
const botfb = require('./bot');

const app = express();

function configureApp(){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));

    app.get('/', (req,res)=>{
        res.send('Esta funcionando!');
    });

    app.get('/webhookMsn', (req,res) => {
        if(req.query['hub.verify_token'] == configuration.tokenMsn){
            res.send(req.query['hub.challenge']);
        }
        else{
            res.status(500).send('Acceso prohibido');
        }
    });

    app.post('/webhookMsn', (req,res) => {
        var data = req.body;
        getData(data);
        res.sendStatus(200);
    });
};


function getData(data){
    if(data.object == 'page'){
        data.entry.forEach(element => {
            element.messaging.forEach(message =>{
                console.log(message);
                processMsg(message);
            });
        });
    }
};

function processMsg(message){
    var senderId = message.sender.id;
    var text = message.message.text;
    botfb.bot(text,senderId);
};

function runApp(){
    app.listen(configuration.port,() =>{
        console.log('Server running on port '+configuration.port);
    });
};

const instance = {
    configureApp,
    runApp
};

module.exports = instance;