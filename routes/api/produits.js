const Commande = require('../../models/Commande');
const Produit= require('../../models/Produit');
const produitController = {
  all (req, res) {
    // Returns all Slots
      Produit.find({})
          .exec((err, produits) => res.json(produits))
  },
  one(req,res) {
    Produit.findById(req.params.id).exec((err, produit) =>res.json(produit))
},
 
  create(req, res) {
    var requestBody = req.body;
    var newproduit = new Produit({
      nom: requestBody.nom,
       prix: requestBody.prix,
        catégorie: requestBody.catégorie,
         description: requestBody.description,
          quantité: requestBody.quantité
      
    });
    newproduit.save((err,produit)=>{
      res.status(200).json({
     produit
      });
    })
   

   
  },
  put(req, res)  {
    try {
          Produit.findOneAndUpdate(req.params.id, {
            nom: req.body.nom,
             prix: req.body.prix,
              catégorie: req.body.catégorie,
              description: req.body.description,
               quantité: req.body.quantité
           
        }).exec((err,produit)=>res.json(produit));
   } catch(err) {
        console.error(err.message);
        res.send(400).send('Erreur du Serveur');
    }},
  delete(req, res) {
  try {
     Produit.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Supprimer!'
        });
      }
    )
    
  } catch (err) {
           console.log(err.message);

  }
}
};
module.exports = produitController;