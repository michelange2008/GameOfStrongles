// redémarrage en cliquant sur l'icone à droite
$('#epee').on('click', function(){
  // location.reload();
  $("#page-index").toggleClass("masque");
  $("#page-param").toggleClass("masque");
});
$("#retour").on('click', function() {
  $("#page-index").toggleClass("masque");
  $("#page-gos").toggleClass("masque");
})

//############################MODIFICATION PAS DE TEMPS ########################
$("#pas_de_temps").on('click', function() {
  $.confirm({
    title: 'Pas de temps',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Saisissez un nouveau pas de temps</label>' +
    '<input type="text" placeholder="jours" class="name form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
        formSubmit: {
            text: 'Ok',
            btnClass: 'btn-blue',
            action: function () {
                var jours = this.$content.find('.name').val();
                if(!jours){
                    $.alert('merci de saisir une valeur numérique');
                    return false;
                }
                $("#pas_de_temps").html(jours);
                pas_de_temps = parseInt(jours);
            }
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});
});

//################################ CLIQUE SUR BOUTONS #############################
// bascule entre le sommaire et les parametres
$("#param").on('click', function() {
  $("#page-param").toggleClass("masque");
  $("#page-index").toggleClass("masque");
});

$("#sommaire").on('click', function() {
  $("#page-param").toggleClass("masque");
  $("#page-index").toggleClass("masque");
});
//affichage d'une page
$("#demo").on('click', function() {
  effaceLigneParcelles();
  effaceParcelles();
  creerDemo();
  // $("#page-gos").toggleClass("masque");
  // $("#page-index").toggleClass("masque");
  // calculPature();
  // dessinePatures();
  // dallage();
});

$("#start").on('click', function() {
  effaceParcelles();
  // $("#page-gos").toggleClass("masque");
  // $("#page-index").toggleClass("masque");
  calculPature();
  dessinePatures();
  dallage();
})

$("#efface").on('click', function() {
  effaceLigneParcelles();
})

//############# AJOUT LIGNE PARCELLE EN CLIQUANT SUR BOUTON PLUS ###############
var premiere_ligne = "<div class='categories-contenu-ligne'>"
+$(".categories-contenu-ligne").first().html()
+"</div>";

$("#ajout").on('click',function() {
  var nb_lignes = $("#liste_patures").children().length;
  var nouvelle_ligne = premiere_ligne.replace(/_0/g, "_"+nb_lignes);
  $(nouvelle_ligne).appendTo($("#liste_patures"));
  $.each(patures_types, function(clef, objet) {
    var type = '<option value="'+clef+'">'+objet.nom+'</option>';
    $("#pature_histoire_"+nb_lignes).append(type);
  });
  $("#liste_patures div:last-child").children().focus()[0].focus();
})
//################## SUPPRESSION D'UNE LIGNE PARCELLE EN CLIQUANT SUR EFFACE ###
$(".categories-contenu-patures").on('click', '.efface-ligne', function(ligne) {
  var id = ligne.currentTarget.id.split("_")[1];
  console.log(id);
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

//################################ MODIF PARAM #################################
$('.zone_saisie').on('change', function(){
  var id_input = $(this).attr('name'); // on récupère l'id de l'input qui a changé
  // c'est à dire la clef de la valeur qui a changé
  var value = $(this).val(); // la valeur est le nouveau contenu du champ
  $.each(param, function(nom_parametre, parametre) {// mise à jour de l'objet param
    if(nom_parametre == id_input)
    {
      console.log(parametre.valeur+" - "+value);
      parametre.valeur = value;
    }
  })
  modifParam(id_input, value); // on applique la fonction modifParam
  console.log(param);
});
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
     },
     error: function (data) {
    console.log(data.responseText);
    }
  });
}
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
console.log(value);
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

//########################### DIVISER LES PARCELLES ############################
$(".divise").on('click', function(){
  var parcelle = "parcelle_"+$(this).attr('id').split("_")[1]+"_0";
  // console.log(foncier.pature_0);
})

//############################### CHOIX DES ELEMENTS TROUPEAU ##################
$(".image_troupeau").on('click', function(espece){ // choix de l'espece
  modifTroupeau("espece", espece.currentTarget.id);
  troupeau.espece = espece.currentTarget.id;
  $(".image_troupeau").removeClass('image_troupeau-choisi');
  $("#"+espece.currentTarget.id).addClass('image_troupeau-choisi');
  $("#troupeau-image").attr('src', location+"public/svg/"+troupeau.espece+".svg");
});
$("input[name='effectif']").on('change', function(effectif){ // choix de l'effectif
  modifTroupeau("effectif", effectif.currentTarget.value);
  troupeau.effectif = effectif.currentTarget.value;
});
 // choix du niveau d'infestation
$(".feu").on('click', function(infestation){
  var nb_strongles = 0;
  switch (infestation.currentTarget.id) {
	case 'rouge':
		nb_strongles = 10;
		break;
	case 'orange':
		nb_strongles = 5;
		break;
	case 'vert':
		nb_strongles = 0;
		break;
	default:
		alert('Problème');
  }
  $('.feu').removeClass('feu-choisi'); // annule les couleurs
  $('#'+infestation.currentTarget.id).addClass('feu-choisi'); // applique la couleur

  modifTroupeau("infestation",nb_strongles);
    for (var i = 0; i < nb_strongles; i++) {
      strongle = new StrongleIn("strongle_"+i, 1, param.PATHOGEN.valeur);
      troupeau.addStrongles(strongle);
    }
    troupeau.tauxContaminant();
  $("#troupeau_infestation").html(nb_strongles);
});
// fin choix du niveau d'infestation
//################################## CHOIX DES DATES ###########################
$("#slider").bind("valuesChanged", function(e, data){
  dates.mise_a_l_herbe = data.values.min;
  dates.entre_bergerie = data.values.max;
  dates.duree_paturage = Math.round((data.values.max - data.values.min)/86400000);
  dates.date_courante = data.values.min;
  setTimeLine(dates);
});
//################################### AJOUT DES PATURES ########################
// ajout du nom
$(".categories-contenu-patures").on('change', '.pature-nom', function(pature) {

  var id = pature.currentTarget.name.split("_")[2]; // id de la pature
  setPatureNom(id, pature.currentTarget.value);
  var pature_superficie = 'pature_superficie_'+id // creation d'une variable intermédiaire
  $('input[name='+pature_superficie+']').attr('disabled', false).focus(); // activation du champs superficie et focus
});
// Ajout de la superficie
$(".categories-contenu-patures").on('change', '.pature-superficie', function(superficie){
  var id = superficie.currentTarget.name.split("_")[2];
  console.log(foncier.patures);
  
  foncier.patures[parseInt(id)].superficie = superficie.currentTarget.value;
  var pature_histoire = '#pature_histoire_'+id;
  $(pature_histoire).attr('disabled', false).focus();

});
// Ajout de l'histoire sous forme d'un objet patures_types
$(".categories-contenu-patures").on('click', '.pature-histoire', function(histoire){
  var id = histoire.currentTarget.name.split("_")[2];
  setPatureParcelles(id, foncier, histoire.currentTarget.value);
});
