function Foncier() {
  this.nb_patures = 0;
  this.patures= [];
}

Foncier.prototype.addPature = function (pature) {
  this.patures.push(pature);
  this.nb_patures ++;
};
