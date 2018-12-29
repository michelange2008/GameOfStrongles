var GAMEOFSTRONGLE = GAMEOFSTRONGLE || {}

//################################# START ######################################
  $(function() {
    // création de l'objet troupeau sur la base du div #troupeau
    var dates = new Dates(datesJSON.mise_a_l_herbe.date, datesJSON.entre_bergerie.date, datesJSON.duree_paturage, datesJSON.date_courante.date);
    var troupeau = new Troupeau(troupeauJSON.espece, troupeauJSON.taille, troupeauJSON.sensibilite);
    var inf = troupeauJSON.infestation;
    $(inf).children().each(function(val, key){
      console.log(val+" - "+key);
    });

    troupeau.addStrongles(troupeauJSON.infestation.strongle_1);
    console.log(troupeauJSON.infestation.strongle_0);
    troupeau = new Troupeau($('#troupeau').attr('espece'), $('#troupeau').attr('taille'));
    troupeau.sinfeste($('#troupeau').attr('infestation'));


//######################################### FONCTIONS ##############################################################

//############################ DEFINITION DES OBJETS PARCELLE ######################################################
var foncier = [];
$('.pature').each(function(index, pature) {
  // création d'un objet pature
  var id_pature = $(pature).attr('id'); //id de la pature
  patureObj = new Pature($(pature).attr('id'), $(pature).attr('nom'), $(pature).attr('superficie')); //création d'une nouvelle parcelle
  for(var i = 0 ; i <pature.childElementCount; i++){ // on passe en revue tous les enfants de pature
    parcelle_id = "#"+pature.children.item(i).id;
    if($(parcelle_id).attr('class') == "parcelle") // si cet enfant à la classe parcelle
    {
      patureObj.addParcelle(creeParcelleAvecHtml(parcelle_id));
    }
  };
  foncier.push(patureObj); // ajout de cette pature au foncier
});

$('.parcellaire').masonry({
  // options
  itemSelector: '.pature',
  columnWidth: 1
});

//############################ GESTION DU DEPLACEMENT DU TROUPEAU ##################################################
  var $draggable = $('#troupeau').draggabilly({
  });

  $draggable.on( 'dragEnd', function( event, pointer ) {
    $('.parcelle').each(function() { // on passe en revue toutes les parcelles
      $(this).attr('troupeau', false); // on passe à false la variable troupeau de toutes les patures
      $(this).css('border', 'none'); // suppression de la bordure des parcelles sans troupeau
    })
    $('#troupeau').css('visibility', 'collapse'); // on rend invisible le troupeau (pour pouvoir connaitre l'élément qui est en dessous)
    $('.lot').css('visibility', 'collapse'); // et aussi les lots de strongle qui sont sur les parcelles
    var element_avec_troupeau = document.elementFromPoint(pointer.clientX, pointer.clientY); // on identifie l'élément qui est en dessous par la position du pointer

    // On enlève le troupeau de toutes les parcelles
    foncier.forEach(function(pature) {
      pature.parcelles.forEach(function(parcelle) {
        troupeau.sortDeParcelle();
        parcelle.sortTroupeau();
      });
    });
    // Si le troupeau est dans une parcelle on attribue le troupeau à la parcelle et vice versa
    if(element_avec_troupeau.id.split("_")[0] == "parcelle") // le troupeau n'est pas dans une parcelle
    {
      var pature_num = element_avec_troupeau.id.split("_")[1];
      var parcelle_num = element_avec_troupeau.id.split("_")[2];
      parcelle_avec_troupeau = foncier[pature_num].parcelles[parcelle_num];
      $("#troupeau").css('background-image', 'none');
      troupeau.entreDansParcelle(parcelle_avec_troupeau);
      parcelle_avec_troupeau.entreTroupeau(troupeau);
      // On traduit ça dans le html (est-utile ?)
      $(this).attr('lieu', parcelle_avec_troupeau.id); // on attribue au troupeau le nom de la parcelle où il est
      $("#"+parcelle_avec_troupeau.id).attr('troupeau', true); // on passer à true la variable troupeau de la parcelle où est le pointer cad le troupeau
      $("#"+parcelle_avec_troupeau.id).css('border', 'dotted 2px black'); // attribution d'un couleur pour la parcelle avec troupeau
    }
    // Si le troupeau est dans la chevrerie il y a une alerte (et on attribue au troupeau la chevrerie ???)
    else if (element_avec_troupeau.id == "chevrerie") {
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

      // EVOLUTION parcelle #######################################################
      // parcelle évolution des larves
      foncier.forEach(function(pature) {
        pature.parcelles.forEach(function(parcelle) {
          // modification de l'objet parcelle
          parcelle.evolutionStrongles(PAS_DE_TEMPS); //evolution spontanée des strongles de la parcelle
          if(parcelle.troupeau instanceof Troupeau) //Si la parcelle possède un troupeau
          {
            var nb_oeufs = troupeau.infestation.length; // Nombre d'oeufs produits par le troupeau
            parcelle.addStrongles(troupeau.infestation.length); // On additionne ces oeufs à l'objet parcelle
            nouveau_lot_de_strongles(parcelle, decroissance(nb_oeufs));

          }
          parcelle.contaminant = parcelle.getContaminant(pature); // mise à jour du statut contaminant
          // modification de l'html sur la base de l'objet parcelle
          evolution_strongles_parcelle(parcelle);

          parcelle.infestation.forEach(function(strongle, index) { // transcription dans l'état de chaque strongle

            $("#parasite_"+index+"_"+parcelle.id).attr('etat', strongle.etat);

            $("#parasite_"+index+"_"+parcelle.id).children().attr('class', strongle.etat);
          });
          $("#pature_"+parcelle.id).attr('contaminant', parcelle.contaminant);
          $("#valeur_"+parcelle.id).html(Math.round(parcelle.contaminant)+" / "+parcelle.infestation.length);

          elimination_morts_de_la_parcelle(parcelle)
      });
    });
  }
  if(e.which == 37 && $('#curseur').position().left > 0)
  {
    location.reload();
  }
  })

});
