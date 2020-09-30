const { io } = require('../index');

console.log('init server');

//Mensja de sockets
//Client es el dispositivo conectado al serviodor
io.on('connection', client => {
    console.log('Conectado');

    ///Emitir al cliente las bands
    /// client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { console.log('Desconectado'); });

    client.on('mensaje', (payload) => {
        //console.log('Mensaje emitido', payload);
        //io.emit('mensaje', { nombre: 'Alerta' });
    });

    client.on('vote-band', (payload) => {
        //bands.voteBand(payload.id);
        //io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        //bands.addBand(new Band(payload));
        //io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        ///bands.deleteBand(payload);
        ///io.emit('active-bands', bands.getBands());
    });

    client.on('emitir-mensaje', (payload) => {
        console.log('emit flutter', payload);
        ///io.emit('nuevo-mensaje', payload); ///emitir a todos los clientes
        ///client.broadcast.emit('nuevo-mensaje', payload); /// todos menos el cliente que lo emite
    });

});