const {Schema, model} = require('mongoose')


  
  const commandeSchema = new Schema({
  
  date: {type: Date, default: Date.now()},
  
  
  articles: [{type: Schema.Types.ObjectId, ref: 'Produit',required: true}],
  prixminimum: {type: Number, required: true}
  
}, { timestamps: {} });
module.exports= model('Commande', commandeSchema);