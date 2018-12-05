<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Constantes\Constantes;

class StrongleOut extends Strongle
{

  protected $localisation;

  public function __construct($etat)
  {
    parent::__construct();
    $this->etat = $etat;
    $this->localisation = ['x' => rand(0, 98), 'y' => rand(0,95)];
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

  public function localisation()
  {
    return $this->localisation;
  }
}
