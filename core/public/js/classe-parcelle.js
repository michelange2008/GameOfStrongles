//################################# CLASSES ET METHODES ##################################
function Lieu() {
  this.troupeau = null;
  this.infestation = [];
  this.contaminant = 0;
}

class Batiment extends Lieu
{
  constructor(nom) {
    super();
    this.id = nom;
    this.nom = nom;
  }
}

class Parcelle extends Lieu
{
  constructor(pature, id) {
    super();
    this.id = "parcelle_"+pature.id+"_"+id;
    this.nom = pature.nom+" ("+(id+1)+")";
    this.proportion = 100;
    // this.jours_patures = [];
  }
}
// Ajoute un jour paturé
// Parcelle.prototype.addJourPature = function (date) {
//   this.jours_patures.push(date);
// };
// Ajoute plusieurs jours patures selon la date courante au début du pas de temps et le pas de temps
// Parcelle.prototype.addJoursPatures = function (date) {
//   if(this.troupeau == troupeau) {
//     // On décompte à reculons le pas de temps car la date courante est la date de fin de séjour
//     for (var i = param.PAS_DE_TEMPS.valeur; i > 0; i--) {
//       this.addJourPature(new Date(date-(24*3600*1000*i)));
//     }
//   }
// };
// AJout d'un objet strongle à la parcelle
Parcelle.prototype.addStrongles = function(nb_strongles) {
  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut(1);
    this.infestation.push(strongle);
  }
}
// Méthode d'évolution de l'infestation par les strongle d'une parcelle
Parcelle.prototype.evolutionStrongles = function(jours) {
  var infestation = this.infestation;
  if(infestation.length > 0)
  {
    infestation.forEach(function(strongle, clef) {
      strongle.evolution(jours);
      if(strongle.etat == param.MORT.valeur) {
        infestation.splice(clef, 1);
      }
    });
  }
}
// Calcule le nombre de larves L3 infestantes à un instant donné
Parcelle.prototype.nombreL3 = function () {
  var nb_L3 = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat == param.INFESTANT.valeur)
    {
      nb_L3++;
    }
  });
  return nb_L3;
};

// Méthode qui renvoie le nombre de strongles infestants en tenant compte de la superficie
Parcelle.prototype.getContaminant = function (pature) {
  var superficie_parcelle = pature.superficie * this.proportion / 100; // tient compte d'un éventuel découpage de la pature en plusieurs parcelles
  var nb_L3 = this.nombreL3();
  return tauxInfestante(nb_L3, superficie_parcelle);
}

//######################## INFESTATION DE LA PARCELLE PAR LE TROUPEAU ##########

Parcelle.prototype.infestationParTroupeau = function (troupeau) {

  if(this.troupeau instanceof Troupeau) //Si la parcelle possède un troupeau
  {
    var nb_oeufs = troupeau.capaciteInfestante * param.PAS_DE_TEMPS.valeur; // Nombre d'oeufs produits par le troupeau
    this.addStrongles(nb_oeufs); // On additionne ces oeufs à l'objet parcelle
  }
};

// Facteur d'infestation d'une parcelle en fonction du nombre de L3 et de la superficie
function tauxInfestante(nb_L3, superficie) {
  return nb_L3 / (superficie * param.TAUX_PARCELLE_CONTAMINANTE.valeur);
}
// ajout d'un nouveau lot de strongle dans une parcelle donnée
function nouveau_lot_de_strongles(parcelle, nb_oeufs) {
  // manip destinée à diminuer le nb de strongles quand parcelle très infestée pour ne pas planter le navigateur
  var nb_oeufs_corrige = decroissance(nb_oeufs);
    for(var j = (parcelle.infestation.length-nb_oeufs_corrige); j < parcelle.infestation.length; j++) // on compte à partir des nouveau parasites
      {
        // nouveau_strongle(parcelle, j);
      }

}
function nouveau_strongle(parcelle, j) {
  return $("#pature_"+parcelle.id).append('<div class="'+param.NON_INFESTANT.valeur
  +'" style="left:'+parcelle.infestation[j].localisation["0"]+'%; top: '
  +parcelle.infestation[j].localisation["1"]+'%">'
    +'</div>');
}
// décroissance exponentielle
function decroissance(nb_oeufs) {
  return Math.round(nb_oeufs*(1 / Math.exp(Math.sqrt(nb_oeufs/param.DECROISSANCE.valeur))));
}
// TODO: prendre en compte l'age des strongles
//####################################### AFFICHAGE ##############################

//modifie le html en fonction de l'évolution du temps pour une parcelle donnée
Parcelle.prototype.majEvolutionStronglesOut = function () {
  var parcelle_id = this.id;
  this.infestation.forEach(function(strongle, index) { // transcription dans l'état de chaque strongle
  if(strongle.etat == param.MORT.valeur) {

    $("#parasite_"+index+"_"+parcelle_id).remove();
  }
  $("#parasite_"+index+"_"+parcelle_id).attr('class', strongle.etat);

});
$("#monit-pat-"+parcelle_id).html(Math.round(this.contaminant)+" / "+this.infestation.length);
};

// mise à jour de l'affichage des strongles après infestation par le troupeau
Parcelle.prototype.majParcelle = function() {
  $('#'+this.id).html('');
  $('#'+this.id).html(this.dessineStronglesOut());
}
// dessines les strongles de la parcelle
Parcelle.prototype.dessineStronglesOut = function () {
  $('#'+this.id+' > div').remove();
  var strongles = '';
  if(this.infestation.length > 0) {
    for (var i = 0; i < this.infestation.length; i++) {
      strongles += '<div class="lot '+this.infestation[i].etat
      +'"style="left:'+this.infestation[i].localisation[0]+'%;top:'+this.infestation[i].localisation[1]+'%"></div>';
    }
  }
  return strongles;
};
//##################### MOUVEMENTS DU TROUPEAU DANS LA PARCELLE ################
Parcelle.prototype.entreTroupeau = function (troupeau) {
  this.troupeau = troupeau;
  $("#"+this.id).addClass('parcelle-avec-troupeau'); // attribution d'un couleur pour la parcelle avec troupeau
};

Parcelle.prototype.sortTroupeau = function () {
  this.troupeau = null;
  $("#"+parcelle_avec_troupeau.id).removeClass('parcelle-avec-troupeau'); // attribution d'un couleur pour la parcelle avec troupeau
};
