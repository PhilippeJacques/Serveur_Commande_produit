const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");



 require('dotenv').config();


const app = express();
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());

//connection à mongodb Atlas
mongoose
    .connect(process.env.MONGODB_URI,
    { useUnifiedTopology:true, useNewUrlParser: true, useFindAndModify: false  }
    )
    .then(() => console.log("MongoDB Atlas connecté avec succès"))
    .catch(err => console.log(err));




const commandeController = require('./routes/api/commandes')
const produitController = require('./routes/api/produits')
app.get('/commandes', commandeController.all);
app.get('/retrieveProduit/:id', produitController.one);
app.get('/retrieveProduits', produitController.all);
app.delete('/retrieveProduit/:id', produitController.delete);


app.post('/createProduit', produitController.create);
app.put('/updateProduit/:id', produitController.put);

app.post('/commandeCreate', commandeController.create);
app.get('/commandeParJour', commandeController.parjour);

app.get('/commandeParDate/:date', commandeController.pardate);
app.get('/commandeParPrix/:prixminimum', commandeController.parprix);
app.get('/commandeParArticles/:articles', commandeController.pararticles);


app.delete('/commandeDelete/:id', commandeController.delete);







const port = process.env.PORT ;

app.listen(port,()=>console.log(`Server et à jour sur le port ${port}`));