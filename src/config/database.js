const sqlite3 = require('sqlite3').verbose();

// Conecta a una base de datos llamada 'database.db' (crea la base de datos si no existe)
const db = new sqlite3.Database('./database/pedidos-api.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});
module.exports = db;