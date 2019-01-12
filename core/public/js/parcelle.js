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
Parcelle.prototype.addStrongles = function(nb_strongles)
{
  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut($i,1);
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
Parcelle.prototype.getContaminant = function (pature)
{
  superficie_parcelle = pature.superficie * this.proportion / 100;
  var nb_L3 = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat == param.INFESTANT.valeur)
    {
      nb_L3++;
    }
  });
  return tauxInfestant(nb_L3, superficie_parcelle);
}
Parcelle.prototype.entreTroupeau = function (troupeau) {
  this.troupeau = troupeau;
  return this;
};

Parcelle.prototype.sortTroupeau = function () {
  this.troupeau = null;
};


//####################################### FONCTION ##############################

// CREER UN OBJET PARCELLE A PARTIR D'UN HTML Parcelle
function creeParcelleAvecHtml(parcelle)
{
  parcelleObj= new Parcelle($(parcelle).attr('id'), $(parcelle_id).attr('proportion')); // on crée une nouvelle parcelle
  parcelleObj.contaminant = parseFloat($(parcelle).attr('contaminant')); // on récupère son niveau de contamination
  $(parcelle).children().each(function(index, valeur) { // recherche des strongles présents sur cette parcelle
    strongle = new StrongleOut($(valeur).attr('id') ,$(valeur).attr('age'));
    strongle.etat = $(valeur).attr('etat');
    strongle.pathogen = parseInt($(valeur).attr('pathogen'));
    parcelleObj.infestation.push(strongle); // association de ces strongles à la parcelle
  });
  return parcelleObj;
}

function creeHtmlAvecParcelle(patureObj, parcelleObj)
{
  var pature_num = patureObj.id.split("_")[1];
  var parcelle_num = parcelleObj.id.split("_")[2];
    parcelleHtml = '<div id="parcelle_'+pature_num+'_'+parcelle_num+'"'+
    ' class="parcelle"'+
    ' proportion = "'+parcelleObj.proportion+'"'+
    ' infestation = "'+parcelleObj.infestation.length+'"'+
    ' contaminant = "'+parcelleObj.contaminant/(patureObj.superficie * param.TAUX_PARCELLE_CONTAMINANTE.valeur)+'"'+
  '>';
  var parasite = "";
  parcelleObj.infestation.forEach(function(strongle, key) {
    parasite += '<div id="parasite_'+key+'_'+parcelle_num+'" class="'+strongle.etat+'"'+
      ' age = "'+strongle.age+'"'+
      ' pathogen = "'+strongle.pathogen+'"'+
      ' etat = "'+strongle.etat+'"'+
      ' style="left:'+strongle.localisation[0]+'%;top:'+strongle.localisation[1]+'%"></div>'

  });
  var fin = "</div>";
  return parcelleHtml+parasite+fin;
}

// FACTEUR D'INFESTATION D'UNE PARCELLE EN FONCTION DU NOMBRE DE L3 ET DE LA SUPERFICIE
function tauxInfestant(nb_L3, superficie) {
  return nb_L3 / (superficie * param.TAUX_PARCELLE_CONTAMINANTE.valeur);
}
//modifie le html en fonction de l'évolution du temps pour une parcelle donnée
function evolution_strongles_parcelle(parcelle) {
  parcelle.infestation.forEach(function(strongle) {
    $("#"+strongle.id).attr('age', strongle.age);
    $("#"+strongle.id).attr('etat', strongle.etat);
    $("#"+strongle.id).attr('class', strongle.etat);
  });
}

function elimination_morts_de_la_parcelle(parcelle) {
  // élimination des objets parasite morts de l'objet parcelle
  for(let parasite of parcelle.infestation) {
    if(parasite.etat == param.MORT.valeur) {
      parcelle.infestation.splice(parcelle.infestation.indexOf(parasite), 1);
    }
  }
  // élimination balises html correspondantes
  $("#pature_"+parcelle.id).children().each(function(index) {
    if($(this).attr('etat') == param.MORT.valeur) {
      $(this).remove();
    }
  })
}
// ajout d'un nouveau lot de strongle dans une parcelle donnée
function nouveau_lot_de_strongles(parcelle, nb_oeufs)
{
  // manip destinée à diminuer le nb de strongles quand parcelle très infestée pour ne pas planter le navigateur
  var nb_oeufs_corrige = decroissance(nb_oeufs);
  console.log(nb_oeufs+" - "+parcelle.infestation.length);
    for(var j = (parcelle.infestation.length-nb_oeufs_corrige); j < parcelle.infestation.length; j++) // on compte à partir des nouveau parasites
      {
        // console.log(j);
        // nouveau_strongle(parcelle, j);
      }

}
function nouveau_strongle(parcelle, j)
{
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
