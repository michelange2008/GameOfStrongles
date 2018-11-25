<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Dessinparcelle;
use App\Constantes\Constantes;
use App\Traits\NbLignes;

final class Dessinparcellaire extends Model
{
  use NbLignes;

  protected $listeDessinparcelles;

  public function __construct()
  {
    $this->listeDessinparcelles = collect();
  }

  public function addDessinparcelle(Dessinparcelle $dessinparcelle)
  {
    $this->listeDessinparcelles->push($dessinparcelle);
  }

  public function listeDessinparcelles()
  {
    return $this->listeDessinparcelles;
  }

  public function SetLongueur_et_X_DessinParcelle()
  {
    $nbLignes = $this->NbLignes($this->listeDessinparcelles->count());
    $longueurTotale = 0;
    // On calcule la longueur absolue totale du coté des parcelles
    foreach ($this->listeDessinparcelles as $dessinparcelle) {
      $longueurTotale += $dessinparcelle->longueurAbsolue();
    }
    // On en définit la longueur relative (par rapport à 100) en tenant compte du nombre de lignes
    // S'il y à 2 lignes on compte sur 200, 3 lignes 300 de façon à ce que chaque ligne fasse un total de 100
    $x = 0; // permet d'additionner les longueurs relatives en partant de 0 pour la première
    $tour = 1; // permet de remettre x à 0 pour tenir compte du saut de ligne
    foreach ($this->listeDessinparcelles as $dessinparcelle) {
      $longueurRelative = $dessinparcelle->longueurAbsolue() * 80 * $nbLignes / $longueurTotale;
      $dessinparcelle->setLongueurRelative($longueurRelative); // on ajoute la longueur relative à l'objet dessinparcelle
      $x_origine = $dessinparcelle->X(); // on récupère la valeur initiale de la parcelle
      $dessinparcelle->setX($x); // on fixe une nouvelle valeur en fonction de la somme des précédentes

      $x += $x_origine + $longueurRelative; // on incrémente x de la longueur de la parcelle
      $tour ++; // on incrémente $tour de 1 pour pouvoir compter les parcelles

      if($tour > Constantes::NB_PARCELLES_PAR_LIGNE){ // Si on dépasse le nombre de parcelles par ligne on réinitialise les compteurs
        $x = 0;
        $tour = 1;
      }
    }
  }


}
