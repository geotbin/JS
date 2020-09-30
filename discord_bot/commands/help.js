const Command = require('./command')

module.exports = class Help extends Command{

    static match(message){
    	// if message content startWith $help, return true
        return(message.content.startsWith('$help'));
    }

    static action(message){
    	// message emitter
        let author = message.author;
        // create private message channel and send message to this channel
        author.createDM()
        .then(function(channel){ 
            message.reply("you've got a new DM!")
            return channel.send('Hello, commands ready to use:\n $reply [message]\n $play [yt_link / words] to play Youtube music \n $help to get bot commands')})
        .catch(console.error)

    }
}