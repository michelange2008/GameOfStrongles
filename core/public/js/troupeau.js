//################################ CLASSE ET METHODES ####################################
function Troupeau(espece, taille)
{
  this.espece = espece;
  this.taille = taille;
  this.parcelle = null;
  this.infestation = [];
  this.contaminant = false;
}
// Méthode d'infestation d'un troupeau par ajout d'un nombre donné de strongles
Troupeau.prototype.sinfeste = function(nb_strongles){

  var jours = (PAS_DE_TEMPS ? PAS_DE_TEMPS : 1);

  for(i = 1 ; i <= nb_strongles*PAS_DE_TEMPS; i++)
  {
    strongle = new StrongleIn(1);
    this.infestation.push(strongle);
  }
}
Troupeau.prototype.evolutionStrongles = function(jours) {

  if(this.infestation.length > 0)
  {
    this.infestation.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}

Troupeau.prototype.entreDansParcelle = function(parcelle) {
  this.parcelle = parcelle;
};

Troupeau.prototype.sortDeParcelle = function () {
  this.parcelle = null;
};

//###################################### FONCTIONS #################################
// Donne un taux de contamination d'un troupeau en fonction du nb de strongles adultes, de la taille et d'un parametre TTC
function tauxTroupeauContaminant(nb_strongles_adultes, taille) {
  return nb_strongles_adultes * taille * TAUX_TROUPEAU_CONTAMINANT / 100;
}
function risqueMortalite(nb_strongles_adultes){
  return nb_strongles_adultes * PATHOGEN;
}

function troupeau_infestant(nb_strongles_adultes, troupeau){ // aspect du troupeau quand il a des adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+'crottes.svg)');
  $('#troupeau').attr('contaminant', tauxTroupeauContaminant(nb_strongles_adultes, troupeau.taille));
}
function troupeau_non_infestant(){// aspect du troupeau quand il n'a plus d'adultes qui pondent
  $('#troupeau').css('background-image', 'none');
  troupeau.contaminant = false;
  $('#troupeau').attr('contaminant', 0);
}
function troupeau_malade() { // aspect du troupeau quand infesté au dessus d'un certain niveau
  $('#troupeau > img').attr('src', url_svg+troupeau.espece+'_malades.svg');
}
function troupeau_presque_mort() { // aspect du troupeau quand infesté au dessus d'un certain niveau
  $('#troupeau > img').css('src', url_svg+troupeau.espece+'_morts.svg');
}
function troupeau_mort() {
  $('#troupeau').css('visibility', 'hidden');
  alerte_troupeau_mort();
}
function troupeau_evolution_excretion(troupeau){ // change l'aspect du troupeau en fonction de sa situation et le compteur
  var nb_strongles_adultes = 0;
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat == PONTE)
    {
      nb_strongles_adultes++;
    }
  });
  var nb_strongles_pathogenes = nb_strongles_adultes * PATHOGEN;
  if(nb_strongles_pathogenes > 0 && nb_strongles_pathogenes < RISQUE_MORTALITE_MOYEN){
    troupeau_infestant(nb_strongles_pathogenes, troupeau);
  }
  else if (nb_strongles_pathogenes > RISQUE_MORTALITE_MOYEN && nb_strongles_pathogenes < RISQUE_MORTALITE_ELEVE) {
    troupeau_malade();
  }
  else if (nb_strongles_pathogenes > RISQUE_MORTALITE_ELEVE && nb_strongles_pathogenes < TROUPEAU_MORT) {
    troupeau_presque_mort();
  }
  else if (nb_strongles_pathogenes > TROUPEAU_MORT) {
    troupeau_mort();
  }
  else {
    troupeau_non_infestant();
  }
  var indice_contaminant = tauxTroupeauContaminant(decroissance(nb_strongles_adultes), troupeau.taille);
  $('#troupeau_contaminant').html(indice_contaminant);
  $('#troupeau').attr('contaminant', indice_contaminant);
  troupeau.contaminant = indice_contaminant;
}


function elimination_morts(troupeau)
{
  var nouvelle_situation = [];
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat !== MORT)
    {
      nouvelle_situation.push(strongle);
    }
  });
  troupeau.infestation = nouvelle_situation;
  $('#infestation').html(troupeau.infestation.length);
  $('#troupeau').attr('infestation',troupeau.infestation.length);
}

function troupeau_dehors()
{
  $("#troupeau").css('background-image', 'url('+url_svg+'chien.svg)');
  console.log($("#troupeau").css('background-image'));
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

function troupeau_evolution_aspect(troupeau) {
  var couleur_troupeau_infestation = troupeau.infestation.length* (-5);
  couleur_troupeau_infestation = (troupeau.infestation.length < 25) ? troupeau.infestation.length* (-5) : -90;
  $("#troupeau").css('filter', 'hue-rotate('+couleur_troupeau_infestation+'deg)')

}
