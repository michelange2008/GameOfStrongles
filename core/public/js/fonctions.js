// redémarrage en cliquant sur l'icone à droite
$('#epee').on('click', function(){
  // location.reload();
  $("#page-index").toggleClass("masque");
  $("#page-param").toggleClass("masque");
});

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

//############################## CHOIX DU TROUPEAU #############################
$(".image_troupeau").on('click', function() {
  var troupeau = $(this).attr('id');
  $('.image_troupeau').css('box-shadow', '2px 2px 6px black');
  $('input[type = "radio"]').each(function() {
    if($(this).attr('value') == troupeau)
    {
      $(this).prop('checked', true);
      $("#"+troupeau).css('box-shadow', '6px 6px 6px green');
    }
  })
});
//################################### NIVEAU D'INFESTATON DU TROUPEAU ##########
$('.feu').on('click', function() {
  var id_feu = $(this).attr('id');
  $('.feu').removeClass('feu-choisi');
  $('#'+id_feu).addClass('feu-choisi');
  $('input[name = "infestation_troupeau"]').prop('checked', true);
  $('input[name = "infestation_troupeau"]').attr('value', id_feu);
});
//################################ CLIQUE SUR BOUTONS #############################
// bascule entre le sommaire et les parametres
$("#param").on('click', function(){
  $("#page-param").toggleClass("masque");
  $("#page-index").toggleClass("masque");
});

$("#sommaire").on('click', function(){
  $("#page-param").toggleClass("masque");
  $("#page-index").toggleClass("masque");
});
//affichage d'une page
$("#demo").on('click', function(){
  $.getJSON(url+"demo_troupeau.json", function(resultat){
    Cookies.set('troupeau', JSON.stringify(resultat));
  });
  $.getJSON(url+"demo_dates.json", function(resultat){
    Cookies.set('dates', JSON.stringify(resultat));
  });

  $.getJSON(url+"demo_foncier.json", function(resultat){
    Cookies.set('foncier', JSON.stringify(resultat));
  });

  $('input[name = "action"]').prop('checked', true);
  $('input[name = "action"]').attr('value', 'demo');
  $('input[type = "submit"]').click();
});

$('input[type = "submit"]').on('mouseover', function(){
  $.getJSON(url+"troupeau.json", function(resultat){
    Cookies.set('troupeau', JSON.stringify(resultat));
  });
  $.getJSON(url+"dates.json", function(resultat){
    Cookies.set('dates', JSON.stringify(resultat));
  });

  $.getJSON(url+"foncier.json", function(resultat){
    Cookies.set('foncier', JSON.stringify(resultat));
  });

  $('input[name = "action"]').prop('checked', true);
  $('input[name = "action"]').attr('value', 'action');
});
//################################ AJOUT LIGNE PARCELLE ########################
$("#ajout").on('click',function() {
  var nb_lignes = $(".categories-contenu-parcelles").children().length;
  var premiere_ligne = "<div class='categories-contenu-ligne'>"
    +$(".categories-contenu-ligne").first().html()
    +"</div>";

  var nouvelle_ligne = premiere_ligne.replace(/_0/g, "_"+nb_lignes);
  $(".categories-contenu-parcelles").append(nouvelle_ligne);
})
//############################# SAISON DE PATURAGE #############################
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
$(".image_troupeau").on('click', function(espece){
  modifTroupeau("espece", espece.currentTarget.id);
  troupeau.espece = espece.currentTarget.id;
  console.log(troupeau);
});
$("input[name='effectif']").on('change', function(effectif){
  modifTroupeau("taille", effectif.currentTarget.value);
  troupeau.taille = effectif.currentTarget.value;
  console.log(troupeau);
});
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
  modifTroupeau("infestation",nb_strongles);
  for (var i = 0; i < nb_strongles; i++) {
    strongle = new StrongleIn("strongle_"+i, 1, param.PATHOGEN.valeur);
    troupeau.addStrongles(strongle);
  }

  troupeau.tauxContaminant();
console.log(troupeau);
});

//################################## CHOIX DES DATES ###########################
$("#slider").bind("valuesChanged", function(e, data){
  dates.mise_a_l_herbe = data.values.min;
  dates.entre_bergerie = data.values.max;
  dates.duree_paturage = Math.round((data.values.max - data.values.min)/86400000);
  dates.date_courante = data.values.min;
  console.log(dates);

});
