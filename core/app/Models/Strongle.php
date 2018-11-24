<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

abstract class Strongle extends Model
{
    protected $age; // age en jour
    protected $pathogen;
    protected $etat;

    public function __construct()
    {
      $this->age = 1; // correspond soit à la ponte sur paturage soit à l'ingestion d'une L3
      $this->pathogen = 1; // correspond à un niveau de pathogénicité moyen
    }

    public function setAge($age)
    {
      $this->age = $age;
    }
    public function setPathogen($pathogen)
    {
      $this->pathogen = $pathogen;
    }
    public function age()
    {
      return $this->age;
    }
    public function pathogen()
    {
      return $this->pathogen;
    }
    public function etat()
    {
      return $this->etat;
    }
}
