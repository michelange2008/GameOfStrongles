function Foncier() {
  this.nb_patures = 0;
}

Foncier.prototype.addPature = function (pature) {
  this[pature.id] = pature;
  this.nb_patures ++;
};
