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
// construit l'adresse des images
var options_date = { month: 'long', day: 'numeric' }; //date avec affichage type 15 mars
var url_svg = "";
var tab_url_bg = $('#troupeau').css('background-image').split("/");
tab_url_bg.pop();
tab_url_bg.shift();
tab_url_bg.forEach(function(e){
    url_svg += e+"/";
});
url_svg = "http:/"+url_svg;

//################################# STRONGLES ##################################
class Strongle
{
  constructor ()
  {
    this.age = 1;
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
  this.age = this.age + jours;
  if(this.age < l3_infestante)
  {
    this.etat = 'non_infestant';
  }
  else if (this.age > l3_morte)
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
  this.age = Number(this.age) + Number(jours);
  if(this.age < preriode_prepatente)
  {
    this.etat = prepatent;
  }
  else if (this.age > adulte_mort) {
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
  this.infestation = [];
}
// AJout d'un objet strongle à la parcelle
Parcelle.prototype.addStrongles = function(nb_strongles)
{
  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut();
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
Parcelle.prototype.contaminant = function ()
{
  var nb_L3 = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat = infestant)
    {
      nb_L3++;
    }
  });
  return nb_L3;
};

//################################ TROUPEAU ####################################
function Troupeau(espece, taille)
{
  this.espece = espece;
  this.taille = taille;
  this.infestation = [];

}
// Méthode d'infestation d'un troupeau par ajout d'un nombre donné de strongles
Troupeau.prototype.sinfeste = function(nb_strongles){

  for($i = 1 ; $i <= nb_strongles; $i++)
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
    // redémarrage en cliquant sur l'icone à droite
    $('#epee').on('click', function(){
      location.reload();
    });
    // création de l'objet troupeau sur la base du div #troupeau
    troupeau = new Troupeau($('#troupeau').attr('espece'), $('#troupeau').attr('taille'));
    troupeau.sinfeste($('#troupeau').attr('infestation'));

//######################################### FONCTIONS ##############################################################
function troupeau_infestant(){ // change l'aspect du troupeau quand il a des adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+'caprins.svg), url('+url_svg+'crottes.svg)');
  troupeau.contaminant = true;
  $('#troupeau').attr('contaminant', 'true');
}
function troupeau_non_infestant(){// change l'aspect du troupeau quand il n'a plus d'adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+'caprins.svg)');
  troupeau.contaminant = false;
  $('#troupeau').attr('contaminant', 'false');
}
function troupeau_evolution_excretion(){ // change l'aspect du troupeau en fonction de sa situation
  contamine = false;
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat == ponte)
    {
      contamine = true;
    }
    if(contamine){
      troupeau_infestant();
    }
    else if (!contamine) {
      troupeau_non_infestant();
    }
  });
}
function pature_infeste_troupeau(parcelle, troupeau_infeste)
{
  var nb_parasite = 0;
  $("#"+parcelle).children().each(function(index, valeur)
  {
    if(valeur.id == "parasite"){
      nb_parasite++;
    }
  });
  troupeau_infeste.sinfeste(nb_parasite);
}
//############################ DEFINITION DES OBJETS PARCELLE ######################################################
$('.parcellaire').masonry({
  // options
  itemSelector: '.pature',
  columnWidth: 1
});

//############################ GESTION DU DEPLACEMENT DU TROUPEAU ##################################################
  var $draggable = $('#troupeau').draggabilly({
  });

  $draggable.on( 'dragEnd', function( event, pointer ) {
    $('.pature').each(function() { // on passe en revue toutes les parcelles
      $(this).attr('troupeau', false); // on passe à false la variable troupeau de toutes les patures
      $(this).css('background', parcelle_sans_troupeau); // attribution d'une couleur fond parcelle sans troupeau
    })
    $('#troupeau').css('visibility', 'collapse'); // on rend invisible le troupeau (pour pouvoir connaitre l'élément qui est en dessous)
    $('.lot').css('visibility', 'collapse'); // et aussi les lots de stronle qui sur les parcelles
    parcelle_troupeau = document.elementFromPoint(pointer.clientX, pointer.clientY).id; // on identifie l'élément qui est en dessous par la position du pointer
    if(parcelle_troupeau == "ensemble-parcelles" || parcelle_troupeau == "month" || parcelle_troupeau == "titre") // le troupeau n'est pas dans une parcelle
    {
      $.alert({
        escapeKey: 'Ok',
          buttons: {
              Ok: function(){
              }
          },
        theme: 'dark',
        title: 'Attention !',
        content: 'Le troupeau est sorti du pré !</br> Mais que fait le chien ?',
        type: 'red',
    });
    }
    else {
      $(this).attr('lieu', parcelle_troupeau); // on attribue au troupeau le nom de la parcelle où il est
      $("#"+parcelle_troupeau).attr('troupeau', true); // on passer à true la variable troupeau de la parcelle où est le pointer cad le troupeau
      $("#"+parcelle_troupeau).css('background', parcelle_avec_troupeau); // attribution d'un couleur pour la parcelle avec troupeau
    }
    $('.lot').css('visibility', 'visible'); // et on réaffiche les strongles
    $('#troupeau').css('visibility', 'visible'); // on remet le troupeau visible
  });

//################################ AVANCEE D'UN PAS DE TEMPS DONNEE################################################
  var duree_paturage = $('#temps').attr('paturage');
  var pas_de_temps = 5;
  var largeur_time_line = $('#temps').innerWidth() ; //largeur en pixel de la time-line
  var saut_curseur = pas_de_temps * largeur_time_line / duree_paturage;
  var date = new Date($('#date').attr('data'));
  $(document).on('keydown', function(e) {
    if(e.which == 39 && $('#curseur').position().left < $('.time-line').width()-$('.cursor').width())
    {
    // avancée de la Date
    date.setDate(date.getDate()+pas_de_temps);
    $('#date').html(date.toLocaleDateString('fr-FR', options_date));
    // avancée du curseur
    var position_curseur = $('#curseur').css('left');
    var curseur = $('#curseur').css('left',parseInt(position_curseur)+parseInt(saut_curseur));
    // pature avec troupeau
    var pature_avec_troupeau = $('#troupeau').attr('lieu');
    // evolution troupeau #####################################################
    // évolution interne et éventuellement transformation du troupeau en excréteur
    troupeau.evolutionStrongles(pas_de_temps);
    troupeau_evolution_excretion();
    // nouvelle infestation du troupeau à partir de la parcelle
    console.log(troupeau.infestation);
    pature_infeste_troupeau(pature_avec_troupeau, troupeau);
    // var nb_parasite = 0;
    // $("#"+pature_avec_troupeau).children().each(function(index, valeur)
    // {
    //   if(valeur.id == "parasite"){
    //     nb_parasite++;
    //   }
    // });
    // troupeau.sinfeste(nb_parasite);
    console.log(troupeau.infestation);

    var couleur_troupeau_infestation = troupeau.infestation.length* (-5);
    couleur_troupeau_infestation = (troupeau.infestation.length < 25) ? troupeau.infestation.length* (-5) : -90;
    console.log(couleur_troupeau_infestation);
    $("#troupeau").css('filter', 'hue-rotate('+couleur_troupeau_infestation+'deg)')
    // troupeau augmente infestation si sur pature avec larves infestantes
    // parcelles.forEach(function(parcelle){
    //   if(parcelle.id == pature_avec_troupeau && parcelle.strongles.length > 0)
    //   {
    //     parcelle.strongles.forEach(function(strongle)
    //     {
    //       if(strongle.etat = infestant)
    //       {
    //         troupeau.sinfeste(1);
    //       }
    //     });
    //   }
    // })

    // troupeau infeste pature

    // pature évolution des larves


  }
  if(e.which == 37 && $('#curseur').position().left > 0)
  {
    //recul de la Date
    date.setDate(date.getDate()-pas_de_temps);
    $('#date').html(date.toLocaleDateString('fr-FR', options_date));
    // recul du curseur
    var position_curseur = $('#curseur').css('left');
    var curseur = $('#curseur').css('left',parseInt(position_curseur)-parseInt(saut_curseur));

    troupeau.evolutionStrongles(-pas_de_temps);
    troupeau_evolution_excretion();
  }
  })

});
