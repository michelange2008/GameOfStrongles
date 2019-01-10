var GAMEOFSTRONGLE = GAMEOFSTRONGLE || {}

//################################# START ######################################
  $(function() {
    // mise à zéro du contenu des champs de patures et remplissage de la liste déroulante
    $('.pature-nom').val('');
    $('.pature-superficie').val('');
    $.each(patures_types, function(clef, objet) {
      var type = '<option value="'+clef+'">'+objet.nom+'</option>';
      $("#pature_histoire_0").append(type);
    });
    $("#pas_de_temps").html(param.PAS_DE_TEMPS.valeur);

    //---------------------------------------------------------------------------------
    troupeau = new Troupeau();
    troupeau.setStrongles(5);
    dates = new Dates();
    foncier = new Foncier();
    liste_mois = [];
    setTimeLine(dates);
    dallage();
    //------------------------------------------------------------------------------
      $("#troupeau-image").attr('src', location+"public/svg/"+troupeau.espece+".svg"); // on attribue au troupeau l'image par défaut
      $("#"+troupeau.espece).addClass('image_troupeau-choisi');
      $('input[name=effectif]').val(troupeau.effectif);
      $("#orange").addClass("feu-choisi");
      $("#troupeau_infestation").html(troupeau.infestation.length);

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
    for(pature in foncier.patures) {
      for(parcelle in pature.parcelles) {
        troupeau.sortDeParcelle();
        parcelle.sortTroupeau();
      };
    };
    // Si le troupeau est dans une parcelle on attribue le troupeau à la parcelle et vice versa
    if(element_avec_troupeau.id.split("_")[0] == "parcelle") // le troupeau est dans une parcelle
    {
      var pature_num = element_avec_troupeau.id.split("_")[1];
      var parcelle_num = element_avec_troupeau.id.split("_")[2];
      parcelle_avec_troupeau = foncier.patures[pature_num].parcelles[parcelle_num];
      $("#troupeau").css('background-image', 'none');
      troupeau.entreDansParcelle(parcelle_avec_troupeau);
      parcelle_avec_troupeau.entreTroupeau(troupeau);
      // On traduit ça dans le html (est-utile ?)
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

//################################ AVANCEE D'UN PAS DE TEMPS DONNE ################################################
  var largeur_time_line = $('#temps').innerWidth() ; //largeur en pixel de la time-line
  $(document).on('keydown', function(e) {
    if(e.which == 39 && $('#curseur').position().left < $('.time-line').width()-$('.cursor').width())
    {
      var saut_curseur = param.PAS_DE_TEMPS.valeur * largeur_time_line / dates.duree_paturage;
      // avancée de la Date
      dates.avance(param.PAS_DE_TEMPS.valeur);
      $('#date').html(dates.date_courante.toLocaleDateString('fr-FR', options_date));
      // avancée du curseur
      var position_curseur = $('#curseur').css('left');
      var curseur = $('#curseur').css('left',parseInt(position_curseur)+parseInt(saut_curseur));

      // EVOLUTION TROUPEAU #####################################################
      // évolution interne des strongles
      console.log(troupeau);
      troupeau.evolutionStrongles(param.PAS_DE_TEMPS.valeur);
      // transformation éventuelle du troupeau en excréteur
      troupeau_evolution_excretion(troupeau);
      console.log(troupeau);
      if(troupeau.parcelle !== null) {
        // nouvelle infestation du troupeau à partir de la parcelle
        troupeau.sinfeste(troupeau.parcelle.contaminant, param.PAS_DE_TEMPS.valeur); // modification du troupeau
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
          parcelle.evolutionStrongles(param.PAS_DE_TEMPS.valeur); //evolution spontanée des strongles de la parcelle
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
