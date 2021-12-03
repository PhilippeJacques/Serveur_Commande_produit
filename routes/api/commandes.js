const Commande= require('../../models/Commande');


const commandeController = {
  all(req, res) {
    // Retourne tous les commandes
    Commande.find({}).populate("articles").exec((err, commandes) => res.json(commandes));
  },
  pardate(req,res) {
      Commande.find({date: req.params.date}).populate("articles").exec((err, commandes) =>res.json(commandes))
  },
  parprix(req,res) {
    Commande.find({prixminimum: req.params.prixminimum}).populate("articles").exec((err, commandes) =>res.json(commandes))
},
parjour(req,res) {
  Commande.aggregate(
    [
      {
       
        $group: {
          _id: {
            annéeMoisJour: { $dateToString: { format: "%Y-%m-%d", date: "$date"} },
              Tous_articles: { articles : 1 },
              Jour: { $dayOfMonth: "$date" },
              prixmini: {prixminimum: 1}
          },
          Tous_commandes: { $sum: 1 }
      }
    }
    ]
 ).exec((err, commandes) =>res.json(commandes))
},
pararticles(req,res) {
  Commande.find({articles: req.params.articles}).populate("articles").exec((err, commandes) =>res.json(commandes))
},
 
  create(req, res) {
    var requestBody = req.body;
    // var newproduit = new Produit({
    //   nom: requestBody.nom,
    //    prix: requestBody.prix,
    //     catégorie: requestBody.catégorie,
    //      description: requestBody.description,
    //       quantité: requestBody.quantité
      
    // });
    // newproduit.save();
    // creé un nouveau produit
    var newcommande = new Commande({
      date: req.body.date,
      
      articles: req.body.articles,
      prixminimum: req.body.prixminimum

    });


    newcommande.save((err, saved) => {
      // Retourne la commande sauvegardé
      // aprés une sauvegarde 
      Commande.find({ _id: saved._id })
        .populate("articles")
        .exec((err, commande) => res.json(commande));

    });
  },
  delete(req, res) {
  try {
     Commande.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    )
    
  } catch (err) {
           console.log(err.message);

  }
}
};

module.exports = commandeController;