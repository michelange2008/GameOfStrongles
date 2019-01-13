//################################ CLASSE ET SETTERS ####################################
function Troupeau()
{
  this.espece = "caprins";
  this.effectif = 45;
  this.parcelle = "chevrerie";
  this.infestation = [];
  this.sinfeste(5);
  this.capaciteInfestante = 0;
  this.sante = 100;
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
// Définit si un troupeau est contaminant
Troupeau.prototype.setContaminant = function(){
  // FIXME: Est-ce bien de prendre en compte l'effectif troupeau ou pas ?
  this.capaciteInfestante = this.tauxContaminant();
}

//########################### PROCESSUS D'INFESTATION ##########################

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

//########################## EVOLUTION INTERNE DU TROUPEAU #####################

// Evolution des strongles au sein d'un troupeau
Troupeau.prototype.evolutionStrongles = function(jours) {

  if(this.infestation.length > 0)
  {
      for (var i = 0; i < this.infestation.length; i++) {
        this.infestation[i].evolution(jours);
      }
  }
}

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
// Donne un taux de capacité de contamination d'un troupeau en fonction du nb de strongles adultes, de la effectif et d'un parametre TTC
Troupeau.prototype.tauxContaminant = function () {
  return this.nbStrongleAdultes()*this.effectif*param.TAUX_TROUPEAU_CONTAMINANT.valeur / 100;
};
// Calcule l'évolution de l'indice de santé du troupeau
Troupeau.prototype.evolutionSante = function () {
  // La sévérité de l'infestation dépend du nombre de strongles adultes et de leur pathogénicité
  var severiteInfestation = this.nbStrongleAdultes()*param.PATHOGEN.valeur;
  // formule mathématique permettant de donner un indice entre 100 (bonne santé) et 0 (mort)
  troupeau.sante *= (-0.03 * severiteInfestation +100)/100 ;
  // Pour éviter des indices négatifs
  troupeau.sante = (troupeau.sante > 0) ? troupeau.sante : 0;
};
// Enlève les strongles morts de l'objet troupeau
Troupeau.prototype.elimination_morts = function() {
  var nouvelle_situation = []; // nouvelle liste de strongles (vide au départ)
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat !== param.MORT.valeur)
    {
      nouvelle_situation.push(strongle); // On ne met dans cette liste que les strongles vivants
    }
  });
  troupeau.infestation = nouvelle_situation; // on remplace l'ancienne liste par la nouvelle
  troupeau.maj_moniteur(); // On met à jour l'affichage du moniteur
}


//###################################### AFFICHAGE #################################

// Met à jour l'affichage du moniteur pour le troupeau
Troupeau.prototype.maj_moniteur = function () {
  $('#monit-tp-infestation').html(troupeau.infestation.length);
  $('#monit-tp-contaminant').html(troupeau.capaciteInfestante);
};
// Met à jour l'image du troupeau en fonction de son niveau de santé et d'excrétion
Troupeau.prototype.maj_aspect_troupeau = function () {
  var estContaminant = (this.capaciteInfestante > 0) ? 1 : 0; // Si contaminant est > 0 le troupeau est contaminant
  var indiceSante = Math.floor(troupeau.sante/10); // Calcul pour avoir 10 niveaux de santé à partir de la
  var image_troupeau = troupeau.espece+'_sante_'+indiceSante+'_contaminant_'+estContaminant+'.svg';
  $('#troupeau-image').attr('src', url_svg+image_troupeau);
  if(troupeau.sante == 0) {
    troupeau_mort();
  }
};

function troupeau_mort() {
  alerte_troupeau_mort();
}

function alerte_troupeau_dehors(){
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

function alerte_troupeau_chevrerie(){
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

function alerte_troupeau_mort(){
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

//############################## MOUVEMENTS DU TROUPEAU ########################

Troupeau.prototype.entreDansParcelle = function(parcelle) {
  this.parcelle = parcelle;
};

Troupeau.prototype.sortDeParcelle = function () {
  this.parcelle = null;
};
