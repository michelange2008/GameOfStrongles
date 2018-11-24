<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Constantes\Constantes;

class StrongleOut extends Strongle
{
  public function __construct()
  {
    parent::__construct();
    $this->etat = Constantes::NON_INFESTANT;
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

}
