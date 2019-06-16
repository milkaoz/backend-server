var express = require('express');

//inicializar variable
var app = express();


app.get('/',(req, res, next )=> {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

module.exports = app;