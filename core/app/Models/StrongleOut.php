<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Constantes\Constantes;

class StrongleOut extends Strongle
{

  protected $lot; // ensemble de strongles au nombre de $nombre (cf. Strongle et Constantes)

  public function __construct($etat)
  {
    parent::__construct();
    $this->etat = $etat;
    $this->lot = $this->setLot();
  }

  public function evolution($duree_vie)
  {
    if($this->age + $duree_vie < Constantes::L3_INFESTANTE)
    {
      $this->etat = Constantes::NON_INFESTANT;
    }
    elseif ($this->age + $duree_vie > Constantes::L3_MORTE) {
      $this->etat = Constantes::MORT;
    }
    else
    {
      $this->etat = Constantes::INFESTANT;
    }
  }
  public function setLot() // méthode pour définir 5 points aléatoires = position des strongles dans la parcelle
  {
    for($j = 0; $j < $this->nombre; $j++)
    {
      $parasite = ['x' => rand(0, 98), 'y' => rand(0,95)];
      $lot[$j] = $parasite;
    }

    return $lot;
  }

  public function lot()
  {
    return $this->lot;
  }


}
