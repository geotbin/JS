const Command = require('./command')

module.exports = class Send extends Command{

    static match(message){
        return(message.content.startsWith('$send'));
    }

    static action(message){
    	// get tab of words
        let args = message.content.split(' ');
        // delete $reply from tab
        args.shift()
        // delete emitter message from channel
        message.delete()

        // get member by id
        let member = message.guild.members.filter(function(member){
            return (member.id === args[0])
        }).first();

        args.shift()
        // create private message with member
        member.createDM()
        .then(function(channel){ 
            return channel.send(args.join(' '))})
        .catch(console.error)
    }
}