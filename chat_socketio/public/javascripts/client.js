
var socket = io({transports: ['websocket'], upgrade: false});
var userid = false;

$('#loginForm').submit(function(event){
    event.preventDefault();
    var data = {
        username : $('#username').val(),
    }
    socket.emit('login', data);
    document.getElementById("overlay").style.display = 'none';
});


socket.on('all_users', function(data){
    $('#users').empty();
    Object.keys(data).map(function(objectKey, index) {
        var member = data[objectKey]; // member.username, member.userid, member.avatar
        $('#users').append(
            '<div class="chat_list" id="'+ member.userid + '"><div class="chat_people"><div class="chat_img"> <img src="' + member.avatar + '" alt="user_logo"> </div><div class="chat_ib"><h5>' + member.username + '</h5></div></div></div>'
        )
    });
});

socket.on('disconnect_user', function(userid){
    document.getElementById(userid).remove();
});

socket.on('new_message', function(data){
    if(data.author.userid == userid){
        $('#messages').append(
            '<div class="outgoing_msg"><div class="sent_msg"><p>' + data.message + '</p><span class="time_date">' + data.date + '</span></div></div>'
        ) 
    } else {
        $('#messages').append(
            '<div class="incoming_msg mb-3"><div class="incoming_msg_img"> <img src="' + data.author.avatar + '" alt="logo"> </div><div class="received_msg"><div class="received_withd_msg"><p>'+ (data.message).replace(/</g, '') +'</p><span class="time_date">'+ data.date +'</span></div></div></div>'
        )
    }
})


socket.on('history_messages', function(messages){
    Object.keys(messages).map(function(objectKey, index) {
        var data = messages[objectKey]; // messages
        if(data.author.userid == userid){
            $('#messages').append(
                '<div class="outgoing_msg"><div class="sent_msg"><p>' + (data.message).replace(/</g, '') + '</p><span class="time_date">' + data.date + '</span></div></div>'
            ) 
        } else {
            $('#messages').append(
                '<div class="incoming_msg mb-3"><div class="incoming_msg_img"> <img src="' + data.author.avatar + '" alt="logo"> </div><div class="received_msg"><div class="received_withd_msg"><p>'+ (data.message).replace(/</g, '') +'</p><span class="time_date">'+ data.date +'</span></div></div></div>'
            )
        }

    });
});


socket.on('logged', function(user){
    userid = user;
})

$('#chatForm').submit(function(event){
    event.preventDefault();
    socket.emit('newmsg', $('#message').val());
    $('#message').val('');
    $('#message').focus();
})