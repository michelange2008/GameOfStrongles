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
  var nb_strongles_par_parcelle = Math.ceil(lotStrongles.length/nb_parcelles);
  for (var i = 0; i < nb_parcelles; i++) {
    // créer un objet parcelle en répartissant les strongles et la proportion
    parcelle = new Parcelle(this.id, i);
    parcelle.proportion = 100 / nb_parcelles;
    for (var j = 0; j < nb_strongles_par_parcelle; j++) {
      while(lotStrongles.length > 0) {
        parcelle.infestation.push(lotStrongles[0]);
        lotStrongles.shift();
      }
    }
    if (hasTroupeau > 0) {
      parcelle.troupeau = troupeau;
      hasTroupeau = 0;
    }
    // ajouter cet objet parcelle autant de fois qu'il y a un nombre de Parcelles
    this.addParcelle(parcelle);
  }
  // traduire tout ça en html
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
