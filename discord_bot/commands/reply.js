const Command = require('./command')

module.exports = class Reply extends Command{

    static match(message){
        return(message.content.startsWith('$reply'));
    }

    static action(message){
    	// get tab of words
        let args = message.content.split(' ');
        // delete $reply from tab
        args.shift()
        // delete emitter message from channel
        message.delete()
        // send in channel emitter message without $reply
        message.channel.send('Your message is: ' + args.join(' '))
    }
}