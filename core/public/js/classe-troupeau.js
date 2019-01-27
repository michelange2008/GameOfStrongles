//################################ CLASSE ET SETTERS ####################################
function Troupeau()
{
  this.espece;
  this.effectif;
  this.parcelle = "chevrerie";
  this.infestation = [];
  this.sinfeste(5);
  this.capaciteInfestante = 0;
  this.sante = 100;
  // this.deplacement = []; // déplacement du troupeau (entre, sortie, parcelle)
  this.circuit = []; // ensemble des déplacements du troupeau
}
Troupeau.prototype.setEspece = function (espece) {
  this.espece = espece;
};
Troupeau.prototype.seteffectif = function (effectif) {
  this.effectif = effectif;
};
Troupeau.prototype.setSensibilite = function (sensibilite) {
  this.sensibilite = sensibilite;
};
Troupeau.prototype.setStrongles = function (nb_strongles) {
  this.infestation = [];
  for (var i = 0; i < nb_strongles; i++) {
    strongle = new StrongleIn(1);
    this.infestation.push(strongle);
  }
};
// Définit si un troupeau est contaminant
Troupeau.prototype.setContaminant = function(){
  // FIXME: Est-ce bien de prendre en compte l'effectif troupeau ou pas ?
  this.capaciteInfestante = this.tauxContaminant();
}

//########################### PROCESSUS D'INFESTATION ##########################

// Méthode d'infestation d'un troupeau par ajout d'un nombre donné de strongles
Troupeau.prototype.sinfeste = function(nb_strongles){
  for(i = 1 ; i <= nb_strongles; i++)
  {
    strongle = new StrongleIn(1);
    this.infestation.push(strongle);
  }
}

//########################## EVOLUTION INTERNE DU TROUPEAU #####################

// Evolution des strongles au sein d'un troupeau
Troupeau.prototype.evolutionStrongles = function(jours) {

  if(this.infestation.length > 0)
  {
      for (var i = 0; i < this.infestation.length; i++) {
        this.infestation[i].evolution(jours);
      }
  }
}

// Calcule le nombre de strongle à l'état de ponte
Troupeau.prototype.nbStrongleAdultes = function () {
  var nb_strongles_adultes = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat == param.PONTE.valeur)
    {
      nb_strongles_adultes ++;
    }
  })
    return nb_strongles_adultes;
};
// Donne un taux de capacité de contamination d'un troupeau en fonction du nb de strongles adultes, de la effectif et d'un parametre TTC
Troupeau.prototype.tauxContaminant = function () {
  return this.nbStrongleAdultes()*this.effectif*param.TAUX_TROUPEAU_CONTAMINANT.valeur / 100;
};
// Calcule l'évolution de l'indice de santé du troupeau
Troupeau.prototype.evolutionSante = function () {
  // La sévérité de l'infestation dépend du nombre de strongles adultes et de leur pathogénicité
  var severiteInfestation = this.nbStrongleAdultes()*param.PATHOGEN.valeur;
  // formule mathématique permettant de donner un indice entre 100 (bonne santé) et 0 (mort)
  troupeau.sante *= (-0.03 * severiteInfestation +100)/100 ;
  // Pour éviter des indices négatifs
  troupeau.sante = (troupeau.sante > 0) ? troupeau.sante : 0;
  // Pour remonter à 100 si pas de nb_strongles
  troupeau.sante =(troupeau.infestation.length == 0) ? 100 : troupeau.sante;
};
// Enlève les strongles morts de l'objet troupeau
Troupeau.prototype.elimination_morts = function() {
  var nouvelle_situation = []; // nouvelle liste de strongles (vide au départ)
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat !== param.MORT.valeur)
    {
      nouvelle_situation.push(strongle); // On ne met dans cette liste que les strongles vivants
    }
  });
  troupeau.infestation = nouvelle_situation; // on remplace l'ancienne liste par la nouvelle
  troupeau.maj_moniteur(); // On met à jour l'affichage du moniteur
}


//###################################### AFFICHAGE #################################

// Met à jour l'affichage du moniteur pour le troupeau
Troupeau.prototype.maj_moniteur = function () {
  $('#monit-tp-infestation').html(troupeau.infestation.length);
  $('#monit-tp-contaminant').html(troupeau.capaciteInfestante);
};
// Met à jour l'image du troupeau en fonction de son niveau de santé et d'excrétion
Troupeau.prototype.maj_aspect_troupeau = function () {
  var estContaminant = (this.capaciteInfestante > 0) ? 1 : 0; // Si contaminant est > 0 le troupeau est contaminant
  var indiceSante = Math.floor(troupeau.sante/10); // Calcul pour avoir 10 niveaux de santé à partir de la
  var image_troupeau = troupeau.espece+'_sante_'+indiceSante+'_contaminant_'+estContaminant+'.svg';
  $('#troupeau-image').attr('src', url_svg+image_troupeau);
  if(troupeau.sante == 0) {
    alerte_troupeau_mort();
  }
};

//############################## MOUVEMENTS DU TROUPEAU ########################

Troupeau.prototype.entreDansParcelle = function(parcelle) {
  var date = new Date(dates.date_courante);
  this.parcelle = parcelle;
  this.deplacement = new Deplacement(parcelle, date);
  $("#troupeau").css('background-image', 'none');
};

Troupeau.prototype.sortDeParcelle = function () {
    var date = new Date(dates.date_courante);
    this.deplacement.setDateSortie(date);
    if(this.deplacement.date_sortie > this.deplacement.date_entree) {
      this.circuit.push(this.deplacement);
    }
    majPlanning();
    this.parcelle = null;
};

//############################## PLANNING TROUPEAU #############################
// Définit le premier afffichage du planning avec la saison de paturage
function planningPaturageInitial() {
  var mise_a_l_herbe = new Date(dates.mise_a_l_herbe);
  var date_milieu = new Date(mise_a_l_herbe.setDate(mise_a_l_herbe.getDate() + dates.duree_paturage/2));
  planning = [
    {
      "id":"SP", // a unique identifier
      "title":"",
      "focus_date":date_milieu.toISOString(),
      "initial_zoom": 28,
      "image_lane_height":200,
      "events" : [
        {
          "id":            "saison",
          "title":         "Saison de paturage",
          "startdate":     dates.mise_a_l_herbe.toISOString(),
          "enddate":       dates.entre_bergerie.toISOString(),
          "importance":    "40",
          "span_color":"lightgreen",
          "y_position": 0
        }
      ]
    }
  ];
  return planning;
}

function majPlanning() {
  planning = planningPaturageInitial();
  // Attribuer à chaque parcelle une valeur y et une couleur
  var nb_parcelles = foncier.liste_parcelles.length;
  var y = 20;
console.log(foncier.liste_parcelles);
  foncier.liste_parcelles.forEach(function (parcelle, clef) {
    troupeau.circuit.forEach( function(deplacement, index) {
      if(deplacement.parcelle.id == parcelle.id){
        var mouvement =
        {
          "id": parcelle.id,
          "title": parcelle.nom,
          "startdate": deplacement.date_entree.toISOString(),
          "enddate": deplacement.date_sortie.toISOString(),
          "importance": "40",
          "span_color": parcelle.histoire.couleur,
          "y_position": parcelle.planning_index
        }
        console.log(mouvement);
        planning[0].events.push(mouvement);
      }
    })
  })
  $('#SP').remove();
  dessinePlanning(planning);
}

function dessinePlanning(planning) {
    var url_tg = document.documentURI+"core/public/js/timeglider/json/";

    var tg1 = $("#placement").timeline({
    "data_source":planning,
    // "mousewheel": "zoom",
    "inverted": true,
    "show_footer": false,
    "display_zoom_level":true,
    "min_zoom":10,
    "max_zoom":28,
    });
    // var tg_instance = tg1.data("timeline");
    // tg_instance.addEvent(mouvement, true);
    //   console.log(tg_instance.getMediator().getZoomLevel());
}
