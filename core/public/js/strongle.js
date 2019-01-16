class Strongle
{
  constructor (id, age, pathogen)
  {
    this.id = id
    this.age = age;
    this.pathogen = pathogen;
  }
}

class StrongleOut extends Strongle {
  constructor(id, age)
  {
    super(id, age);
    this.id = id;
    this.etat = param.NON_INFESTANT.valeur;
    this.localisation = [Math.round(Math.random()*98), Math.round(Math.random()*98)];
  }
}

StrongleOut.prototype.evolution =  function(jours)
{
  this.age += jours;

  if(this.age < param.L3_INFESTANTE.valeur)
  {
    this.etat = param.NON_INFESTANT.valeur;
  }
  else if (this.age > param.L3_MORTE.valeur)
  {
    this.etat = param.MORT.valeur;
  }
  else {
    this.etat = param.INFESTANT.valeur;
  }
}

class StrongleIn extends Strongle {
  constructor(id, age, pathogen)
  {
    super(id, age, pathogen);
  }
}

StrongleIn.prototype.evolution = function(jours)
{
  this.age += jours;
  if(this.age < param.PERIODE_PREPATENTE.valeur)
  {
    this.etat = param.PREPATENT.valeur;
  }
  else if (this.age > param.ADULTE_MORT.valeur) {
    this.etat = param.MORT.valeur;
  }
  else
  {
    this.etat = param.PONTE.valeur;
  }
}
