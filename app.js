const express = require('express');
const sequelize = require('./loaders/db');
const userRouter = require('./routes/user.route');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8100', 
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRouter)

app.use((req, res, next) => {
  // Ajoute l'heure du serveur à l'en-tête de la réponse
  res.setHeader('X-Server-Time', new Date().toISOString());
  next();
});
// Synchroniser les modèles avec la base de données
sequelize.sync().then(() => {
    console.log('Models synchronized with the database.');
  }).catch((error) => {
    console.error('Failed to synchronize models with the database:', error);
  });

app.listen(3000, '0.0.0.0', ()=> {
    console.log('Server runing on port 3000')
})