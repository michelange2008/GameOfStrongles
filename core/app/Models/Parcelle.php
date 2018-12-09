<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Constantes\Constantes;

class Parcelle extends Model
{
    protected $nom;
    protected $superficie;
    protected $infestation;
    protected $contaminant;

    public function __construct($nom, $superficie)
    {
      $this->nom = $nom;
      $this->superficie = $superficie;
      $this->infestation = collect();
      $this->contaminant = self::contaminant();
    }

    public function nom()
    {
      return $this->nom;
    }

    public function superficie()
    {
      return $this->superficie;
    }

    public function infestation()
    {
      return $this->infestation;
    }

    public function setInfestation($age = 1, $nb_oeuf = 0, $nb_L3 = 0)
    {
      if($nb_oeuf > 0)
      {
        for ($i=0; $i <$nb_oeuf ; $i++) {
          $strongle = new StrongleOut(Constantes::NON_INFESTANT);
          $strongle->setAge(1);
          $this->infestation->push($strongle);
        }
      }
      if($nb_L3 > 0)
      {
        for ($i=0; $i <$nb_L3 ; $i++) {
          $strongle = new StrongleOut(Constantes::INFESTANT);
          $strongle->setAge($age);
          $this->infestation->push($strongle);
        }
      }
    }

    public function contaminant()
    {
      $nb_larve_contaminante = 0;
      foreach ($this->infestation as $strongle) {
        if($strongle->etat() == Constantes::INFESTANT)
        {
          $nb_larve_contaminante++;
        }
      }
      return $nb_larve_contaminante;
    }
}
