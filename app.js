'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const configuration = require('./config');
const xml2js = require('xml2js');
const fs = require('fs');
const parser = xml2js.Parser();

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
    bot(text,senderId);
};

function bot(text,senderId){
    var msg = null;
    text = text.toLowerCase();

    var salute = ['Hola, buen dia', 'Saludos, como estas', 'Hola , en que te puedo servir?'];

    if(text.indexOf('hola')>-1 || text.indexOf('saludos')>-1){
        let x = Math.floor((Math.random() * 3)+1)-1;
        let msg = salute[x];
        console.log(msg);
        sendMsgText(senderId,msg);
    }
    else if(text.indexOf('ayuda') > -1){
        msg = 'En que te puedo ayudar?';
        sendMsgText(senderId,msg);
    }
    else if(text.indexOf('clima')>-1){
         callWeatherAPI(senderId);
    }
    else if(text.indexOf('imagen')>-1 && text.indexOf('gato')>-1){
        sendMsgImg(senderId);
        let msg = 'Aqui esta un gato'
        sendMsgText(senderId,msg);
    }
    else{
        let msg = 'Aun sigo aprendiendo';
        sendMsgText(senderId,msg);
    }
};

function sendMsgText(senderId,msg){
    var msgData = {
        recipient: { 
            id: senderId
        },
        message: {
            text: msg
        }
    };
    callFBAPI(msgData);
};

function sendMsgImg(senderId){
    var msgData = {
        recipient: { 
            id: senderId
        },
        message: {
            attachment: {
                type: 'image',
                payload: {
                    url: 'http://thecatapi.com/api/images/get?format=src'
                }
            }
        }
    };
    callFBAPI(msgData);
}

function callWeatherAPI(senderId){
    var temp = null;
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=45140,mx&appid='+configuration.weatherKey;
    request(url, (err,res,body)=>{
        if(err) console.log(err);
        let jsonObj = JSON.parse(body);
        temp = jsonObj.main.temp;
        temp = temp - 273.15;
        let msg = 'El clima para hoy es de '+temp+' °C';
        sendMsgText(senderId,msg);
    });
};

function callFBAPI(msgData){
    var payload = {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: configuration.pageKey },
        method: 'POST',
        json: msgData
    };

    request(payload, (error, res, data) => {
        if(error){console.log('no se pudo enviar el mensaje'+error);}
        else{console.log('mensaje enviado');}
    });
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