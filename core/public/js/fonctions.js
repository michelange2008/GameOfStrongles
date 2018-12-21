// redémarrage en cliquant sur l'icone à droite
$('#epee').on('click', function(){
  location.reload();
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
//################################ CLIQUE SUR DEMO #############################
$("#demo").on('click', function(){
  $('input[name = "action"]').prop('checked', true);
  $('input[name = "action"]').attr('value', 'demo');
  $('input[type = "submit"]').click();
});
$("#param").on('click', function(){
  $('input[name = "action"]').prop('checked', true);
  $('input[name = "action"]').attr('value', 'param');
  $('input[type = "submit"]').click();
});
$('input[type = "submit"]').on('mouseover', function(){
  $('input[name = "action"]').prop('checked', true);
  $('input[name = "action"]').attr('value', 'action');
});
//################################ AJOUT LIGNE PARCELLE ########################
$("#ajout").on('click',function() {
  var nb_lignes = $(".categories-contenu-parcelles").children().length;
  console.log($(".categories-contenu-parcelles").first().html());
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
  modifParam(id_input, value); // on applique la fonction modifParam
});
function modifParam(id_input, value) {
  url = location+"/modification"; // définition de l'url pour la requete AJAX

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
console.log(json);
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
    console.log(data);
    }
  });
}
