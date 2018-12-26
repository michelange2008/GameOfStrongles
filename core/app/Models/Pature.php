<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Parcelle;
use App\Constantes\Constantes;

class Pature extends Model
{
    protected $nom;
    protected $superficie;
    protected $parcelles

    public function __construct($nom, $superficie)
    {
      $this->nom = $nom;
      $this->superficie = $superficie;
      $this->parcelles = [];
    }

    public function nom()
    {
      return $this->nom;
    }

    public function superficie()
    {
      return $this->superficie;
    }

    public function parcelles()
    {
      return $this->parcelles;
    }

    public function addParcelle(Parcelle $parcelle)
    {
      $this->parcelles[] = $parcelle;
    }
}
