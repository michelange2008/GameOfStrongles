var GAMEOFSTRONGLE = GAMEOFSTRONGLE || {}


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

//############################ DEFINITION DES OBJETS PARCELLE ######################################################
var exploitation = [];
$('.pature').each(function(index, pature) {
  // création d'une nouvelle parcelle
  var num_parcelle = $(pature).attr('id').split('_')[1]; //numéro de la parcelle
  parcelle = new Parcelle(num_parcelle, $(pature).attr('nom')); //création d'une nouvelle parcelle
  parcelle.contaminant = parseInt($(pature).attr('contaminant'));
  $('.strongleOut_'+num_parcelle).each(function(index, valeur) { // recherche des strongles présents sur cette parcelle
    strongle = new StrongleOut($(valeur).attr('age'));
    strongle.etat = $(valeur).attr('etat');
    strongle.pathogen = parseInt($(valeur).attr('pathogen'));
    parcelle.infestation.push(strongle); // association de ces strongles à la parcelle
  })
  exploitation.push(parcelle); // association de cette parcelle à l'exploitation
})
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
      troupeau_dehors()
    }
    else {
      exploitation.forEach(function(parcelle) {
        if(parcelle.id == parcelle_troupeau.split("_")[1])
        {
          troupeau.entreDansParcelle(parcelle);
          parcelle.entreTroupeau(troupeau);
        }
      })
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
    var pature_avec_troupeau = troupeau.parcelle;

    // EVOLUTION TROUPEAU #####################################################
    // évolution interne des strongles
    troupeau.evolutionStrongles(pas_de_temps);
    // transformation éventuelle du troupeau en excréteur
    troupeau_evolution_excretion();

    if(troupeau.parcelle !== null) {
      // nouvelle infestation du troupeau à partir de la parcelle
      troupeau.sinfeste(troupeau.parcelle.contaminant); // modification du troupeau
      $('#troupeau_infestation').html(troupeau.infestation.length); // inscription au compteur
    }
    // modification de l'aspect du troupeau
    troupeau_evolution_aspect(troupeau);
    // suppression des strongles morts du troupeau
    elimination_morts(troupeau);
    // EVOLUTION PATURE #######################################################
    // pature évolution des larves
    exploitation.forEach(function(parcelle) {
      parcelle.evolutionStrongles(pas_de_temps); //evolution de la parcelle
      parcelle.contaminant = parcelle.getContaminant(); // mise à jour du statut contaminant
      elimination_morts(parcelle)
      parcelle.infestation.forEach(function(strongle, index) { // transcription dans l'état de chaque strongle
        $("#parasite_"+index+"_"+parcelle.id).children().attr('class', strongle.etat);
      })
      $("#pature_"+parcelle.id).attr('contaminant', parcelle.contaminant);
      $("#valeur_"+parcelle.id).html(parcelle.contaminant+" / "+parcelle.infestation.length);

    })

    // troupeau infeste pature


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
