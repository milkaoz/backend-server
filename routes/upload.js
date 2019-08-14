var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');

//inicializar variable
var app = express();
var usuarios = require('../models/usuario');
var medicos = require('../models/medico');
var hospitales = require('../models/hospital');



// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.param.id;

    // tipos de colecciones
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: { message: 'Tipo de coleccion no es valida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    //Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        res.status(200).json({
            ok: false,
            mensaje: 'Extension no valida',
            extensionArchivo: { message: 'Las extensiones validas son' + extensionesValidas.join(', ') }
        });
    }

    // nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extensionArchivo}`;

    // Mover el archivo del temporal al un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;


    archivo.mv(path, err => {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, path, res);

        // res.status(200).json({
        //     ok: true,
        //     mensaje: 'Archivo movido',
        //     extensionArchivo: extensionArchivo
        // });

    });


});

function subirPorTipo(tipo, id, path, res) {
    if (tipo == 'usuarios') {
        usuarios.findById(id, (err, usuario) => {
            var pathViejo = '../uploads/usuarios/' + usuario.img;

            // si existe, elimina la imagen anterior.
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }
        });
    }

    if (tipo == 'medicos') {
        medicos.findById(id, (err, medico) => {

        });
    }

    if (tipo == 'hospitales') {
        hospitales.findById(id, (err, hospital) => {

        });
    }
}

module.exports = app;