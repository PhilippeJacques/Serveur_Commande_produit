const {Schema, model} = require('mongoose')


  const produitSchema = new Schema ({
    nom: {type: String, required: true},
    prix: {type: Number, required: true},
    catégorie: {type: String, required: true},
    description: {type: String},
    quantité: {type: Number, required: true}
  }, { timestamps: {} });
module.exports= model('Produit', produitSchema);

//nom, prix, catégories, description, quantité