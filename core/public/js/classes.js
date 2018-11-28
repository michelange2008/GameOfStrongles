class Strongle
{
  constructor (age = 1)
  {
    this.age = age;
    this.pathogen = 1;
  }
}

class StrongleOut extends Strongle {
  constructor()
  {
    super();
    this.etat = non_infestant;
  }
}

StrongleOut.prototype.evolution =  function(jours)
{
  this.age = this.age + jours;
  if(this.age < l3_infestante)
  {
    this.etat = 'non_infestant';
  }
  else if (this.age > l3_morte)
  {
    this.etat = 'mort';
  }
  else {
    this.etat = 'infestant';
  }
}

class StrongleIn extends Strongle {
  constructor()
  {
    super();
    this.etat = prepatent;
  }
}

StrongleIn.prototype.evolution = function(jours)
{
  this.age = Number(this.age) + Number(jours);
  if(this.age < preriode_prepatente)
  {
    this.etat = prepatent;
  }
  else if (this.age > adulte_mort) {
    this.etat = mort;
  }
  else
  {
    this.etat = ponte;
  }
}

//################################# PARCELLES ##################################
function Parcelle(id, nom)
{
  this.id = id;
  this.nom = nom;
  this.infestation = [];
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
Parcelle.prototype.contaminant = function ()
{
  var nb_L3 = 0;
  this.infestation.forEach(function(strongle) {
    if(strongle.etat = infestant)
    {
      nb_L3++;
    }
  });
  return nb_L3;
};

//################################ TROUPEAU ####################################
function Troupeau(espece, taille)
{
  this.espece = espece;
  this.taille = taille;
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
Troupeau.prototype.evolutionStrongles = function(jours)
{
  if(this.infestation.length > 0)
  {
    this.infestation.forEach(function(strongle) {
      strongle.evolution(jours);
    });
  }
}
