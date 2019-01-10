function Dates()
{
  var annee = new Date().getFullYear();
  this.mise_a_l_herbe = new Date(annee+"-03-18");
  this.entre_bergerie = new Date(annee+"-10-18");
  this.duree_paturage = Math.round((new Date(annee+"-10-18")-new Date(annee+"-03-18"))/(60*60*25*1000));
  this.date_courante = new Date(annee+"-03-18");
}

Dates.prototype.avance = function (pas_de_temps) {
  this.date_courante.setDate(this.date_courante.getDate() + parseInt(pas_de_temps));
};
