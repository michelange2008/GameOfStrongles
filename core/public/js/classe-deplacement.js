// Objet décrivant le mouvement unitaire d'un troupeau: entre et sortie d'une parcelle
class Deplacement {
  constructor(parcelle, date_entree) {
    this.parcelle = parcelle;
    this.date_entree = date_entree;
  }
}

Deplacement.prototype.setDateSortie = function (date_sortie) {
  this.date_sortie = date_sortie;
};
