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
      $("#"+troupeau).css('box-shadow', '6px 6px 6px red');
    }
  })
});

//################################ AJOUT LIGNE PARCELLE ########################
$("#ajout").on('click',function() {
  var nb_lignes = $(".categories-contenu-parcelles").children().length;
  var premiere_ligne = $(".categories-contenu-ligne").first().html();
  console.log(premiere_ligne);
  var nouvelle_ligne = premiere_ligne.replace("nom_0", "nom_"+nb_lignes).replace("taille_0", "taille_"+nb_lignes).replace("parcelle-histoire_0", "parcelle-histoire_"+nb_lignes);
  console.log(nouvelle_ligne);
  $(".categories-contenu-parcelles").append(nouvelle_ligne);
})
