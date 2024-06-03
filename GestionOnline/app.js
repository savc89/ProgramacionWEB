const express = require('express');   //Bibliotecas
const cookieParser = require('cookie-parser');     // Importar cookie-parser
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path'); 
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server);







                                    
app.set('view engine','ejs');    
//app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));




app.get('/cliente', (req, res) => {
    res.render('cliente');                  // Renderiza el archivo cliente.ejs
});





//app.get('/', (req, res)=> {


//    res.sendFile(`${__dirname}/public/cliente.html`)   

//})






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());                        // Usar cookie-parser


app.use('/', require('./router'));
    



// Configurar socket.io

io.on('connection', (socket) => {
    console.log('Un usuario conectado');
    
    // Enviar un mensaje al cliente
    socket.emit('message', '¡Bienvenido al sistema de productos online!');

    // Escuchar mensajes del cliente
    socket.on('clientMessage', (msg) => {
    console.log('Message from client:', msg);
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
    console.log('Un usuario desconectado');
    });
});





server.listen(5501, () => {
    console.log('Servidor corriendo en http://localhost:5501');
});












