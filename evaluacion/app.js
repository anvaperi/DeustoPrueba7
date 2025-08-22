import express from 'express';
import mongoose from 'mongoose';
import devices from './routes/devices.js';

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/Catalog';

app.use(express.json());
app.use('/devices', devices);
app.use((req, res) => {
  res.status(404).json({ message: 'Incorrect route or params' });
});

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // exit if DB connection fails
  });