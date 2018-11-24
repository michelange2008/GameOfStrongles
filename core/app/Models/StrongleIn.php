<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Constantes\Constantes;

class StrongleIn extends Strongle
{
    public function __construct()
    {
      parent::__construct();
      $this->etat = Constantes::PREPATENT;
    }

    public function evolution($duree_vie)
    {
      if($this->age + $duree_vie < Constantes::PERIODE_PREPATENTE)
      {
        $this->etat = Constantes::PREPATENT;
      }
      elseif ($this->age + $duree_vie > Constantes::ADULTE_MORT) {
        $this->etat = Constantes::MORT;
      }
      else
      {
        $this->etat = Constantes::PONTE;
      }
    }
  }
