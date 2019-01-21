function Foncier() {
  this.nb_patures = 0;
  this.patures= [];
  this.liste_parcelles = [];
}

Foncier.prototype.addPature = function (pature) {
  this.patures.push(pature);
  this.nb_patures ++;
};

Foncier.prototype.setListeParcelles = function () {
  var foncier = this;
  this.patures.forEach(function(pature, clef) {
    pature.parcelles.forEach(function(parcelle, index) {
      foncier.liste_parcelles.push(parcelle);
    })
  })
};
