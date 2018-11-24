<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parcelle extends Model
{
    protected $nom;
    protected $superficie;
    protected $infestation;

    public function __construct($nom, $superficie)
    {
      $this->nom = $nom;
      $this->superficie = $superficie;
      $this->infestation = collect();
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

    public function setInfestation($nb_strongles)
    {
      for ($i=0; $i <$nb_strongles ; $i++) {
        $strongle = new StrongleOut();
        $this->infestation->push($strongle);
      }
    }
}
