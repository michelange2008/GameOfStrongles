//################################# CLASSES ET METHODES ##################################
function Parcelle(id_pature, id)
{
  this.id = "parcelle_"+id_pature+"_"+id;
  this.proportion = 100;
  this.troupeau = null;
  this.infestation = [];
  this.contaminant = 0;
}
// AJout d'un objet strongle à la parcelle
Parcelle.prototype.addStrongles = function(nb_strongles) {
  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut($i,1);
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

    this.majParcelleApresInfestationParTroupeau();
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
  return $("#pature_"+parcelle.id).append('<div id="parasite_'
    +parcelle.infestation.length
    +'_'+parcelle.id
    +'" class="'+param.NON_INFESTANT.valeur+'" style="left:'+parcelle.infestation[j].localisation["0"]+'%; top: '+parcelle.infestation[j].localisation["1"]+'%">'
    +'</div>');
}
// décroissance exponentielle
function decroissance(nb_oeufs) {
  return Math.round(nb_oeufs*(1 / Math.exp(Math.sqrt(nb_oeufs/param.DECROISSANCE.valeur))));
}


//####################################### AFFICHAGE ##############################

//modifie le html en fonction de l'évolution du temps pour une parcelle donnée
Parcelle.prototype.majEvolutionStronglesOut = function () {
  var parcelle_id = this.id;
  this.infestation.forEach(function(strongle, index) { // transcription dans l'état de chaque strongle
  if(strongle.etat == param.MORT.valeur) {

    $("#parasite_"+strongle.id+"_"+parcelle_id).remove();
  }
  $("#parasite_"+strongle.id+"_"+parcelle_id).attr('class', strongle.etat);

});
$("#monit-pat-"+parcelle_id).html(Math.round(this.contaminant)+" / "+this.infestation.length);
};

// élimination des objets parasite morts de l'objet parcelle
Parcelle.prototype.elimination_morts_dans_parcelle = function () {
  var infestation = this.infestation;
  infestation.forEach( function(parasite, clef) {
    if(parasite.etat == param.MORT.valeur) {
      infestation.splice(infestation[clef], 1);
    }
  })
};

// mise à jour de l'affichage des strongles après infestation par le troupeau
Parcelle.prototype.majParcelleApresInfestationParTroupeau = function() {
  $('#'+this.id).html('');
  $('#'+this.id).html(this.dessineStronglesOut());
}
// dessines les strongles de la parcelle
Parcelle.prototype.dessineStronglesOut = function () {
  var strongles = '';
  if(this.infestation.length > 0) {
    for (var i = 0; i < this.infestation.length; i++) {
      strongles += '<div id="parasite_'+this.infestation[i].id+'_'+this.id+'" class="'+this.infestation[i].etat
      +'"style="left:'+this.infestation[i].localisation[0]+'%;top:'+this.infestation[i].localisation[1]+'%"></div>';
    }
  }
  return strongles;
};
//##################### MOUVEMENTS DU TROUPEAU DANS LA PARCELLE ################
Parcelle.prototype.entreTroupeau = function (troupeau) {
  this.troupeau = troupeau;
  return this;
};

Parcelle.prototype.sortTroupeau = function () {
  this.troupeau = null;
};

// CREER UN OBJET PARCELLE A PARTIR D'UN HTML Parcelle
// function creeParcelleAvecHtml(parcelle) {
//   parcelleObj= new Parcelle($(parcelle).attr('id'), $(parcelle_id).attr('proportion')); // on crée une nouvelle parcelle
//   parcelleObj.contaminant = parseFloat($(parcelle).attr('contaminant')); // on récupère son niveau de contamination
//   $(parcelle).children().each(function(index, valeur) { // recherche des strongles présents sur cette parcelle
//     strongle = new StrongleOut($(valeur).attr('id') ,$(valeur).attr('age'));
//     strongle.etat = $(valeur).attr('etat');
//     strongle.pathogen = parseInt($(valeur).attr('pathogen'));
//     parcelleObj.infestation.push(strongle); // association de ces strongles à la parcelle
//   });
//   return parcelleObj;
// }

// function creeHtmlAvecParcelle(patureObj, parcelleObj) {
//   var pature_num = patureObj.id.split("_")[1];
//   var parcelle_num = parcelleObj.id.split("_")[2];
//     parcelleHtml = '<div id="parcelle_'+pature_num+'_'+parcelle_num+'"'+
//     ' class="parcelle"'+
//     ' proportion = "'+parcelleObj.proportion+'"'+
//     ' infestation = "'+parcelleObj.infestation.length+'"'+
//     ' contaminant = "'+parcelleObj.contaminant/(patureObj.superficie * param.TAUX_PARCELLE_CONTAMINANTE.valeur)+'"'+
//   '>';
//   var parasite = "";
//   parcelleObj.infestation.forEach(function(strongle, key) {
//     parasite += '<div id="parasite_'+key+'_'+parcelle_num+'" class="'+strongle.etat+'"'+
//       ' age = "'+strongle.age+'"'+
//       ' pathogen = "'+strongle.pathogen+'"'+
//       ' etat = "'+strongle.etat+'"'+
//       ' style="left:'+strongle.localisation[0]+'%;top:'+strongle.localisation[1]+'%"></div>'
//
//   });
//   var fin = "</div>";
//   return parcelleHtml+parasite+fin;
// }
