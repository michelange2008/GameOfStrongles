function Pature(id, nom, superficie)
{
  this.id = id;
  this.nom = nom;
  this.superficie = superficie;
  this.X = 0;
  this.longueur = 10;
  this.parcelles = [];
}

Pature.prototype.addParcelle = function(parcelle)
{
  this.parcelles.push(parcelle);
}

Pature.prototype.divisePature = function (nb_parcelles) {
  // récupérer les infos globaless sur la parcelle unique
  //ou éventuellement les parcelles issues d'une précédente division

  // Supprimer les parcelles existantes

  // créer un objet parcelle en répartissant les strongles et la proportion

  // ajouter cet objet parcelle autant de fois qu'il y a un nombre de Parcelles

  // traduire tout ça en html

};
