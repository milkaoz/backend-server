// requires
const config = require('./config/database');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//inicializar variable
var app = express();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var stringDb = 'mongodb://' + config.database.mongoHost + ':' + config.database.mongoPort + '/hospitalDB';
console.log('String mongo : ' + stringDb);

//
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//conexion base de datos
mongoose.connection.openUri('mongodb://' + config.database.mongoHost + ':' + config.database.mongoPort + '/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'On line');
});

//rutas
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/', appRoutes);



//escuchar peticiones
app.listen(3002, () => {
    var fecha = new Date();
    console.log('Fecha: ' + fecha + ': Express server puerto 3000 \x1b[32m%s\x1b[0m', 'On line');
});