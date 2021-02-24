//Importar as configs do server
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(3000, function(){
    console.log('Servidor On');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){

    console.log('Um usuário conectou');

    socket.on('disconnect', function(){

        console.log('Um usuário saiu do chat');
    })

    socket.on('msgServidor', function(data){
        socket.emit(
            'msgParaCliente',
            {apelido : data.apelido, mensagem : data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido : data.apelido, mensagem : data.mensagem}
        );

        if(parseInt(data.apelidos_logados) == 0) {
            socket.emit(
                'participantesParaCliente',
                {apelido : data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido : data.apelido}
            );
        };
    });

    
});