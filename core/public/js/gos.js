var GAMEOFSTRONGLE = GAMEOFSTRONGLE || {}

//################################# START ######################################
  $(function() {
    // ajout d'une ligne de saisie pour la pature
    nouvelleLigne(0);
    $("#pas_de_temps").html(param.PAS_DE_TEMPS.valeur);

    // création des objets de base ---------------------------------------------
    troupeau = new Troupeau();
    // troupeau.setStrongles(5);
    dates = new Dates();
    foncier = new Foncier();
    chevrerie = new Batiment("chevrerie");
    troupeau.entreDansParcelle(chevrerie);

    setTimeLine(dates);
    dallage(); // fait un dallage même sans rien pour eviter les erreurs si on le Supprime
    accueil();
    $("#"+troupeau.espece).addClass('image_troupeau-choisi');
    $('input[name=effectif]').val(troupeau.effectif);
    $("#orange").addClass("feu-choisi");
    troupeau.maj_aspect_troupeau();
    troupeau.maj_moniteur();

    // demo();
    foncier.setListeParcelles();
    planning = "";


//############################ GESTION DU DEPLACEMENT DU TROUPEAU ##################################################
  var $draggable = $('#troupeau').draggabilly({
  });

  $draggable.on( 'dragEnd', function( event, pointer ) {
    $('#troupeau').css('visibility', 'collapse'); // on rend invisible le troupeau (pour pouvoir connaitre l'élément qui est en dessous)
    $('.lot').css('visibility', 'collapse'); // et aussi les lots de strongle qui sont sur les parcelles
    var element_avec_troupeau = document.elementFromPoint(pointer.clientX, pointer.clientY); // on identifie l'élément qui est en dessous par la position du pointer
    // On enlève le troupeau de toutes les parcelles
    foncier.patures.forEach(function(pature, clef){
      pature.parcelles.forEach(function(parcelle, index) {
        parcelle.sortTroupeau();
      });
    });
    // Si le troupeau est dans une parcelle on attribue le troupeau à la parcelle et vice versa
    if(element_avec_troupeau.id.split("_")[0] == "parcelle") // le troupeau est dans une parcelle
    {
      var pature_num = element_avec_troupeau.id.split("_")[1];
      var parcelle_num = element_avec_troupeau.id.split("_")[2];
      parcelle_avec_troupeau = foncier.patures[pature_num].parcelles[parcelle_num];
      troupeau.sortDeParcelle();
      troupeau.entreDansParcelle(parcelle_avec_troupeau);
      parcelle_avec_troupeau.entreTroupeau(troupeau);
    }
    // Si le troupeau est dans la chevrerie il y a une alerte (et on attribue au troupeau la chevrerie ???)
    else if (element_avec_troupeau.id == "chevrerie") {
      if(troupeau.parcelle != "chevrerie") {
        alerte_troupeau_chevrerie();
        troupeau.parcelle = "chevrerie";
      }
    }
    // Si le troupeau n'est pas dans une parcelle, il y a une alerte
    else {
      alerte_troupeau_dehors();
      troupeau.parcelle = "dehors";
    }
    $('.lot').css('visibility', 'visible'); // et on réaffiche les strongles
    $('#troupeau').css('visibility', 'visible'); // on remet le troupeau visible
  });

//################################ AVANCEE D'UN PAS DE TEMPS DONNE ################################################
  var largeur_time_line = $('#temps').innerWidth() ; //largeur en pixel de la time-line
  $(document).on('keydown', function(e) {
    if(e.which == 39 && $('#curseur').position().left < $('.time-line').width()-$('.cursor').width())
    {
      // EVOLUTION DE LA TIME LINE ET DE L'OBJET DATE - MAJ DU MONITEUR DATE
      var saut_curseur = param.PAS_DE_TEMPS.valeur * largeur_time_line / dates.duree_paturage;
      // avancée de la Date
      dates.avance(param.PAS_DE_TEMPS.valeur);
      // maj du moniteur
      $('#date').html(dates.date_courante.toLocaleDateString('fr-FR', options_date)+'('+dates.date_courante.getWeek()+')');
      // avancée du curseur
      var position_curseur = $('#curseur').css('left');
      var curseur = $('#curseur').css('left',parseInt(position_curseur)+parseInt(saut_curseur));

      // EVOLUTION TROUPEAU #####################################################
      // évolution interne des strongles
      troupeau.evolutionStrongles(param.PAS_DE_TEMPS.valeur);
      // transformation éventuelle du troupeau en excréteur
      troupeau.setContaminant();

      if(troupeau.parcelle != null) {
        // nouvelle infestation du troupeau à partir de la parcelle
        troupeau.sinfeste(troupeau.parcelle.contaminant * param.PAS_DE_TEMPS.valeur);
      }
      // Evolution de l'indice de sante du troupeau
      troupeau.evolutionSante();
      // modification de l'aspect du troupeau
      troupeau.maj_aspect_troupeau();
      troupeau.maj_moniteur() // inscription au compteur
      // suppression des strongles morts du troupeau
      troupeau.elimination_morts();

      // EVOLUTION parcelle #######################################################
      // parcelle évolution des larves
      foncier.patures.forEach(function(pature, clef) {
        pature.parcelles.forEach(function(parcelle) {
          // OBJET: modification de l'objet parcelle
          parcelle.evolutionStrongles(param.PAS_DE_TEMPS.valeur); //evolution spontanée des strongles de la parcelle

          parcelle.infestationParTroupeau(troupeau); // la parcelle se contamine avec le troupeau
          parcelle.contaminant = parcelle.getContaminant(pature); // mise à jour du statut contaminant

          // parcelle.addJoursPatures(dates.date_courante);

          // HTML: mise à jour de l'html sur la base de l'objet parcelle
          parcelle.majParcelle();
          // mise à jour de l'affichage du moniteur
          majMoniteurPatures();
      });
    });
  }
  if(e.which == 37 && $('#curseur').position().left > 0)
  {
    location.reload();
  }
  })

});
