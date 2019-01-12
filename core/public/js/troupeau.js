//################################ CLASSE ET METHODES ####################################
function Troupeau()
{
  this.espece = "caprins";
  this.effectif = 45;
  this.parcelle = "chevrerie";
  this.infestation = [];
  this.sinfeste(5);
  this.contaminant = 0;
}
Troupeau.prototype.setEspece = function (espece) {
  this.espece = espece;
};
Troupeau.prototype.seteffectif = function (effectif) {
  this.effectif = effectif;
};
Troupeau.prototype.setSensibilite = function (sensibilite) {
  this.sensibilite = sensibilite;
};
Troupeau.prototype.setStrongles = function (nb_strongles) {
  this.infestation = [];
  for (var i = 0; i < nb_strongles; i++) {
    strongle = new StrongleIn("strongle_"+i, 1, param.PATHOGEN.valeur);
    this.addStrongles(strongle);
  }
};
// Ajout de strongles à un troupeau: lors d'une creation de troupeau
Troupeau.prototype.addStrongles = function (strongleObj) {
    var strongle = new StrongleIn(strongleObj.id, strongleObj.age, strongleObj.pathogen);
    this.infestation.push(strongle);
};
// Méthode d'infestation d'un troupeau par ajout d'un nombre donné de strongles
Troupeau.prototype.sinfeste = function(nb_strongles){
  for(i = 1 ; i <= nb_strongles; i++)
  {
    strongle = new StrongleIn(1);
    this.infestation.push(strongle);
  }
}
// AJout de strongles par contamination au paturage en fonction d'un nombre de jours
Troupeau.prototype.sinfestePaturage = function (nb_strongles, jours) {
    for(i = 1 ; i <= nb_strongles*jours; i++)
    {
      strongle = new StrongleIn(1);
      this.infestation.push(strongle);
    }
};
// Evolution des strongles au sein d'un troupeau
Troupeau.prototype.evolutionStrongles = function(jours) {

  if(this.infestation.length > 0)
  {
      for (var i = 0; i < this.infestation.length; i++) {
        this.infestation[i].evolution(jours);
      }
  }
}

Troupeau.prototype.entreDansParcelle = function(parcelle) {
  this.parcelle = parcelle;
};

Troupeau.prototype.sortDeParcelle = function () {
  this.parcelle = null;
};
// Calcule le nombre de strongle à l'état de ponte
Troupeau.prototype.nbStrongleAdultes = function () {
  var nb_strongles_adultes = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat == param.PONTE.valeur)
    {
      nb_strongles_adultes ++;
    }
  })
    return nb_strongles_adultes;
};
// Donne un taux de contamination d'un troupeau
Troupeau.prototype.tauxContaminant = function () {
  return this.nbStrongleAdultes()*this.effectif*param.TAUX_TROUPEAU_CONTAMINANT.valeur / 100;
};

Troupeau.prototype.elimination_morts = function() {
  var nouvelle_situation = [];
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat !== param.MORT.valeur)
    {
      nouvelle_situation.push(strongle);
    }
  });
  troupeau.infestation = nouvelle_situation;
  troupeau.maj_moniteur();
}

Troupeau.prototype.maj_moniteur = function () {
  $('#monit-tp-infestation').html(troupeau.infestation.length);
  $('#monit-tp-contaminant').html(troupeau.contaminant);
};

Troupeau.prototype.maj_aspect_troupeau = function () {

  if(troupeau.infestation.length > param.RISQUE_MORTALITE_ELEVE.valeur && troupeau.infestation.length < param.TROUPEAU_MORT.valeur) {
    image_troupeau = troupeau.espece+'_tres_malade.svg';
  }
  else if (troupeau.infestation.length > param.RISQUE_MORTALITE_MOYEN.valeur && troupeau.infestation.length < param.RISQUE_MORTALITE_ELEVE.valeur) {
    image_troupeau = troupeau.espece+"_malade.svg";
  }
  else if (troupeau.infestation.length == 0) {
    image_troupeau = troupeau.espece+'_infestation_'+indice_infestation+'_contaminant_0.svg';
  }
  else {
    var nombre_niveau_infestation = 5
    var intervalle_aspect = param.RISQUE_MORTALITE_MOYEN.valeur / nombre_niveau_infestation;
    var indice_infestation =Math.round(troupeau.infestation.length/intervalle_aspect)+1;
    var estContaminant = (this.contaminant > 0) ? 1 : 0;
    image_troupeau = troupeau.espece+'_infestation_'+indice_infestation+'_contaminant_'+estContaminant+'.svg';
  }
    $('#troupeau-image').attr('src', url_svg+image_troupeau);
};
// TODO: question de l'évolution du troupeau en fonction de la pathogénéicité et de l'effectif 

//###################################### FONCTIONS #################################
// Donne un taux de contamination d'un troupeau en fonction du nb de strongles adultes, de la effectif et d'un parametre TTC
function tauxTroupeauContaminant(nb_strongles_adultes, effectif) {
  return nb_strongles_adultes * effectif * param.TAUX_TROUPEAU_CONTAMINANT.valeur / 100;
}
function risqueMortalite(nb_strongles_adultes){
  return nb_strongles_adultes * param.PATHOGEN.valeur;
}

function troupeau_infestant(nb_strongles_adultes, troupeau){ // aspect du troupeau quand il a des adultes qui pondent
  // $('#troupeau').css('background-image', 'url('+url_svg+'crottes.svg)');
  $('#troupeau').attr('contaminant', tauxTroupeauContaminant(nb_strongles_adultes, troupeau.effectif));
}
function troupeau_non_infestant(){// aspect du troupeau quand il n'a plus d'adultes qui pondent
  // $('#troupeau').css('background-image', 'none');
  troupeau.contaminant = false;
  $('#troupeau').attr('contaminant', 0);
}
function troupeau_malade() { // aspect du troupeau quand infesté au dessus d'un certain niveau
  // $('#troupeau > img').attr('src', url_svg+troupeau.espece+'_malades.svg');
}
function troupeau_presque_mort() { // aspect du troupeau quand infesté au dessus d'un certain niveau
  // $('#troupeau > img').css('src', url_svg+troupeau.espece+'_morts.svg');
}
function troupeau_mort() {
  $('#troupeau').css('visibility', 'hidden');
  alerte_troupeau_mort();
}
function troupeau_evolution_excretion(troupeau){ // change l'aspect du troupeau en fonction de sa situation et le compteur
  var nb_strongles_adultes = 0;
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat == param.PONTE.valeur)
    {
      nb_strongles_adultes++;
    }
  });
  var nb_strongles_pathogenes = nb_strongles_adultes * param.PATHOGEN.valeur;
  if(nb_strongles_pathogenes > 0 && nb_strongles_pathogenes < param.RISQUE_MORTALITE_MOYEN.valeur){
    troupeau_infestant(nb_strongles_pathogenes, troupeau);
  }
  else if (nb_strongles_pathogenes > param.RISQUE_MORTALITE_MOYEN.valeur && nb_strongles_pathogenes < param.RISQUE_MORTALITE_ELEVE.valeur) {
    troupeau_malade();
  }
  else if (nb_strongles_pathogenes > param.RISQUE_MORTALITE_ELEVE.valeur && nb_strongles_pathogenes < param.TROUPEAU_MORT.valeur) {
    troupeau_presque_mort();
  }
  else if (nb_strongles_pathogenes > param.TROUPEAU_MORT.valeur) {
    troupeau_mort();
  }
  else {
    troupeau_non_infestant();
  }
  var indice_contaminant = tauxTroupeauContaminant(decroissance(nb_strongles_adultes), troupeau.effectif);
  $('#troupeau_contaminant').html(indice_contaminant);
  $('#troupeau').attr('contaminant', indice_contaminant);
  troupeau.contaminant = indice_contaminant;
}


function troupeau_dehors()
{
  $("#troupeau").css('background-image', 'url('+url_svg+'chien.svg)');
  $.alert({
    escapeKey: 'Ok',
      buttons: {
          Ok: function(){
            // $("#troupeau").css('left', 0).css('top', 0);
          }
      },
    theme: 'dark',
    title: 'Attention !',
    content: 'Le troupeau est sorti du pré !</br> Mais que fait le chien ?',
    type: 'red',
  });

}

function troupeau_chevrerie()
{
  $("#troupeau").css('background-image', 'url('+url_svg+'foin.svg)');
  $.alert({
    escapeKey: 'Ok',
      buttons: {
          Ok: function(){

          }
      },
    theme: 'dark',
    title: 'Et voilà...',
    content: 'Le troupeau est rentré dans la chevrerie !',
    type: 'green',
  });
}

function alerte_troupeau_mort()
{
  $.confirm({
      title: 'Désolé !',
      content: 'Le troupeau est mort',
      type: 'red',
      typeAnimated: true,
      buttons: {
          close: function () {
              location.reload();
          }
      }
  });
}
