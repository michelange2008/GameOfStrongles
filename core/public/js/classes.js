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

//################################# PARCELLES ##################################
function Parcelle(id, nom)
{
  this.id = id;
  this.nom = nom;
  this.troupeau = null;
  this.infestation = [];
  this.contaminant = 0;
}
// AJout d'un objet strongle à la parcelle
Parcelle.prototype.addStrongles = function(nb_strongles)
{
  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleOut();
    this.infestation.push(strongle);
  }
}
// Méthode d'évolution de l'infestation par les strongle d'une parcelle
Parcelle.prototype.evolutionStrongles = function(jours)
{
  if(this.infestation.length > 0)
  {
    this.infestation.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}

// Méthode qui renvoie le nombre de strongles infestantes
Parcelle.prototype.getContaminant = function ()
{
  var nb_L3 = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat == INFESTANT)
    {
      nb_L3++;
    }
  });
  return nb_L3;
}
Parcelle.prototype.entreTroupeau = function (troupeau) {
  this.troupeau = troupeau;
};

//################################ TROUPEAU ####################################
function Troupeau(espece, taille)
{
  this.espece = espece;
  this.taille = taille;
  this.parcelle = null;
  this.infestation = [];
  this.contaminant = false;
}
// Méthode d'infestation d'un troupeau par ajout d'un nombre donné de strongles
Troupeau.prototype.sinfeste = function(nb_strongles){

  for($i = 1 ; $i <= nb_strongles; $i++)
  {
    strongle = new StrongleIn(0);
    this.infestation.push(strongle);
  }
}
Troupeau.prototype.evolutionStrongles = function(jours) {
  if(this.infestation.length > 0)
  {
    this.infestation.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}

Troupeau.prototype.entreDansParcelle = function(parcelle) {
  this.parcelle = parcelle;
};
