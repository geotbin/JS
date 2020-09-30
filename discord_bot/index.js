const discord = require('discord.js');
const bot = new discord.Client();

const Help = require('./commands/help');
const Reply = require('./commands/reply');
const Play = require('./commands/play');
const Send = require('./commands/send');

// Bot connected dans ready
bot.on('ready', function(){
	// change discord activity
    bot.user.setActivity('NodeJS Bot', { type: "WATCHING", }).catch(console.error)

})

bot.on('message', function(message){
	// test if message starts with $[command]
    let commandUsed = Play.parse(message) || Help.parse(message) || Reply.parse(message) || Send.parse(message)
})

// Discord Bot App Token (README.md)
bot.login('TOKEN_HERE');
