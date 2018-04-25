const TelegramBot = require('node-telegram-bot-api');
var barcode = require('barcode');
var firebase = require('firebase');
// replace the value below with the Telegram token you receive from @BotFather
const token = '591327486:AAEoVPWsWzkdqNeg2cqCu4iNc-gXWc-8d4U';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var config = {
   apiKey: "AIzaSyAet4VmmuhViG6LgrAi7XAR0zzbccSUFPA",
   authDomain: "shops-db02f.firebaseapp.com",
   databaseURL: "https://shops-db02f.firebaseio.com/",
   storageBucket: "shops-db02f.appspot.com"
 };
 firebase.initializeApp(config);

 // Get a reference to the database service
 var database = firebase.database();

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(msg);
  var userId = msg.from.id;
  firebase.database().ref('/botshops/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().id) || 'Anonymous';
    if(username === 'Anonymous'){
        regUser(msg);
    }else{
      screenHello(msg,true);
    }


  });
});

const CONST = {   
    menu : 'Меню',
};

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {


});

function regUser(msg){
  var last_name = '';
  if(msg.from.last_name)last_name = msg.from.last_name;

  var first_name = '';
  if(msg.from.first_name)first_name = msg.from.first_name;

  firebase.database().ref('/botshops/users/' + msg.from.id).set({
    id: msg.from.id,
    balls: 0,
    visitors : 0,
    first_name: first_name,
    last_name: last_name
  });

  screenHello(msg);

}

function screenHello(msg, start = true) {
  bot.sendGame(msg.chat.id, gameName);
  const text = start ? 'Привет, '+msg.from.first_name+'!\nВсем, кому интересно провести время в кругу хорошей компании и увлекательных игр, проверить свою интуицию и получить массу удовольствий, позитива, положительных эмоций.\nДобро пожаловать!\nКлуб друзей ВТЕМЕ ждет Вас!' :'' ;

  bot.sendMessage(msg.chat.id, text,{
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          }
        ]
      ]
    }
  });

  //

}
