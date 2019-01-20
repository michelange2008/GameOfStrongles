// Construit la timeline en fonction de la valeur des dates
function setTimeLine(dates) {
  var mois_mise_a_l_herbe = dates.mise_a_l_herbe.getMonth();
  var mois_entree_bergerie = dates.entre_bergerie.getMonth();
  // établit la liste des mois ainsi que leur durée en pourcentage
  var duree_mois = 0;
  liste_mois = [];
  for (var i = mois_mise_a_l_herbe; i < mois_entree_bergerie + 1; i++) {
    if(i == mois_mise_a_l_herbe) {
      duree_mois = Math.round((durees_des_mois[i][0] - dates.mise_a_l_herbe.getDate()) * 100 / dates.duree_paturage);
    }
    else if (i == mois_entree_bergerie) {
      duree_mois = Math.round(dates.entre_bergerie.getDate() * 100 / dates.duree_paturage);
    }
    else {
      duree_mois = Math.round(durees_des_mois[i][0] * 100 / dates.duree_paturage);
    }
    var nom_mois = durees_des_mois[i][1]
    liste_mois.push([i,[nom_mois, duree_mois]]);
  }
  // applique cette liste à la page
  $("#temps-mois").html('');
  var time_line = "";
  $("#date").html(dates.mise_a_l_herbe.toLocaleDateString());
  for(var i = 0; i < liste_mois.length; i++){
    var nom_mois = liste_mois[i][1][0];
    var duree_mois = liste_mois[i][1][1];
    time_line = '<div id="month" class="mois" style="width:'+duree_mois+'%">'+nom_mois+'</div>';
    $("#temps-mois").append(time_line);
  }
}

// Ajoute la liste déroulante de parcelles types
function ajoutPaturesTypes(id_pature, type_pature){
  $.each(patures_types, function(clef, objet) {
    if(type_pature == objet.id){
    var type = '<option value="'+clef+'" selected="selected">'+objet.nom+'</option>';
  } else {
    var type = '<option value="'+clef+'">'+objet.nom+'</option>';
  }
  $("#pature_histoire_"+id_pature).append(type);
  });
}

// Crée une nouvelle pature après que l'on ait rempli le champs nom
function setPatureNom(id, nom) {
  if(id >= foncier.patures.length)
  {
    pature = new Pature(id, nom); // creation
    foncier.addPature(pature); // ajout au foncier
    parcelle = new Parcelle(pature, 0); // on crée une nouvelle parcelle
    foncier.patures[id].addParcelle(parcelle); // et on ajoute la parcelle à la pature
  }
  else
  {
    foncier.patures[id].nom = nom;
  }
}

// Complète le niveau d'infestation de la parcelle d'une pature en fonction de l'historique
function setPatureParcelles(id, foncier, historique) {
  foncier.patures[id].parcelles[0].infestation = []; // on remet à zéro les parcelles de cette pature
  $.each(patures_types, function(clef, val) {// on recherche l'objet en fonction de son id
    if(clef == historique)
    {
      foncier.patures[id].histoire = val;
    }
  })
  foncier.patures[id].parcelles[0].addStrongles(foncier.patures[id].histoire.infestation_initiale); // on y ajoute des strongles en fonction de l'histoire
}

  // Ajout des donnees sur la patures dans le panneau de contrôle
function ecritPaturesDansMoniteur() {
  $("#parcelles-chiffres").html('');
  for (var i = 0; i < foncier.patures.length; i++) {
    var pature = foncier.patures[i];
    var chiffres = '<p class="soustitre">'+pature.nom+'</p><p id="monit-pat-'+i+'" class="valeur">'+pature.parcelles[0].infestation.length+'</div>';
    $("#parcelles-chiffres").append(chiffres);
  }
}

// Crée l'objet foncier pour la démonstration
function creerDemo() {
  foncier = new Foncier();
  var demo = [
    ["petit champ",4, "pat"],
    ["grand pré", 8, "fauche"],
    ["chez Marcel", 1, "pat"],
    ["en-bas", 3, "nouvelle"],
    ["en-haut", 10, "sousbois"]
  ];
  for (var i = 0; i < demo.length; i++) {
    pature = new Pature(i, demo[i][0], demo[i][1]);
    parcelle = new Parcelle(pature, 0);
    for(types in patures_types){
      if(types == demo[i][2]){
        pature.histoire = patures_types[types];
        parcelle.addStrongles(pature.histoire.infestation_initiale);
      }
    }
    pature.addParcelle(parcelle);
    foncier.addPature(pature);
  }
  creeLignesPatures(foncier);
}

// affiche les lignes de saisie des patures en fonction de l'objet foncier (surtout pour démo ou toute configuration préexistante)
function creeLignesPatures(foncier) {
  $("#liste_patures").html('');
  for(var i = 0; i < foncier.patures.length; i++){
    pature = foncier.patures[i];
    var ligne = '<div class="categories-contenu-ligne">'+
      '<input class="pature-nom" type="text" name="pature_nom_'+i+'" value="'+pature.nom+'" placeholder="nom de la pature">'+
      '<input class="pature-superficie" type="number" name="pature_superficie_'+i+'" value="'+pature.superficie+'" placeholder="superficie">'+
      '<select id="pature_histoire_'+i+'" class="pature-histoire" name="pature_histoire_'+i+'">'+
      '</select>'+
      '<img id="efface_'+i+'" class="efface-ligne" src="public/svg/efface.svg"></div>';
      $("#liste_patures").append(ligne);
      ajoutPaturesTypes(i, pature.histoire.id);
  }
}

// efface toutes les lignes de parcelles pour ne laisser qu'une ligne vide
function effaceLigneParcelles() {
  effaceParcelles();
  effaceMoniteurParcelles();
  $("#liste_patures").html('');
  foncier = new Foncier();
  ligneZero();
}

// construit une ligne vide de saisie de pature (à utiliser avec d'autres fonctions)
function ligneZero() {
  var ligne = '<div class="categories-contenu-ligne">'+
    '<input class="pature-nom" type="text" name="pature_nom_0" value="" placeholder="nom de la pature">'+
    '<input class="pature-superficie" type="number" name="pature_superficie_0 " value="" placeholder="superficie">'+
    '<select id="pature_histoire_0" class="pature-histoire" name="pature_histoire_0">'+
    '</select>'+
    '<img id="efface_0" class="efface-ligne" src="public/svg/efface.svg"></div>';
    $("#liste_patures").append(ligne);
    ajoutPaturesTypes(0, 0);
}

// Efface une ligne de saisie de pature aussi bien dans l'objet foncier que à l'affichage
function effaceUneLigne(id_ligne) {
  foncier.patures.splice(id_ligne, 1);
  creeLignesPatures(foncier);
}

//############################ FONCTIONS POUR L'AFFICHAGE FINAL ###############
// Vide l'affichage de toutes les patures: dessin et moniteur
function effaceParcelles() {
  $("#foncier").html('');
  if(typeof $("#foncier").data('masonry') !== "undefined"){
    $("#foncier").masonry("destroy");
  }
  effaceMoniteurParcelles();
}

// Supprime l'affiche des patures dans le moniteur (utiliser avec d'autres fonctions)
function effaceMoniteurParcelles() {
  $("#parcelles-chiffres").html('');
}

// Mise à jour de l'affichage du moniteur des pâtures
function majMoniteurPatures() {

  foncier.patures.forEach( function(pature, clef) {
    nb_strongles = 0;
    pature.parcelles.forEach(function(parcelle, index) {
      nb_strongles += parcelle.infestation.length;
    });
    $("#monit-pat-"+pature.id).html(nb_strongles);
  })
}

// Calcul les valeurs de X et longueur pour chaque pature en fonction de la superficie et du nombre de patures
function calculPature(){
  var nb_lignes = Math.ceil(foncier.patures.length/param.NB_PARCELLES_PAR_LIGNE.valeur); // nombre de lignes de parcelles à afficher
  // calcul de la longueur totale soit la somme des racines carrées des superficies
  var longueur_totale = 0;
  for (var i = 0; i < foncier.patures.length; i++) {
    longueur_totale += Math.sqrt(foncier.patures[i].superficie);
  }

  var tour = 1 // permet de faire le saut de ligne
  var x = 0 // permet de situer le point de départ d'une parcelle
  for (var i = 0; i < foncier.patures.length; i++) {
    pature = foncier.patures[i];
    if(tour > param.NB_PARCELLES_PAR_LIGNE.valeur) // va à la ligne si 3 parcelles
    {
      x = 0;
      tour = 1;
    }
    var longueur_relative = Math.round(Math.sqrt(pature.superficie) * 80 * nb_lignes / longueur_totale);
    pature.geometrie.X = x;
    pature.geometrie.longueur = longueur_relative;
    x += longueur_relative;
    tour ++;
  }
}

// Crée et insère le html qui affiche les patures
function dessinePatures() {
  for (var i = 0; i < foncier.patures.length; i++) {
    var pature = foncier.patures[i];
    var dessinPature = pature.dessineUnePature();
    $("#foncier").append(dessinPature);
  }
}
// Fait le dallage avec le plug-in jqurey Masonry
function dallage() {
  $('#foncier').masonry({
    // options
    itemSelector: '.pature',
    columnWidth: 1
  });
}

// Obtient le numéro de la semaine
