const configuration = require('./config');
const request = require('request');

function bot(text,senderId){
    var msg = null;
    text = text.toLowerCase();

    var salute = ['Hola, buen dia', 'Saludos, como estas', 'Hola , en que te puedo servir?'];

    if(containsKeyword(text,'hola') || containsKeyword(text,'saludos')){
        let x = Math.floor((Math.random() * 3)+1)-1;
        let msg = salute[x];
        console.log(msg);
        sendMsgText(senderId,msg);
    }
    else if(containsKeyword(text,'ayuda')){
        msg = 'En que te puedo ayudar?';
        sendMsgText(senderId,msg);
    }
    else if(containsKeyword(text,'clima')){
         callWeatherAPI(senderId);
    }
    else if(containsKeyword(text,'imagen del dia')){
        callAPODAPI(senderId);
        let msg = 'Aqui esta la imagen del dia, cortesia de APOD, https://apod.nasa.gov/apod/'
        sendMsgText(senderId,msg);
    }
    else if(containsKeyword(text,'informacion')){
        sendTemplateInfo(senderId);
    }
    else if(containsKeyword(text,'fecha') || containsKeyword(text,'hora')){
        callTIMEAPI(senderId);
    }
    else{
        let msg = 'Aun sigo aprendiendo';
        sendMsgText(senderId,msg);
    }
};

function containsKeyword(string,keyword){
    var isContain = false;
    isContain = string.indexOf(keyword) > -1
    return isContain;
}

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

function callTIMEAPI(senderId){
    var timeData = null;
    var url = 'http://api.geonames.org/timezoneJSON?lat=20.67&lng=-103.344&username='+configuration.TIMEKEY;
    request(url, (err,res,body)=>{
        if(err) console.log(err);
        let jsonObj = JSON.parse(body);
        timeData = jsonObj.time;
        let aux = timeData.split(" ");
        let msg = 'Fecha Actual: '+aux[0]+ ' \nHora Actual: '+aux[1];
        sendMsgText(senderId,msg);
    });
}

function callAPODAPI(senderId){
    var imageUrl = null;
    var url = 'https://api.nasa.gov/planetary/apod?api_key='+configuration.APODKEY;
    request(url, (err,res,body)=>{
        if(err) console.log(err);
        let jsonObj = JSON.parse(body);
        imageUrl = jsonObj.url;
        sendMsgImg(senderId,imageUrl);
    });
}

function sendMsgImg(senderId, imageUrl){
    var msgData = {
        recipient: { 
            id: senderId
        },
        message: {
            attachment: {
                type: 'image',
                payload: {
                    url: imageUrl || configuration.DEFAULT_IMAGE
                }
            }
        }
    };
    callFBAPI(msgData);
}

function sendTemplateInfo(senderId){
    var msgData = {
        recipient:{
            id: senderId
        },
        message:{
            attachment:{
                type: 'template',
                payload:{
                    template_type: 'generic',
                    elements:[
                    {
                        title: 'Bienvenido a el Cosmos',
                        image_url: 'https://apod.nasa.gov/apod/image/1711/OrionDust_Battistella_1824.jpg',
                        subtitle:  'El cosmos es un lugar impresionante',
                        default_action: {
                            type: 'web_url',
                            url: 'https://apod.nasa.gov/apod/astropix.html'
                        },
                        buttons:[
                            {
                            type: 'web_url',
                            url: 'https://apod.nasa.gov/apod/astropix.html',
                            title: 'Nasa APOD'
                            }              
                        ]      
                    }
                    ]
                }
            }
        }
    }
    callFBAPI(msgData);
}; 

function callWeatherAPI(senderId){
    var temp = null;
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=45140,mx&appid='+configuration.WEATHERKEY;
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
        qs: { access_token: configuration.PAGEKEY },
        method: 'POST',
        json: msgData
    };

    request(payload, (error, res, data) => {
        if(error){console.log('no se pudo enviar el mensaje'+error);}
        else{
            console.log('mensaje enviado');
            console.log(data);
        }
    });
};

const botFb = {bot};

module.exports = botFb;