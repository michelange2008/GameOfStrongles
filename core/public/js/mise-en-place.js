//################################ NAVIGATION #############################
// bascule du sommaire aux parametres
$("#param").on('click', function() {
  afficheParam()
});
// passage de la page param à la page index
$('#epee').on('click', function(){
  afficheIndex();
});
// idem mais avec un autre bouton
$("#sommaire").on('click', function() {
  afficheIndex();
});
// passage de la page gos à la page index
$("#retour").on('click', function() {
  afficheIndex();
});
// passage de la page gos au planning
$("#planning").on('click', function() {
  affichePlanning();
  dessinePlanning(planning);
});
// passage de la page planning à la page vers_gos
$("#vers_gos").on('click', function() {
  afficheGos();
});
// fonctions de démarrage
function accueil() {
  afficheIndex();
}

function afficheTout() {
  $("#page-index").show();
  $("#page-param").show();
  $("#page-gos").show();
  $('#page-planning').show();
  $('html').animate({scrollTop:0}, 'slow');
}

function afficheIndex() {
  $("#page-gos").hide();
  $("#page-param").hide();
  $('#page-planning').hide();
  $("#page-index").show();
  $('html').animate({scrollTop:0}, 'slow');
}

function afficheGos() {
  $("#page-index").hide();
  $("#page-param").hide();
  $('#page-planning').addClass("masque");
  $("#page-gos").show();
  $('html').animate({scrollTop:0}, 'slow');
}

function afficheParam() {
  $("#page-param").show();
  $("#page-index").hide();
  $("#page-gos").hide();
  $('#page-planning').hide();
  $('html').animate({scrollTop:0}, 'slow');
}

function affichePlanning() {
  $("#page-param").hide();
  $("#page-index").hide();
  $("#page-gos").hide();
  $('#page-planning').removeClass("masque");
  // $('html').animate({scrollTop:0}, 'slow');
}

function verifieSaisie() {
  var saisie_ok = true;
  // tester TROUPEAU
  var troupeau_ok = true;
  troupeau_ok = (troupeau.espece == undefined) ? false : true;
  troupeau_ok = (troupeau.effectif === "") ? false : true;
  troupeau_ok = (troupeau.effectif == 0) ? false : true;
  if(!troupeau_ok) {
    dialogue("Attention !", "Le troupeau n'est pas correctement défini", "red", $("input[name='effectif']").val('').focus());
    return false;
  }
  // tester foncier
  saisie_ok = verifieFoncier();

  return saisie_ok;
}

function verifieFoncier() {
  var foncier_ok = true;
  // pas de ligne remplie:
  if(foncier.patures.length == 0) {
    dialogue("Attention !", "Il faut définir le parcellaire", "red", $("input[name='pature_nom_0']").focus());
    foncier_ok = false;
  }
  else {
    foncier.patures.forEach( function(pature, index) {
      if(pature.superficie == undefined) {
        dialogue("Attention !", "Cette pature n'a pas de superficie", "red", $("input[name='pature_superficie_"+index+"']").focus());
        foncier_ok = false;
      }
      if(pature.histoire == undefined) {
        dialogue("Attention !", "La nature de ce pâturage n'est pas définie", "red", $("input[name='pature_histoire_"+index+"']").focus());
        foncier_ok = false;
      }
    });
  }
  return foncier_ok;
}

function start() {
  if(verifieSaisie()) {// verifie les donnees
    effaceParcelles(); // efface le dessin des parcelles
    afficheGos(); // affiche la page du dessin
    calculPature(); // calcul les donnees des patures (taille, ...)
    dessinePatures(); // dessine les patures
    ecritPaturesDansMoniteur(); // met les donnees dans le panneau de gauche
    dallage(); // fait le dallage
  }
}

function demo() {
  effaceLigneParcelles();
  creerDemo();
  start();
}

//affichage d'une page
$("#demo").on('click', function() {
  demo();
});

$("#start").on('click', function() {
  start();
})

$("#efface").on('click', function() {
  effaceLigneParcelles();
})
//################################ MODIF PARAM #################################
// fonction ajax pour modifier le fichier parametres.json
function modifParam(id_input, value) {
  url = location+"modification"; // définition de l'url pour la requete AJAX

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
    }
  });
  // fichier json à transmettre
  var json = {
    "nom" : id_input,
    "valeur" : value
  };
  $.ajax({
    type:'POST',
    url:url,
    dataType: "json",
    data: json,

    success:function(data){
      $('.helmet').fadeIn(0);
      $('.helmet').fadeOut(2000);
      Cookies.set('parametres', '');
    },
    error: function (data) {
      console.log(data.responseText);
    }
  });
}
// action quand modification d'une valeur des champs
$('.zone_saisie').on('change', function(){
  var id_input = $(this).attr('name'); // on récupère l'id de l'input qui a changé
  // c'est à dire la clef de la valeur qui a changé
  var value = $(this).val(); // la valeur est le nouveau contenu du champ
  $.each(param, function(nom_parametre, parametre) {// mise à jour de l'objet param
  if(nom_parametre == id_input)
  {
    parametre.valeur = value;
  }
})
modifParam(id_input, value); // on applique la fonction modifParam
});

//##############################################################################
//#                      GESTION DE LA PAGE INDEX                              #
//##############################################################################

//############# AJOUT LIGNE PARCELLE EN CLIQUANT SUR BOUTON PLUS ###############
// récupère le html de la première ligne
var premiere_ligne = "<div class='categories-contenu-ligne'>"
+$(".categories-contenu-ligne").first().html()
+"</div>";

$("#ajout").on('click',function() {
  var nb_lignes = $("#liste_patures").children().length; // Nombre de lignes existantes
  var nouvelle_ligne = premiere_ligne.replace(/_0/g, "_"+nb_lignes); //création d'une nouvelle ligne en remplaçant l'indice
  nouvelleLigne(nb_lignes);
  $("input[name = 'pature_nom_"+nb_lignes+"']").focus();
})
//################## SUPPRESSION D'UNE LIGNE PARCELLE EN CLIQUANT SUR EFFACE ###
$(".categories-contenu-patures").on('click', '.efface-ligne', function(ligne) {
  var id = ligne.currentTarget.id.split("_")[1];
  effaceUneLigne(id);
})

//############### SAISON DE PATURAGE CREATION DU SLIDER ########################
var annee = new Date().getFullYear();
var months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Août", "Sept", "Oct", "Nov", "Dec"];
$("#slider").dateRangeSlider({
  bounds: {min: new Date(annee, 0, 1), max: new Date(annee, 11, 31, 12, 59, 59)},
  defaultValues: {min: new Date(annee, 2, 10), max: new Date(annee, 9, 22)},
scales: [{
  first: function(value){ return value; },
  end: function(value) {return value; },
  next: function(value){
    var next = new Date(value);
    return new Date(next.setMonth(value.getMonth() + 1));
  },
  label: function(value){
    return months[value.getMonth()];
  },
  format: function(tickContainer, tickStart, tickEnd){
    tickContainer.addClass("myCustomClass");
  }
}]
});

$("#slider").bind("valuesChanged", function(e, data){
  $("#mise_a_l_herbe").val(new Date(data.values.min).toISOString().split('T')[0]);
  $("#entre_bergerie").val(new Date(data.values.max).toISOString().split('T')[0]);
});

//################################## CHOIX DES DATES ###########################
$("#slider").bind("valuesChanged", function(e, data){
  dates.mise_a_l_herbe = data.values.min;
  dates.entre_bergerie = data.values.max;
  dates.duree_paturage = Math.round((data.values.max - data.values.min)/86400000);
  dates.date_courante = data.values.min;
  setTimeLine(dates);
});
//############################### CHOIX DES ELEMENTS TROUPEAU ##################
// Modification du json troupeau
function modifTroupeau(id_input, value) {
  url = location+"troupeau"; // définition de l'url pour la requete AJAX

  $.ajaxSetup({
     headers: {
         'X-CSRF-TOKEN': $('input[name="_token"]').attr('value')
     }
 });
 // fichier json à transmettre
 var json = {
   "nom" : id_input,
   "valeur" : value
 };
  $.ajax({
     type:'POST',
     url:url,
     dataType: "json",
     data: json,

     success:function(data){
       $('.helmet').fadeIn(0);
       $('.helmet').fadeOut(2000);
     },
     error: function (data) {
    console.log(data.responseText);
    }
  });
}
// Choix de l'espece
$(".image_troupeau").on('click', function(espece){ // choix de l'espece
  modifTroupeau("espece", espece.currentTarget.id);
  troupeau.espece = espece.currentTarget.id;
  troupeau.maj_aspect_troupeau();
  $(".image_troupeau").removeClass('image_troupeau-choisi');
  $("#"+espece.currentTarget.id).addClass('image_troupeau-choisi');
  $("input[name='effectif']").trigger('mouseover').focus();

  // $("#troupeau-image").attr('src', location+"public/svg/"+troupeau.espece+".svg");
});
// Choix de l'effectif
$("input[name='effectif']").on('change', function(effectif){ // choix de l'effectif
  modifTroupeau("effectif", effectif.currentTarget.value);
  troupeau.effectif = effectif.currentTarget.value;

  $(".categories-infestation").trigger('mouseover').css('border', 'solid white');
});
 // choix du niveau d'infestation
$(".feu").on('click', function(infestation){
  var nb_strongles = 0;
  switch (infestation.currentTarget.id) {
	case 'élevé':
		nb_strongles = 10;
		break;
	case 'moyen':
		nb_strongles = 5;
		break;
	case 'faible':
		nb_strongles = 0;
		break;
	default:
		alert('Problème');
  }
  $(".categories-infestation").css('border', 'none');
  $('.feu').removeClass('feu-choisi'); // annule les couleurs
  $('#'+infestation.currentTarget.id).addClass('feu-choisi'); // applique la couleur

  modifTroupeau("infestation",nb_strongles);
  troupeau.setStrongles(nb_strongles);
  troupeau.setContaminant();
  troupeau.maj_moniteur();
});
// fin choix du niveau d'infestation
//################################### AJOUT DES PATURES ########################
// ajout du nom
$(".categories-contenu-patures").on('change', '.pature-nom', function(pature) {
  var id = pature.currentTarget.name.split("_")[2]; // id de la pature
  $("input[name = 'pature_nom_"+id+"']").hideBalloon();
  setPatureNom(id, pature.currentTarget.value);
  var pature_superficie = 'pature_superficie_'+id // creation d'une variable intermédiaire
  $('input[name='+pature_superficie+']').attr('disabled', false).focus(); // activation du champs superficie et focus
});
// Ajout de la superficie
$(".categories-contenu-patures").on('change', '.pature-superficie', function(superficie){
  console.log(superficie.currentTarget.value);
  var id = superficie.currentTarget.name.split("_")[2];
  foncier.patures[parseInt(id)].superficie = superficie.currentTarget.value;
  var pature_histoire = '#pature_histoire_'+id;
  $(pature_histoire).attr('disabled', false).focus();
});
// Ajout de l'histoire sous forme d'un objet patures_types
$(".categories-contenu-patures").on('click change', '.pature-histoire', function(histoire){
  var id = histoire.currentTarget.name.split("_")[2];
  if(foncier.patures[id] == undefined) { // cas où le nom du paturage n'a pas été renseigné
    $("input[name = 'pature_nom_"+id+"']").showBalloon({html:true, contents: "<h5>il faut d'abord donner un nom au pâturage</h5>"});
    $("input[name = 'pature_nom_"+id+"']").focus();
  }
  else {
    setPatureParcelles(id, histoire.currentTarget.value);
  }
});

//########################### DIVISER LES PARCELLES ############################
$("#foncier").on('click', '.divise', function(element){
  var tab_element = element.currentTarget.id.split("_");
  tab_element.shift();
  var parcelle_id = tab_element.join("_");
  num_pature = tab_element[1];
  var pature = foncier.patures[num_pature];
  pature.parcelles.forEach(function(parcelle, clef) {
    if(parcelle.id == parcelle_id) {
      // Fonction située dans dialogues.js et qui renvoie le résultat dans pature.js pour modif objet pature
      dialogueDiviseParcelle(pature, parcelle);
    }
  });
})
