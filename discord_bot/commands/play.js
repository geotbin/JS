const Command = require('./command')
const Youtube = require('ytdl-core')

module.exports = class Play extends Command{

    static match(message){
        return(message.content.startsWith('$play'));
    }

    static action(message){
    	// get the message's emitter voice channel (if he is connected in)
        let voiceChannel = message.member.voiceChannel;

        // split message to get ['$play', 'url']
        let args = message.content.split(' ')
        // join his channel
        voiceChannel.join().then(function(connection){

            try{
            	// use ytdl-core with url (args[1])
                let stream = Youtube(args[1], { filter: 'audioonly' })

                // start stream (require FFMPEG). disconnected from voice channel when stream is finish
                connection.playStream(stream).on('end', function(){connection.disconnect()});
            }catch(e){
                console.log(e)
                message.reply("Je n'arrive pas à lire cette vidéo")
            }
        }).catch(console.error)
        
    }
}