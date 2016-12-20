const Botkit = require('botkit');
const request = require('superagent');

if(!process.env.token) {
    console.log('Error: Specify a token in an enviroment varible');
    process.exit(1);
}

const controller = Botkit.slackbot();

controller.spawn({
    token: process.env.token
}).startRTM();

// controller.on('channel_joined', (bot, message) =>
//     // console.log(`${bot.identity.name} was invited to channel ${message.channel.name}`),
//     bot.say({
//         text: `Meat Spin has joined the ${message.channel.name} channel - now you\'re doomed!`,
//         channel: message.channel.id
//     })
// );

controller.hears('Spin that Meat', ['ambient'], (bot, message) => {
    request
        .get('https://api.chucknorris.io/jokes/random')
        .end((err, res) => {
            if(!err) {
                let msg = JSON.parse(res.text);
                console.log(msg.value);
                bot.reply(message, msg.value);
            }
        })
});

controller.hears('meatspin', ['ambient'], (bot, message) => {
    bot.reply(message, 'I would spin Dennis\' meat!');
});

// controller.on(['direct_message', 'direct_mention', 'mention', 'ambient', 'message_changed'], (bot, message) =>
//     console.log(message)
// );

