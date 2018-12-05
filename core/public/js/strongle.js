class Strongle
{
  constructor (age)
  {
    this.age = age;
    this.pathogen = 1;
  }
}

class StrongleOut extends Strongle {
  constructor(age)
  {
    super(age);
    this.etat = NON_INFESTANT;
    this.localisation = [Math.round(Math.random()*98), Math.round(Math.random()*95)];
  }
}

StrongleOut.prototype.evolution =  function(jours)
{
  this.age = parseInt(this.age) + parseInt(jours);
  if(this.age < L3_INFESTANTE)
  {
    this.etat = NON_INFESTANT;
  }
  else if (this.age > L3_MORTE)
  {
    this.etat = MORT;
  }
  else {
    this.etat = INFESTANT;
  }
}
// StrongleOut.prototype.setLocalisation = function () {// méthode pour définir 1 point aléatoire = position du strongle dans la parcelle
//   this.localisation = [Math.random()*98, Math.random()*95];
// };

class StrongleIn extends Strongle {
  constructor()
  {
    super();
    this.etat = PREPATENT;
  }
}

StrongleIn.prototype.evolution = function(jours)
{
  if(this.age < PERIODE_PREPATENTE)
  {
    this.etat = PREPATENT;
  }
  else if (this.age > ADULTE_MORT) {
    this.etat = MORT;
  }
  else
  {
    this.etat = PONTE;
  }
}
