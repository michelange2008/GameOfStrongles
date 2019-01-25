//############### Problème de saisie #######################################
function dialogue(titre,texte, couleur, fonction) {
  $.confirm({
    animation : 'zoom',
      title: titre,
      content: texte,
      type: couleur,
      typeAnimated: true,
      buttons: {
          fermer: function () {
            fonction
          },
          fermer : {
            keys: ['enter', 'esc']
          }
      }
  });
}

//############### Division des parcelles #######################################
function dialogueDiviseParcelle(pature, parcelle) {
  $.confirm({
    animation : 'opacity',
    title: 'Pose des filets',
    content: '' +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    '<label>Combien de parcelle voulez-vous ?</label>' +
    '<input type="text" placeholder="nombre de parcelles" class="nombre form-control" required />' +
    '</div>' +
    '</form>',
    buttons: {
      formSubmit: {
        text: 'Submit',
        btnClass: 'btn-blue',
        action: function () {
          var nombre = parseInt(this.$content.find('.nombre').val());
          if(!nombre || nombre === 0) {
            $.alert("Il faut inscrire un nombre supérieur à zéro");
            return false;
          }
          pature.divisePature(nombre);
          pature.majParcelles();
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
}

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

//############################### ALERTES TROUPEAU #############################
function alerte_troupeau_dehors(){
  $("#troupeau").css('background-image', 'url('+url_svg+'chien.svg)');
  $.alert({
    animation : 'zoom',
    buttons: {
          Ok: function(){
          },
          Ok : {
            keys: ['enter', 'esc']
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
    animation : 'zoom',
    escapeKey: 'Ok',
      buttons: {
          Ok: function(){
          },
          Ok : {
            keys: ['enter', 'esc']
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
    animation : 'zoom',
      title: 'Désolé !',
      content: 'Le troupeau est mort',
      type: 'red',
      typeAnimated: true,
      buttons: {
          fermer: function () {
          },
          fermer : {
            keys: ['enter', 'esc']
          }
      }
  });
}
