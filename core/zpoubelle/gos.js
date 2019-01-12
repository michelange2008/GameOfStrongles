var GAMEOFSTRONGLE = GAMEOFSTRONGLE || {}
// modélisation sensibilité hôte

// modélisation parasites
const l3_infestante = 21;
const l3_morte = 60;
const preriode_prepatente = 10;
const infestation_maximum = 20;
const adulte_mort = 100;
// constantes pour les états des strongles
const non_infestant = 'non_infestant';
const infestant = 'infestant';
const mort = 'mort';
const prepatent = 'prepatent';
const ponte = 'ponte';
// considérations de style
const parcelle_sans_troupeau = 'lightgreen';
const parcelle_avec_troupeau = "green";

//################################# STRONGLES ##################################
class Strongle
{
  constructor ()
  {
    this.vie = 1;
  }
}

class StrongleOut extends Strongle {
  constructor()
  {
    super();
    this.etat = non_infestant;
  }
}

StrongleOut.prototype.evolution =  function(jours)
{
  this.vie = this.vie + jours;
  if(this.vie < l3_infestante)
  {
    this.etat = 'non_infestant';
  }
  else if (this.vie > l3_morte)
  {
    this.etat = 'mort';
  }
  else {
    this.etat = 'infestant';
  }
}

class StrongleIn extends Strongle {
  constructor()
  {
    super();
    this.etat = prepatent;
  }
}

StrongleIn.prototype.evolution = function(jours)
{
  this.vie = Number(this.vie) + Number(jours);
  if(this.vie < preriode_prepatente)
  {
    this.etat = prepatent;
  }
  else if (this.vie > adulte_mort) {
    this.etat = mort;
  }
  else
  {
    this.etat = ponte;
  }
}

//################################# PARCELLES ##################################
function Parcelle(id, nom, longueur, hauteur)
{
  this.id = id;
  this.nom = nom;
  this.longueur = longueur;
  this.hauteur = hauteur;
  this.strongles = [];
}
// AJout d'un objet strongle à la parcelle
Parcelle.prototype.addStrongles = function(nb_strongles)
{
  for($i = 0 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut(0);
    this.strongles.push(strongle);
  }
}
// Méthode d'évolution de l'infestation par les strongle d'une parcelle
Parcelle.prototype.evolutionStrongles = function(jours)
{
  if(this.strongles.length > 0)
  {
    this.strongles.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}

//################################ TROUPEAU ####################################
function Troupeau(espece, taille)
{
  this.espece = espece;
  this.taille = taille;
  this.infestation = [];
}
// Méthode d'infestation d'un troupeau par ajout d'un nombre donné de strongles
Troupeau.prototype.sinfeste = function(nb_strongles){

  for($i = 0 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleIn(0);
    this.infestation.push(strongle);
  }
}
Troupeau.prototype.evolutionStrongles = function(jours)
{
  if(this.infestation.length > 0)
  {
    this.infestation.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}

//################################# START ######################################
  $(function() {
    // création de l'objet troupeau sur la base du div #troupeau
    troupeau = new Troupeau($('#troupeau').attr('espece'), $('#troupeau').attr('taille'));

//############################ DEFINITION DES OBJETS PARCELLE ######################################################
  parcelles = []; // array vide pour accueillir les parcelles
  $('.pature').each(function(e){ // On passe en revue les div .pature et on crée l'objet parcelle à chaque fois
    parcelle = new Parcelle($(this).attr('id'), $(this).attr('nom'), $(this).css('width'), $(this).css('height'));
    parcelles.push(parcelle); // et on ajoute l'bjet au tableau
  });

  parcelles[2].addStrongles(0);
  parcelles[2].evolutionStrongles(10);
  parcelles[1].addStrongles(0);

//############################ GESTION DU DEPLACEMENT DU TROUPEAU ##################################################
  var $draggable = $('#troupeau').draggabilly({
      containment : '.paturage',
  });

  $draggable.on( 'dragEnd', function( event, pointer ) {
    $('.pature').each(function() { // on passe en revue toutes les parcelles
      $(this).attr('troupeau', false); // on passe à false la variable troupeau de toutes les patures
      $(this).css('background', parcelle_sans_troupeau); // attribution d'une couleur fond parcelle sans troupeau
    })
    $('#troupeau').css('visibility', 'collapse'); // on rend invisible le troupeau (pour pouvoir connaitre l'élément qui est en dessous)
    parcelle_troupeau = document.elementFromPoint(pointer.clientX, pointer.clientY).id; // on identifie l'élément qui est en dessous par la position du pointer
    $('#troupeau').css('visibility', 'visible'); // on remet le troupeau visible
    $(this).attr('lieu', parcelle_troupeau); // on attribue au troupeau le nom de la parcelle où il est
    $("#"+parcelle_troupeau).attr('troupeau', true); // on passer à true la variable troupeau de la parcelle où est le pointer cad le troupeau
    $("#"+parcelle_troupeau).css('background', parcelle_avec_troupeau); // attribution d'un couleur pour la parcelle avec troupeau
  });

//################################ AVANCEE D'UN PAS DE TEMPS DONNEE################################################

  var pas_de_temps = 7;

  $(document).on('keyup', function(e) {
    // pature avec troupeau
    var pature_avec_troupeau = $('#troupeau').attr('lieu');
    // evolution troupeau
    troupeau.evolutionStrongles(pas_de_temps);

    // troupeau augmente infestation si sur pature avec larves infestantes
    parcelles.forEach(function(parcelle){
      if(parcelle.id == pature_avec_troupeau && parcelle.strongles.length > 0)
      {
        parcelle.strongles.forEach(function(strongle)
        {
          if(strongle.etat = infestant)
          {
            troupeau.sinfeste(1);
          }
        });
      }
    })

    // troupeau infeste pature

    // pature évolution des larves

    // console.log(troupeau.infestation);
  })

});
