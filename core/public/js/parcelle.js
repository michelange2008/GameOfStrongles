//################################# CLASSES ET METHODES ##################################
function Parcelle(id, nom, superficie)
{
  this.id = id;
  this.nom = nom;
  this.superficie = superficie;
  this.troupeau = null;
  this.infestation = [];
  this.contaminant = 0;
}
// AJout d'un objet strongle à la parcelle
Parcelle.prototype.addStrongles = function(nb_strongles)
{
  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut(1);
    strongle.setLot();
    this.infestation.push(strongle);
  }
}
// Méthode d'évolution de l'infestation par les strongle d'une parcelle
Parcelle.prototype.evolutionStrongles = function(jours)
{
  if(this.infestation.length > 0)
  {
    this.infestation.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}

// Méthode qui renvoie le nombre de strongles infestantes
Parcelle.prototype.getContaminant = function ()
{
  var nb_L3 = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat == INFESTANT)
    {
      nb_L3++;
    }
  });

  return tauxInfestant(nb_L3, this.superficie);
}
Parcelle.prototype.entreTroupeau = function (troupeau) {
  this.troupeau = troupeau;
};

Parcelle.prototype.sortTroupeau = function () {
  this.troupeau = null;
};
//####################################### FONCTION ##############################
// FACTEUR D'INFESTATION D'UNE PARCELLE EN FONCTION DU NOMBRE DE L3 ET DE LA SUPERFICIE 
function tauxInfestant(nb_L3, superficie) {
  return nb_L3 / (superficie * TAUX_PARCELLE_CONTAMINANTE);
}
// ajout d'un nouveau lot de strongle dans une parcelle donnée
function nouveau_lot_de_strongles(parcelle, i, nb_oeufs)
{
  if(parcelle.infestation.length <2500){ // si on en rajoute trop le programme plante le navigateur

    for(var j = (parcelle.infestation.length-nb_oeufs); j < parcelle.infestation.length; j++) // on compte à partir des nouveau parasites
    {
      var lot_html = []
      for(let parasite of parcelle.infestation[j].lot)
      {
        // on crée la position du parasite
        var parasite_html = '<div class="non_infestant" style="left:'+Math.round(parasite[0])+'%; top: '+Math.round(parasite[1])+'%"></div>';
        lot_html.push(parasite_html); // on l'ajoute au lot
      }
    };
    // on crée le div correspondant
    return $("#pature_"+parcelle.id).append('<div id="parasite_'
      +(parcelle.infestation.length-1+i)
      +'_'+parcelle.id
      +'" class="lot strongleOut" age="1" pathogen="'
      +PATHOGEN
      +'" etat="non_infestant">'+
      lot_html
      +'</div>');
  }
}
