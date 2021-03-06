var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

//inicializar variable
var app = express();

var Usuario = require('../models/usuario');

app.post('/',(req, res)=>{

    var body = req.body;

    Usuario.findOne({ email: body.email}, (err, usuarioBD)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            }); 
        }

        if(!usuarioBD){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            }); 
        }

        if( !bcrypt.compareSync( body.password, usuarioBD.password ) ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            }); 
        }

        //crear un token
        usuarioBD.password= ':)';
        var token = jwt.sign({usuario: usuarioBD}, SEED, {expiresIn: 3600}) // 1 hora

        res.status(201).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            id : usuarioBD.id
        });

    })


});


module.exports = app;