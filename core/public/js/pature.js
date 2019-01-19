function Pature(id, nom, superficie)
{
  this.id = id;
  this.nom = nom;
  this.superficie = superficie;
  this.geometrie = new Geometrie();
  this.parcelles = [];
  this.histoire;
}
function Geometrie()
{
  this.X = 0
  this.longueur = 10;
}

Pature.prototype.addParcelle = function(parcelle)
{
  this.parcelles.push(parcelle);
}

Pature.prototype.divisePature = function (nb_parcelles) {
  var pature_id = this.id;
  // savoir si la pature portait le troupeau
  var hasTroupeau = 0;
  this.parcelles.forEach( function(parcelle, clef) {
    if(parcelle.troupeau !== null ) {
      hasTroupeau ++;
    }
  })
  // récupérer le lot de strongles
  var lotStrongles = this.ramasseStrongles();
  // Supprimer les parcelles existantes
  this.parcelles = [];
  //---------------------------------------------------
  for (var i = 0; i < nb_parcelles; i++) {
    // créer un objet parcelle en répartissant les strongles et la proportion
    parcelle = new Parcelle(this.id, i);
    parcelle.proportion = 100 / nb_parcelles;
    this.addParcelle(parcelle);
  }
  while(lotStrongles.length > 0) {
    for (var i = 0; i < nb_parcelles; i++) {
      if(lotStrongles[0] !== undefined) {
        this.parcelles[i].infestation.push(lotStrongles[0]);
        lotStrongles.shift();
      }
    }
  }
};
// écrit le html pour insérer dans un div pature : parcelles et strongles
Pature.prototype.dessineUnePature = function () {
  var dessinPature = "";
  var pature = this;
  pature.parcelles.forEach( function(parcelle, clef) {
    dessinPature += '<div id="pature_'
      +pature.id+'" style="width:'+pature.geometrie.longueur
      +'%; height:'+pature.geometrie.longueur+'vh" class="pature">'
        +pature.dessineParcelles()
      +'<div id="entete_'+parcelle.id+'" class="entete">'
        +'<p class="pature-nom">'+pature.nom+'</p>'
        +'<p class="somme-des-jours"><span id="jours_'+parcelle.id+'" class="compte-jours">0</span><span class="jours"> j.</span></p>'
        +'<div id="divise_'+parcelle.id+'" class="divise">'
          +'<img src="public/svg/divise.svg" class="image-divise" alt="divise" title="diviser la parcelle">'
        +'</div>'
      +'</div>';
  })
    return dessinPature;
};

Pature.prototype.dessineParcelles = function () {
   var pature = this;
   var dessinParcelles = '<div id="parcelles_'+pature.id+'" class="parcelles">';
   pature.parcelles.forEach( function(parcelle, clef) {
     dessinParcelles += '<div id="'+parcelle.id+'" class="parcelle '+pature.histoire.id+'" style="width:'+parcelle.proportion+'%; height:100%">'
       +parcelle.dessineStronglesOut()+'</div>';
   })
   dessinParcelles += '</div>';
     return dessinParcelles;
};


// Constitue un array avec tous les strongles des parcelles d'une pature
Pature.prototype.ramasseStrongles = function () {
  var lotStrongles = [];
  this.parcelles.forEach(function(parcelle, index) {
    parcelle.infestation.forEach( function(strongle, clef) {
      lotStrongles.push(strongle)
    });
  });
  return lotStrongles;
}
// dessine les parcelles d'une pature
Pature.prototype.majParcelles = function () {
  // maintenant il faut redessiner le html
  var dessinParcelles = this.dessineParcelles(); // crée le HTML
  $('#pature_'+this.id+'> .parcelles' ).remove();
  $('#pature_'+this.id).prepend(dessinParcelles);
};
