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
//modifie le html en fonction de l'évolution du temps pour une parcelle donnée
function evolution_strongles_parcelle(parcelle) {
  $("#pature_"+parcelle.id+"> div").each(function(e, parasite) {
    var age_parasite = parseInt($(parasite).attr('age'));
    $(parasite).attr('age', age_parasite + pas_de_temps);
    if(age_parasite + pas_de_temps < L3_INFESTANTE) {
      $(parasite).attr('etat', NON_INFESTANT);
      $(parasite).attr('class', NON_INFESTANT);
    } else if (age_parasite + pas_de_temps > L3_MORTE) {
      $(parasite).attr('etat', MORT);
      $(parasite).attr('class', MORT);
    } else {
      $(parasite).attr('etat', INFESTANT);
      $(parasite).attr('class', INFESTANT);
    }
  })
}

function elimination_morts_de_la_parcelle(parcelle) {
  // élimination des objets parasite morts de l'objet parcelle
  for(let parasite of parcelle.infestation) {
    if(parasite.etat == MORT) {
      parcelle.infestation.splice(parcelle.infestation.indexOf(parasite), 1);
    }
  }
  // élimination balises html correspondantes
  $("#pature_"+parcelle.id).children().each(function(index) {
    if($(this).attr('etat') == MORT) {
      $(this).remove();
    }
  })
}
// ajout d'un nouveau lot de strongle dans une parcelle donnée
function nouveau_lot_de_strongles(parcelle, nb_oeufs)
{
  // manip destinée à diminuer le nb de strongles quand parcelle très infestée pour ne pas planter le navigateur
  var nb_oeufs_corrige = decroissance(nb_oeufs);
    for(var j = (parcelle.infestation.length-nb_oeufs_corrige); j < parcelle.infestation.length; j++) // on compte à partir des nouveau parasites
      {
        nouveau_strongle(parcelle, j);
      }

}
function nouveau_strongle(parcelle, j)
{
  return $("#pature_"+parcelle.id).append('<div id="parasite_'
    +parcelle.infestation.length
    +'_'+parcelle.id
    +'" class="'+NON_INFESTANT+'" age = 1 etat = "'+NON_INFESTANT+'" style="left:'+parcelle.infestation[j].localisation["0"]+'%; top: '+parcelle.infestation[j].localisation["1"]+'%">'
    +'</div>');
}
// décroissance exponentielle
function decroissance(nb_oeufs) {
  return Math.round(nb_oeufs*(1 / Math.exp(Math.sqrt(nb_oeufs/DECROISSANCE))));
}
