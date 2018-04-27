
"use strict";

const TelegramBot = require('node-telegram-bot-api');
var firebase = require('firebase');
const express        = require('express');
const bodyParser     = require('body-parser');
var app = express();
const token = '591474766:AAF4ehNAjAn5opHKfv8YvTfKiYDEHlIDTJQ';
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

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chek/', function(request, response){
  const id = request.body.id;
  const url_chek = request.body.url_chek;
  //console.log(request.body);
  response.send(id + '\n'+url_chek); 
  bot.sendMessage(472342085, 'Ваш чек.');
  
   
});

app.listen(3000);

const CONST = {

    info : 'О клубе',
    catalog : 'Игры',
    menu : 'Меню',
    request : 'Оставить заявку',
    request_1 : 'REQUEST',
    mafia : 'Мафия',
    mafia_1 : 'MAFIA',
    krokodil : 'Крокодил',
    krokodil_1 : 'KROKODIL',
    alias : 'Alias',
    alias_1 : 'ALIAS',
    jenga : 'Jenga',
    jenga_1 : 'JENGA',
    imag : 'Имаджинариум',
    imag_1 : 'IMAG',
    shakal : 'Шакал',
    shakal_1 : 'SHAKAL',
    poker : 'Покер',
    poker_1 : 'POKER',
    mono : 'Монополия',
    mono_1 : 'MONO',
    svin : 'Свинтус',
    svin_1 : 'SVIN',
    manch : 'Манчкин',
    manch_1 : 'MANCH',
    shah : 'Шахматы',
    shah_1 : 'SHAH',
    nardi : 'Нарды',
    nardi_1 : 'NARDI',
    pn : 'ПТ',
    pn_1 : 'PN',
    sb : 'СБ',
    sb_1 : 'SB',
    vs : 'ВС',
    vs_1 : 'VS',
    back_to_request :'Назад',
    back_to_request_1 : "back_to_request_1",
    korporativ :'Корпоратив',
    korporativ_1 : "korporativ_1",
    oplata : 'Оплатить сейчас',
    oplata_1 : 'oplata_1',

};

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  console.log(msg);
  var userId = msg.from.id;
  firebase.database().ref('/botshopsusers/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().id) || 'Anonymous';
    if(username === 'Anonymous'){
        regUser(msg);
    }else{
      screenHello(msg,true);
    }


  });



});

bot.on('message', (msg) => {
    var info = "О клубе";
    if (msg.text.indexOf(info) === 0) {
          screenInfo(msg);
    }
    var games = "Игры";
    if (msg.text.indexOf(games) === 0) {
          screenGames(msg);;
    }
    var request = "Оставить заявку";
    if (msg.text.indexOf(request) === 0) {
         screenRequest(msg);
    }
    var paymant = "Оплатить сейчас";
    if (msg.text.indexOf(paymant) === 0) {
         screenOplata(msg);
    }
});
// bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//   bot.answerCallbackQuery(callbackQuery.id, { url });
// });
bot.on('callback_query', query => {
    console.log(query);

    switch (query.data) {
      case 'INFO':
        screenInfo(query);
        break;
      case 'CATALOG':
        screenGames(query);
        break;
      case 'MENU':
        screenMenu(query);
        break;
      case CONST.request_1:
        screenRequest(query);
        break;
      case CONST.pn_1:
        screenPN(query);
        break;
      case CONST.sb_1:
        screenSB(query);
        break;
      case CONST.vs_1:
        screenVS(query);
        break;
      case CONST.korporativ_1:
        screenKP(query);
        break;
      case CONST.back_to_request_1:
        screenRequest(query);
        break;
      case CONST.mafia_1:
        screenMafia(query);
        break;
      case CONST.krokodil_1:
        screenKrokodil(query);
        break;
      case CONST.alias_1:
        screenAlias(query);
        break;
      case CONST.jenga_1:
        screenJenga(query);
        break;
      case CONST.imag_1:
        screenJenga(query);
        break;
      case CONST.shakal_1:
        screenShakal(query);
        break;
      case CONST.poker_1:
        screenPoker(query);
        break;
      case CONST.mono_1:
        screenMono(query);
        break;
      case CONST.svin_1:
        screenSvin(query);
        break;
      case CONST.manch_1:
        screenManch(query);
        break;
      case CONST.shah_1:
        screenShah(query);
        break;
      case CONST.nardi_1:
        screenNardi(query);
        break;
      case CONST.oplata_1:
        screenOplata(query);
        break;
  }

  if ( query.game_short_name ) {

      switch( query.game_short_name ) {

          case gameName:
              bot.answerCallbackQuery( query.id, undefined, false, { url: "https://koverko-developer.github.io/game.html"} );

              console.log('callback');
              return;
      }
      bot.answerCallbackQuery( query.id, "Sorry, '" + query.game_short_name + "' is not available.", true );

  }


});

function regUser(msg){
  var last_name = '';
  if(msg.from.last_name)last_name = msg.from.last_name;

  var first_name = '';
  if(msg.from.first_name)first_name = msg.from.first_name;

  firebase.database().ref('/botshopsusers/' + msg.from.id).set({
    id: msg.from.id,
    balls: 0,
    visitors : 0,
    first_name: first_name,
    last_name: last_name
  });

  screenHello(msg);

}

function screenHello(msg, start = true) {
  //bot.sendGame(msg.chat.id, gameName);
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


function screenMenu(msg){
  console.log(msg);


  bot.sendPhoto(msg.message.chat.id,'https://pp.userapi.com/c830608/v830608772/db0f2/Mq3QcIRWk4Y.jpg',{
    reply_markup: {
      resize_keyboard: true,
			one_time_keyboard: true,
			keyboard : [
        [
          {
            text : CONST.info ,
            callback_data : 'INFO'
          },
          {
            text : CONST.catalog ,
            callback_data : 'CATALOG'
          }
        ],
        [
          {
            text : CONST.request ,
            callback_data : CONST.request_1
          }
        ],
         [
          {
            text : CONST.oplata ,
            callback_data : CONST.oplata_1
          }
        ]
      ]
    }
  });

}

function screenInfo(msg) {

    const text = 'В нашем Клубе большой выбор настольных игр, караоке, кальян, чай, кофе, угощения, проведение дней рождений, корпоративов, вечерние киносеансы. \nУютная атмосфера и приятное общение и креативный персонал не оставят Вас равнодушными. \nПрисоединяйтесь к нашему чату: \n<a href="https://t.me/joinchat/HCdeRUVxqRiO-bftm-mqLw">ВТЕМЕ game</a>.';

    bot.sendMessage(msg.chat.id, text,{
      parse_mode : "HTML",
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
}

function screenGames(msg) {

  bot.sendPhoto(msg.chat.id,'https://pp.userapi.com/c830608/v830608613/d8ff5/8pWvHXc1Ofw.jpg',{
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.mafia ,
            callback_data : CONST.mafia_1
          },
          {
            text : CONST.krokodil ,
            callback_data : CONST.krokodil_1
          }
        ],
        [
          {
            text : CONST.alias ,
            callback_data : CONST.alias_1
          },
          {
            text : CONST.jenga ,
            callback_data : CONST.jenga_1
          }
        ],

        [
          {
            text : CONST.imag ,
            callback_data : CONST.imag_1
          },
          {
            text : CONST.shakal ,
            callback_data : CONST.shakal_1
          }
        ],

        [
          {
            text : CONST.poker ,
            callback_data : CONST.poker_1
          },
          {
            text : CONST.mono ,
            callback_data : CONST.mono_1
          }
        ],

        [
          {
            text : CONST.svin ,
            callback_data : CONST.svin_1
          },
          {
            text : CONST.manch ,
            callback_data : CONST.manch_1
          }
        ],

        [
          {
            text : CONST.shah ,
            callback_data : CONST.shah_1
          },
          {
            text : CONST.nardi ,
            callback_data : CONST.nardi_1
          }
        ],
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          }
        ],

      ]
    }
  });

}

function screenRequest(msg) {
  const text = 'В данном разделе Вы можете оставить заявку на участие в игре, в тот или иной день. Достаточно просто выбрать.\nТакже оставить заявку на проведение корпоративов, дней рождений и иных мероприятий, выбрав вкладку Корпоратив. \nИ оплатить участие.';
  bot.sendMessage(msg.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.pn ,
            callback_data : CONST.pn_1
          },
          {
            text : CONST.sb ,
            callback_data : CONST.sb_1
          },
          {
            text : CONST.vs ,
            callback_data : CONST.vs_1
          }
        ],
        [
          {
            text : CONST.korporativ ,
            callback_data : CONST.korporativ_1
          }
        ],
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          }
        ]
      ]

   }

  });
}
function screenPN(msg) {

  var url = 'https://clubvteme.by/payment/?id='+msg.message.from.id+'&day=pn';

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1A3Ab-mYRI2yebyUq0YunQoIUQ8xqnLxg');
    const text = 'Устав от рабочей недели, Вас ждёт позитив, хорошее настроение, масса положительных эмоций. Хотите сегодня участвовать в играх? Произведите оплату, перейдя по ссылке на наш официальный сайт <a href="'+url+'">VTEMEGAME</a>.\nПосле получени оплаты с Вами свяжется администрация. \nВозникли вопросы?\nЗвоните +375297402740';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : CONST.back_to_request_1
          }
        ]
      ]
    }
  });

}

function screenOplata(msg) {

  var url = 'https://clubvteme.by/payment/?id='+msg.from.id+'&day=123';

  
    const text = 'Добро пожаловать в клуб. Оплатите вход.\n<a href="'+url+'">ОПЛАТИТЬ</a>.';

  bot.sendMessage(msg.chat.id, text,{
    parse_mode : "HTML",
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

}
function screenSB(msg) {

  var url = 'https://clubvteme.by/payment/?id='+msg.message.from.id+'&day=sb';

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=14UESwVopaRjkEM3IIB4xmHYZ4-vWN_qQ');
    const text = 'Устав от рабочей недели, Вас ждёт позитив, хорошее настроение, масса положительных эмоций. Хотите сегодня участвовать в играх? Произведите оплату, перейдя по ссылке на наш официальный сайт <a href="'+url+'">VTEMEGAME</a>.\nПосле получени оплаты с Вами свяжется администрация. \nВозникли вопросы?\nЗвоните +375297402740';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : CONST.back_to_request_1
          }
        ]
      ]
    }
  });

}
function screenVS(msg) {
  var url = 'https://clubvteme.by/payment/?id='+msg.message.from.id+'&day=vs';

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1hjaAWO1Vm-trR_1-SDtEjtOyuukRFTf8');
    const text = 'Устав от рабочей недели, Вас ждёт позитив, хорошее настроение, масса положительных эмоций. Хотите сегодня участвовать в играх? Произведите оплату, перейдя по ссылке на наш официальный сайт <a href="'+url+'">VTEMEGAME</a>.\nПосле получени оплаты с Вами свяжется администрация. \nВозникли вопросы?\nЗвоните +375297402740';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : CONST.back_to_request_1
          }
        ]
      ]
    }
  });

}
function screenKP(msg) {

  var url = 'https://clubvteme.by/payment/?id='+msg.message.from.id+'&day=kp';

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1Hx8Buv5HvLJGeJmWD75Vdx1zkRSjl0n2');
    const text = 'Вы хотите оставить заявку на проведение корпоратива, дня рождения, девичника, мальчишника или иное мероприятие. Произведите оплату, стоимость - 10 BYN/человек, перейдя по ссылке на наш официальный сайт <a href="'+url+'">VTEMEGAME</a>.\nПосле получени оплаты с Вами свяжется администрация.\nВозникли вопросы? \nЗвоните +375297402740';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : CONST.back_to_request_1
          }
        ]
      ]
    }
  });

}
function screenMafia(msg){

  bot.sendPhoto(msg.message.chat.id,'https://sun9-9.userapi.com/c840531/v840531044/6b743/2vuh08ICLrE.jpg');
    const text = '<b>Мафия</b>\n\n'+
    'Это психологическая командная игра с криминально-детективным сюжетом, разработанная в далёком 1986 году студентом факультета психологии МГУ и очень быстро ставшая популярной во всём мире. Кроме непосредственно острой развлекательной роли, игру часто используют в образовательных целях, развивая тем самым память, аналитическое мышление, актёрское мастерство; психологические, социальные и математические навыки, а также в качестве серьёзного тренинга при подготовке специалистов различного профиля. \n\n'+'Почему она так популярна?\n\n'+
    'Игра обладает непередаваемой атмосферой, благодаря своему чрезвычайно острому сюжету, сеттингу и геймплею. Пожалуй, ни в одной другой настольной игре Вы не почувствуете то, что даёт Мафия! По сюжету, мирные жители города решают полностью избавиться от присутствия всей мафии, на что члены мафии отвечают чисто по-гангстерски – они решают избавиться от всех мирных жителей. Так как силы численно не равны, мафия должна скрывать свою сущность и сделать всё для того, чтобы жители уничтожили сами себя, а по ночам уничтожать свои самых опасных оппонентов.\n\n'+'Как играть?\n\n'+
    'Игра делится на несколько фаз: сначала игроки выбирают ведущего, взакрытую случайным образом делятся на команды мирных жителей и мафии (включая специальные роли) с помощью карт, а затем наступает "ночь". В фазу ночи все игроки закрывают глаза, то есть засыпают, но мафия не дремлет и выходит на охоту! В первую ночь мафия молча знакомится друг с другом, в последующие могут убить одного из мирных; помимо этого есть ещё множество ролей, которые также ночью просыпаются и участвуют в жизни ночного города. Наступает следующая фаза – "день", в которой вскрывает личность убитого ночью, затем все игроки совещаются, обмениваются мнениями о том, кто, скорее всего, является членом мафии и общим голосованием решает, кого казнить.';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenKrokodil(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1UzG30CYRdw3egeKeLPb4nWmzfwORPrx5');
    const text = '<b>Крокодил</b>\n\n'+
    '«Крокодил» на протяжении длительного времени была игрой только в компаниях — на природе, на праздниках. В последнее время люди стали чаще собираться специально, чтобы поиграть в нее (дома вечером, в специальных клубах). '+
    'С развитием интернета игра «Крокодил» онлайн уже не звучит как что-то сверхъестественное. Постепенно появляется игра «Крокодил» онлайн и ее вариации. Но игра в реальном времени остается более популярной и более занимательной. Интернет-технологии пришли на помощь в игра «Крокодил».'+
    +'Правила необходимо принять со стороны организатора.\n\n'+
    'Игра «Крокодил» и правила ее немного различаются, поэтому необходимо прочитать текущие правила и принять их на вооружение, чтобы не было споров, во время игры.\n\n'+
    '1. Игрок показывает слово, используя только мимику, жесты, движения.\n\n'+
    '2. Запрещается произносить слова (любые, даже «да», «нет» и т. п.) и звуки, особенно те, по которым легко угадать слово (например: по «му» можно легко догадаться, что загадана корова).\n\n'+
    '3. Запрещается губами проговаривать слова.\n\n'+
    '4. Желательно (на усмотрения игроков) не указывать на окружающие вас предметы, оказывающие на загаданное слово.\n\n'+
    '5. Для показа слова или группы слов (в зависимости от конкурса) отведено определенное время. Если правильный ответ не прозвучал до окончания этого срока, то слово считается не угаданным.\n\n'+
    '6. Внимание! Слово считается разгаданным, когда команда произнесла это слово именно так, как оно было загадано (именно с теми же приставками, суффиксами и т. п.)\n\n'+
    '7. Запрещается показывать загаданное слово по буквам, т. е. показывать слова первые буквы, которых будут складывать загаданное слово!\n\n'+
    '8. В зависимости от конкурса и ваших успехов в игре у вас будет формироваться счет. В конце игры побеждает та команда, на счету которой больше всего баллов.'+
    '';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenAlias(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1j4QyUkkQL2EU-7CJtgL107bwlHz5PV1-');
    const text = '<b>Alias</b>\n\n'+
    'Алиас для вечеринок (Party Alias) – это версия полюбившейся всем настольной игры Алиас. Цель игры осталась прежней, а вот сама игра... теперь вам потребуется умение не только объяснять слова, но и сочинять истории, изображать эмоции.\n\n'+
    'Как и в классическом Алиасе, нужно постараться, чтобы ваши товарищи угадали слово, которое выпало вам. Но, главное, не называть это слово! Объяснили слово – отлично. Карту на стол и следующую в руку. Время не терпит!\n\n'+
    'В Алиасе для вечеринок все игральные карточки разделены на 3 категории: «Слова», «Карты настроения/Смайлики », «Позы». Каждый из видов карточек (кроме «Слов») обозначен на игровом поле особой зоной (поле «Вечеринка»), попадая на которую игрок обязан взять карту из соответствующей колоды. В случае успешного выполнения задания команда может раскрутить бонусный волчок и сделать дополнительные ходы!\n\n'+
    'Предположим, фишка команды оказалась на цветном поле:\n\n'+
    'Синее – Позы, пора посмеяться! Игрок должен, удерживая указанное в карточке «Поз» состояние (стоя, сидя, прыгая на одной ноге...), объяснять слова из списка «Слов», пока не кончится время. Если это удалось – крутите волчок!\n\n'+
    'Жёлтое – Настроение. Весь свой ход вы будете объяснять слова с заданным настроением (смущение, злость, грусть, …).\n\n'+
    'Белое. Вы – писатель? Вам придётся им стать! Расскажите своим партнёрам «безумную» историю, используя слова из карточки (называя их). Соблюдайте порядок слов. Если история будет смешной и понравится – крутите заветную стрелку!\n\n'+
    '«Скажи иначе. Вечеринка» рассчитана на большую и весёлую компанию. Минимальное количество игроков – 4 , по 2 в каждой команде, а максимальное – не ограничено ничем, в игре могут участвовать 6 (!) команд.\n\n'+
    'Настольная игра Алиас для вечеринок (Party Alias) имеет более яркое, красочное оформление по сравнению с классической версией, что придаст вашей вечеринке особое праздничное настроение! Настольная игра Алиас для вечеринок (Party Alias) существует в двух вариантах: Party Alias (стандартный) и Party Alias (компактный).';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenJenga(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1SELCA-Y7fhkCVWTIJQAPaktYoTNP6p5N');
    const text = '<b>Jenga</b>\n\n'+
    'Дженга – игра на ловкость рук, смекалку и чувство равновесия. Постройте башню из деревянных брусков, вынимая бруски с нижних «этажей» и один из игроков, стараясь достать «не тот» брусок из середины башни, с грохотом обрушит всё сооружение!\n\n'+
    'В настольной игре Дженга (Jenga) вам предстоит выстраивать башню из деревянных брусков, вынимая бруски с нижних «этажей» и докладывая их наверх. Всё начинается с 18-ти уровневой башни, но за время игры башня может подрасти раза в два ;) Всё зависит от вашей аккуратности.'+
    'Но рано или поздно, башня станет слишком неустойчивой и один из игроков, стараясь достать «не тот» брусок из середины башни, с грохотом обрушит всё сооружение! Этот неосторожный игрок проиграл, зато остальные выиграли – можно начать строительство башни заново :)\n\n'+
    'Компоненты настольной игры Jenga – деревянные, гладкие и легкие бруски из натурального дерева, прямоугольной формы, приятные на ощупь. Оформление качественное, бруски прочные, так что Дженга выдержит много веселых партий.\n\n'+
    'Вариации с правилами. Игра Дженга – игра увлекательная и «долгоиграющая», но если вам вдруг захочется разнообразия, то можно немного изменить правила...\n\n'+
    '1. Напишите на брусках задания («Спой песню», «Изобрази крокодила» и т.д.) и преобразуйте игру в некоторое подобие «Фантов». Перемещаете брусок – выполняете задание. Игра станет ещё веселее ;)\n\n'+
    '2. Напишите на боковых гранях номера, возьмите игральные кубики и перемещайте только тот брусок, чей номер выпал на кубиках. Игра Дженга станет ещё напряжённее!\n\n'+
    'В общем, простор для фантазии большой – дерзайте!';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenImag(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1ueGKhownKuTdcXJJZLty2i3bf7cw0aGL');
    const text = '<b>Имаждинариум</b>\n\n'+
    'Это настольная игра в ассоциации. Она оформлена российскими художниками и иллюстраторами и пользуется популярностью на отечественном рынке.\n\n'+
    '<b>Чуть больше об игре</b>\n\n'+
    'Игра настолько же проста, насколько безумна. В распоряжение каждому будет выдан цветной слоник с крыльями, который будет плавно перелетать с одного облака на другое. Кто сумеет пролететь дальше к концу игры, тот и будет признан победителем.\n\n'+
    'Кроме слонов, всем игрокам будет выдано по 6 карточек с… как бы помягче сказать… непонятно с чем. Что именно изображено на картинках вам, скорее всего, не ответят даже иллюстраторы, создавшие их. Робот-водолаз с парашютом за спиной. Дед Мазай, зайцы и морковь, с поправкой на то, что ДедМазай – тоже заяц. Палец Тома Уэйтса, играющий на дымящейся флейте. Это как раз тот случай, когда от неудержимости фантазии авторов игра становилась лишь лучше.\n\n'+
    'Каждый из игроков по очереди становится ведущим. В свой ход ведущий выбирает из своей руки наиболее понравившуюся карточку, кладёт её на стол рубашкой вверх и загадывает ассоциацию. Все остальные игроки пытаются найти среди своих карточек ту, которая будет максимально подходить под загаданное ведущим.\n\n'+
    'После этого ведущий перемешивает все полученные карточки, и раскладывает их на столе лицевой стороной вверх. Игроки берут жетоны с цифрами и начинают голосовать. Задача каждого – понять, какую именно карточку положил ведущий.\n\n'+
    'Секрет в том, что ведущему нужно дать такую ассоциацию, чтобы она была очевидной, но не слишком. Очки он получит только в том случае, если его карточку угадают, но не все. Если никто не угадает, его крылатый слоник отправится на 2 облачка назад. Если угадают все – на 3 облачка назад. Если же угадает, например, 2 или 3 человека из 4, слоник ведущего гарантировано отправится вперед.\n\n'+
    'Уже после первой партии вы будете сидеть в недоумении от происходящего в головах ваших друзей. Впрочем, игра от этого будет только веселее.';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenShakal(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1dlChC4D7vdJWwG6QPyGjY-vrvrvMa8ze');
    const text = '<b>Шакал</b>\n\n'+
    'Легендарная пиратская игра, одна из самых известных. Создана в МГУ в 70-х, наполнена духом пиратской романтики, отлично подходит для семейной игры и дружеских партий, прекрасно развивает логику и системное мышление. Если вы любите искать клады, сражаться с пиратами, знакомиться с крокодилами, заглядывать в пушку и таскать золото на корабль, то, тысяча чертей, эта настольная игра для вас.\n\n'+
    '<b>Как играть?</b>\n\n'+
    'Добро пожаловать на почти необитаемый остров, на котором старый пират Шакал закопал свои сокровища. Вам предстоит провести разведку, а затем найти и унести на свой корабль все до последней золотые монеты — или же вас опередят другие флибустьерские команды.\n\n'+
    'К острову подплывают корабли, из которых высаживаются «конкурирующие» команды. Вы управляете тремя пиратами, которые могут передвигаться по острову, разведывать его («переворачивая» закрытые плитки), носить сокровища, воевать с другими пиратами или же выполнять специальные действия: например, знакомиться с туземкой, отсиживаться в форте или летать на воздушном шаре. Побеждает тот, кто сможет не только найти сокровища, но и перетащить их на свой корабль: одна из самых интересных стратегий'+ 'заключается именно в перехвате тех, кто таскает золото (или прибытию к кучемонет тогда, когда она слабо охраняется).\n\n'+
    'Игровое поле состоит из квадратных фишек, выкладываемых случайным образом рубашкой вверх. Это значит, что вы каждый раз изучаете остров заново и можете практически бесконечно наслаждаться игрой.\n\n'+
    'Боевые правила таковы, что влияние случайности минимально: исход боя зависит только от ваших тактических способностей.';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenPoker(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1z_CU_b72k6sHCazA_RrlOo8EX2l6ydtQ');

  const text = '<b>Покер</b>\n\n' + 'Не смотря на то, что покер - самая азартная игра в карты и присутствует в любом казино, она вынесена в раздел спортивных карточных игр. Этому есть причины: покер - общепризнанная игра, по которой проводятся международные турниры, существует масса ассоциаций и клубов покера, в том числе и международных.\n\n'+
   'Игра в покер требует определенных стратегических способностей, точного математического расчета и наблюдательности и изучения соперников. Несмотря на то, что в покер играют чаще всего на деньги, эта сам процесс игры доставляет массу удовольствия, как играющим, так и зрителям.\n\n'+
   'Кроме всего прочего, Покер отличается от «традиционных» азартных игр двумя моментами. Первое важное отличие заключается в том, что в отличии от «лотто», рулетки, «Black Jack» и любой другой азартной игры, в покер друг против друга играют игроки с одинаковыми шансами на выигрыш.\n\n'+
   'Во-вторых, при игре в покер, в отличие от большинства азартных игр, вы можете делать ставку (вкладывать деньги), когда вы считаете это оправданным или стоящим того.\n\n'+
   'Не смотря на простоту правил покера, эта карточная игра изобилует богатством технических вариантов раскладов карт, а возможность психологического воздействия на партнеров своим поведением и возможность блефовать - добавляют покеру зрелищность и определенный шарм, которых нет в других карточных играх.\n\n'+
   'Процесс игры в покер таков:\n\n'+
  - 'Игроки делают взнос в центральный «банк», который содержит игровые фишки, представляющие фактические деньги.\n\n'+ 
  '- Игрокам раздаются карты («рука»), некоторые или все из них cдаются вслепую. \n\n'+
  '- Ставки в кругу торговли делаются в зависимости от достоинства карт. \n\n'+
  '- После завершения круга торговли выигрывает игрок с самой сильной рукой или последний оставшийся игрок после того, как все остальные участники сбросили карты.\n\n'+
  'Чтобы понимать, как играть в покер, нужно запомнить старшинство данных покерных комбинаций:\n\n'+
  '«Роял Стрит Флеш» – 5 самых старших одномастных карт.\n\n'+
  '«Стрит Флеш» – 5 карт одной масти по порядку.\n\n'+
  '«Каре» – 4 карты одного ранга.\n\n'+
  '«Фулл Хаус» – комбинация, включающая в себя «Пару» и «Тройку» одновременно.\n\n'+
  '«Флеш» – 5 одномастных карт.\n\n'+
  '«Стрит» – 5 собранных по порядку карт любой масти.\n\n'+
  '«Сет» или «Тройка» – 3 карты одного ранга.\n\n'+
  '«Две пары» – 4 карты, среди которых собраны по 2 одинаковых по рангу.\n\n'+
  '«Пара» – это 2 одинаковые карты.\n\n'+
  'Самая младшая комбинация «Старшая карта» – это 1 карта. Чем она выше по рангу, тем вероятнее ее победа.\n\n';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenMono(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1wl4UlsAEo0giUQG8L7AT1On-MwqucTSQ');
    const text = '<b>Монополия</b>\n\n'+
    'Невозможно представить нашу жизнь без праздников! Мы всегда ждём их и предвкушаем, обдумываем, как проведём этот приятный выходной день, тщательно выбираем место отдыха и компанию, ведь именно они создают и поддерживают комфорт, уют и позитив. Настольная игра &quot;Бизнес. Игра на деньги; — это отличный выбор, который привнесёт атмосферу выходного дня, позитива и азарта!';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenSvin(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1kWpFgc5-br9OTDX4aCCUTdD_vHCJZ2mG');
    const text = '<b>Свинтус</b>\n\n'+
    'Подложи свинью товарищу! Именно этим девизом будут руководствоваться участники отечественной настольной игры Свинтус, стараясь первыми избавиться от всех карт в руке. Очевидно, что Свинтус напоминает всемирно известную карточную игру Уно, но обладает специфическим юмором, который, видимо, должен разряжать напряжение, царящее в каждом офисе (игра адресована офисным работникам, изнывающим под грузом корпоративной ответственности). Так что, если вы хотите сообщить коллегам, что они - шайка неудачников, сопроводив это презрительным взглядом, - Свинтус вам в помощь.\n\n'+
    'Копыта на изготовку. В процессе игры вы выкладываете в сброс карты с тем же цветом (синий, оранжевый, красный, зелёный) или с тем же значением (от 0 до 7), что и верхняя лежащая там карта. А также вы можете использовать Особые Свинячьи Карты, чтобы заставить других игроков взять 3 карты и пропустить ход («Хапёж»), изменить направление хода («Перехрюк»), поменять текущий цвет игры на другой («Полисвин»)... А если кто-то выложил карту «Хлопкопыт» все должны тут же положить копыто ладонь на колоду (последний берёт 2 карты).Основное правило, давшее название игре, требует, чтобы игрок, перед тем как выложить предпоследнюю карту, произнёс: «Свинтус!» Если он забудет об этом, его могут поймать с одной картой в руке и оштрафовать.';
  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenManch(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1GTraVeTdHn8zm3jagHysayNWXOUGAfq5');
    const text = '<b>Манчкин</b>\n\n'+
    'Игра Манчкин – локализация настольной карточной игры Munchkin. На русском языке игра, как ни старайся, приобретает новое звучание, но остаётся по- прежнему азартной, динамичной и злорадной. Ролевое зубоскальство по простым, но местами намеренно туманным правилам подвергает насмешкам благородных эльфов, мудрых магов, отважных воинов и мохноногих хафлингов.\n\n'+
    'Клирики бьются с андедами, воры подрезают своих соперников в разгар боя, гигантские Кальмадзиллы и мерзкие Лицесосы стремятся отравить или отнять геройские жизни ваших манчкинов, но так, на расслабоне, без долгих речей и многочисленных бросков разногранных костей, принятых в D&amp;D, GURPS и прочих равенлофтах.\n\n'+
    'Итак, настольная игра &quot;Манчкин&quot; - это ролевая игра по форме, пародия по содержанию. Манчкины игроков ходят по подземелью, вытаскивают на свет божий тамошних чудовищных обитателей и либо раскаиваются в этом, либо получают за победу новые уровни и сокровища.\n\n'+
    'Исход каждого подобного приключения (боя, короче) зависит от того, кто с чем на бой вышел. У игрока это уровень и бонусы/штрафы от шмоток, класса, расы и проклятий. У монстра это уровень плюс карты-усилители и разовые шмотки. Откуда шмотки у монстра? В вашем бою могут принять участие и завистливые соперники: они могут помогать монстру и ослаблять Вас.\n\n'+
    'Поэтому, хотя в &quot;Манчкин&quot; и можно играть вдвоём, наберите на матч побольше народу: на руках будет больше проклятий, усилителей и зелий, которыми так легко изменить баланс сил в бою в любую сторону, и бдительные завистники не дадут никому из Вас выйти в единоличные лидеры гонки к 10му победному уровню.';

  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenShah(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1J279C50Uoq5GI5JEhuTwxNtqhLNbGKkP');
    const text = '<b>Шахматы</b>\n\n'+
    'Название “Шахматы” произошло от персидского языка, в котором слова “шах” “мат” означают “властитель умер”. Шахматная игра проходит на доске, имеющей 64 клеточки – 32 белые и 32 чёрные. Играют в шахматы 32 фигурами – 16 белых и 16 чёрных. Различают следующие фигуры: пешка (8 белых, 8 чёрных), конь (2 белых, 2 чёрных), слон (2 белых, 2 чёрных), ладья (2 белых, 2 чёрных), ферзь - королева (1 белый, 1 чёрный), король (1 белый, 1 чёрный). За стол садятся два спортсмена – один играет за “белых”,  другой – за “чёрных”. Тот, кто играет за “белых”, ходит первым. Основная задача каждого игрока – поставить мат королю противника. Сделать это можно с помощью ходов шахматных фигур.'+
    '';
  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
function screenNardi(msg){

  bot.sendPhoto(msg.message.chat.id,'https://drive.google.com/open?id=1FIVfBUyjsFgs1iyvOxwAldqDam_OY6CV');
    const text = '<b>Нарды</b>\n\n'+
    'Это персидская игра, известная также в Европе под названием «триктрак». Эта игра очень популярна на Востоке, где она имеет очень глубокое культурное и символическое значение. Игровой процесс представляет собой передвижение шашек по доске в соответствии с набором правил. Доска для игры в нарды — это, как правило, богато украшенный элемент игрового набора, разделённый на 24 пункта (вытянутых треугольников, служащих для разметки игрового поля).'+
    '<b>Нарды</b>\n\n'+
    'Правил игры в нарды существует огромное множество. По большей части это вариации классической игры, отличающиеся стартовыми условиями, некоторыми аспектами правил и другими нюансами. Наиболее часто играютв длинные и короткие нарды. Суть любой игры состоит в том, чтобы используя свой интеллект и предвидение ходов оппонента, максимально использовать ситуацию на доске. Игровые условия во многом определяются удачностью бросков кубика — но даже при неудачных раскладах есть вариант выиграть, если не допускать ошибок самому и пользоваться слабостями оппонента.';
  bot.sendMessage(msg.message.chat.id, text,{
    parse_mode : "HTML",
    reply_markup: {
      inline_keyboard : [
        [
          {
            text : CONST.menu ,
            callback_data : 'MENU'
          },
          {
            text : CONST.back_to_request ,
            callback_data : 'CATALOG'
          }
        ]
      ]
    }
  });

}
