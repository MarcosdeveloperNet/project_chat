//Importar as configs do server
var app = require('./config/server');

//parametrizar a porta de escuta
app.listen(3000, function(){
    console.log('Servidor On');
});