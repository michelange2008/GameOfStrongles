class Foncier
{
  constructor() {
    this.nb_patures = 0;
    this.patures= [];
    this.liste_parcelles = [];
  }
}

Foncier.prototype.addPature = function (pature) {
  this.patures.push(pature);
  this.nb_patures ++;
};

Foncier.prototype.setListeParcelles = function () {
  var foncier = this;
  var z = 0;
  this.patures.forEach(function(pature, clef) {
    pature.parcelles.forEach(function(parcelle, index) {
      parcelle.planning_index = 20 + 32*z;
      z++;
      foncier.liste_parcelles.push(parcelle);
    })
  })
};
