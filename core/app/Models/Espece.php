<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Espece extends Model
{
    protected $nom;
    protected $nom_court;
    protected $sensibilite;
    protected $icone;

    public function __construct($nom, $nom_court, $sensibilite, $icone)
    {
      $this->nom = $nom;
      $this->nom_court = $nom_court;
      $this->sensibilite = $sensibilite;
      $this->icone = $icone;
    }

    public function nom()
    {
      return $this->nom;
    }
    public function nom_court()
    {
      return $this->nom_court;
    }
    public function sensibilite()
    {
      return $this->sensibilite;
    }
    public function icone()
    {
      return $this->icone;
    }
}
