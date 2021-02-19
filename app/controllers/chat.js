const { emit } = require("../../config/server");

module.exports.iniciaChat = function(application, req, res){

    var dadosForm = req.body;

    req.assert('apelido', 'Digite seu nome ou apelido').notEmpty();
    var erros = req.validationErrors();
        if(erros){
            res.render("index", {validacao : erros})
            return;
        }
    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem : ' entrou no chat'}    
    );

    res.render("chat");
}