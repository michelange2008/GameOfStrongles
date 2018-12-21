var GAMEOFSTRONGLE = GAMEOFSTRONGLE || {}

//################################# START ######################################
  $(function() {
    // création de l'objet troupeau sur la base du div #troupeau
    troupeau = new Troupeau($('#troupeau').attr('espece'), $('#troupeau').attr('taille'));
    troupeau.sinfeste($('#troupeau').attr('infestation'));


//######################################### FONCTIONS ##############################################################

//############################ DEFINITION DES OBJETS PARCELLE ######################################################
var exploitation = [];
$('.pature').each(function(index, pature) {
  // création d'une nouvelle parcelle
  var num_parcelle = $(pature).attr('id').split('_')[1]; //numéro de la parcelle
  parcelle = new Parcelle(num_parcelle, $(pature).attr('nom'), $(pature).attr('superficie')); //création d'une nouvelle parcelle
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
      $(this).css('border', 'none'); // suppression de la bordure des parcelles sans troupeau
    })
    $('#troupeau').css('visibility', 'collapse'); // on rend invisible le troupeau (pour pouvoir connaitre l'élément qui est en dessous)
    $('.lot').css('visibility', 'collapse'); // et aussi les lots de strongle qui sont sur les parcelles
    var parcelle_avec_troupeau_id = document.elementFromPoint(pointer.clientX, pointer.clientY).id; // on identifie l'élément qui est en dessous par la position du pointer
    var parcelle_avec_troupeau = exploitation[parcelle_avec_troupeau_id.split("_")[1]]; // on définit la parcelle qui a le troupeau
    // On enlève le troupeau de toutes les parcelles
    exploitation.forEach(function(parcelle) {
      troupeau.sortDeParcelle();
      parcelle.sortTroupeau();
    })
    // Si le troupeau est dans une parcelle on attribue le troupeau à la parcelle et vice versa
    if(parcelle_avec_troupeau instanceof Parcelle) // le troupeau n'est pas dans une parcelle
    {
      $("#troupeau").css('background-image', 'none');
      troupeau.entreDansParcelle(parcelle_avec_troupeau);
      parcelle_avec_troupeau.entreTroupeau(troupeau);
      // On traduit ça dans le html (est-utile ?)
      $(this).attr('lieu', parcelle_avec_troupeau_id); // on attribue au troupeau le nom de la parcelle où il est
      $("#"+parcelle_avec_troupeau_id).attr('troupeau', true); // on passer à true la variable troupeau de la parcelle où est le pointer cad le troupeau
      $("#"+parcelle_avec_troupeau_id).css('border', 'dotted 2px black'); // attribution d'un couleur pour la parcelle avec troupeau
    }
    // Si le troupeau est dans la chevrerie il y a une alerte (et on attribue au troupeau la chevrerie ???)
    else if (parcelle_avec_troupeau_id == "chevrerie") {
      troupeau_chevrerie();
    }
    // Si le troupeau n'est pas dans une parcelle, il y a une alerte
    else {
      troupeau_dehors()
    }
    $('.lot').css('visibility', 'visible'); // et on réaffiche les strongles
    $('#troupeau').css('visibility', 'visible'); // on remet le troupeau visible
  });

//################################ AVANCEE D'UN PAS DE TEMPS DONNEE################################################
  var duree_paturage = $('#temps').attr('paturage');
  var largeur_time_line = $('#temps').innerWidth() ; //largeur en pixel de la time-line
  var date = new Date($('#date').attr('data'));
  $(document).on('keydown', function(e) {
    if(e.which == 39 && $('#curseur').position().left < $('.time-line').width()-$('.cursor').width())
    {
      var saut_curseur = PAS_DE_TEMPS * largeur_time_line / duree_paturage;
      // avancée de la Date
      date.setDate(date.getDate()+PAS_DE_TEMPS);
      $('#date').html(date.toLocaleDateString('fr-FR', options_date));
      // avancée du curseur
      var position_curseur = $('#curseur').css('left');
      var curseur = $('#curseur').css('left',parseInt(position_curseur)+parseInt(saut_curseur));

      // EVOLUTION TROUPEAU #####################################################
      // évolution interne des strongles
      troupeau.evolutionStrongles(PAS_DE_TEMPS);
      // transformation éventuelle du troupeau en excréteur
      troupeau_evolution_excretion(troupeau);

      if(troupeau.parcelle !== null) {
        // nouvelle infestation du troupeau à partir de la parcelle
        troupeau.sinfeste(troupeau.parcelle.contaminant, PAS_DE_TEMPS); // modification du troupeau
        $('#troupeau_infestation').html(troupeau.infestation.length); // inscription au compteur
      }
      // modification de l'aspect du troupeau
      troupeau_evolution_aspect(troupeau);
      // suppression des strongles morts du troupeau
      elimination_morts(troupeau);

      // EVOLUTION PATURE #######################################################
      // pature évolution des larves
      exploitation.forEach(function(parcelle) {
        parcelle.evolutionStrongles(PAS_DE_TEMPS); //evolution de la parcelle

        if(parcelle.troupeau instanceof Troupeau) //Si la parcelle possède un troupeau
        {
          var nb_oeufs = troupeau.infestation.length; // Nombre d'oeufs produits par le troupeau
          parcelle.addStrongles(troupeau.infestation.length); // On additionne ces oeufs à l'objet parcelle
            nouveau_lot_de_strongles(parcelle, decroissance(nb_oeufs));

        }

        parcelle.contaminant = parcelle.getContaminant(); // mise à jour du statut contaminant

        evolution_strongles_parcelle(parcelle);

        parcelle.infestation.forEach(function(strongle, index) { // transcription dans l'état de chaque strongle

          $("#parasite_"+index+"_"+parcelle.id).attr('etat', strongle.etat);

          $("#parasite_"+index+"_"+parcelle.id).children().attr('class', strongle.etat);
        });
        $("#pature_"+parcelle.id).attr('contaminant', parcelle.contaminant);
        $("#valeur_"+parcelle.id).html(Math.round(parcelle.contaminant)+" / "+parcelle.infestation.length);

        elimination_morts_de_la_parcelle(parcelle)
      })
  }
  if(e.which == 37 && $('#curseur').position().left > 0)
  {
    location.reload();
  }
  })

});
