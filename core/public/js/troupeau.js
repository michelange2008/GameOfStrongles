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

  for($i = 1 ; $i <= nb_strongles; $i++)
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
// Donne un taux de contamination d'un troupeau en fonction du nb de strongles adultes et de la taille
function tauxTroupeauContaminant(nb_strongles_adultes, taille) {
  return nb_strongles_adultes * taille / TAUX_TROUPEAU_CONTAMINANT;
}
function risqueMortalite(nb_strongles_adultes){
  return nb_strongles_adultes * PATHOGEN;
}

function troupeau_infestant(nb_strongles_adultes, troupeau){ // change l'aspect du troupeau quand il a des adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+troupeau.espece+'.svg), url('+url_svg+'crottes.svg)');
  $('#troupeau').attr('contaminant', tauxTroupeauContaminant(nb_strongles_adultes, troupeau.taille));
}
function troupeau_non_infestant(){// change l'aspect du troupeau quand il n'a plus d'adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+troupeau.espece+'.svg)');
  troupeau.contaminant = false;
  $('#troupeau').attr('contaminant', 0);
}
function troupeau_malade() {
  $('#troupeau').css('background-image', 'url('+url_svg+troupeau.espece+'_malades.svg)');
}
function troupeau_mort() {
  $('#troupeau').css('background-image', 'url('+url_svg+troupeau.espece+'_morts.svg)');
}
function troupeau_evolution_excretion(troupeau){ // change l'aspect du troupeau en fonction de sa situation et le compteur
  var nb_strongles_adultes = 0;
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat == PONTE)
    {
      nb_strongles_adultes++;
    }
  });
  if(nb_strongles_adultes > 0 && nb_strongles_adultes < RISQUE_MORTALITE_MOYEN){
    troupeau_infestant(nb_strongles_adultes, troupeau);
  }
  else if (nb_strongles_adultes > RISQUE_MORTALITE_MOYEN && nb_strongles_adultes < RISQUE_MORTALITE_ELEVE) {
    troupeau_malade();
  }
  else if (nb_strongles_adultes > RISQUE_MORTALITE_ELEVE) {
    troupeau_mort();
  }
  else {
    troupeau_non_infestant();
  }
  $('#troupeau_contaminant').html(nb_strongles_adultes);
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
  $.alert({
    escapeKey: 'Ok',
      buttons: {
          Ok: function(){
            $("#troupeau").css('left', 0).css('top', 0);
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

function troupeau_evolution_aspect(troupeau) {
  var couleur_troupeau_infestation = troupeau.infestation.length* (-5);
  couleur_troupeau_infestation = (troupeau.infestation.length < 25) ? troupeau.infestation.length* (-5) : -90;
  $("#troupeau").css('filter', 'hue-rotate('+couleur_troupeau_infestation+'deg)')

}
