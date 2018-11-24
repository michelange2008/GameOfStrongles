<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parcelle extends Model
{
    protected $id;
    protected $nom;
    protected $superficie;
    protected $X;
    protected $longueur;
    protected $infestation;

    public function __construct($id, $nom, $superficie)
    {
      $this->id = $id;
      $this->nom = $nom;
      $this->superficie = $superficie;
      $this->infestation = [];
      $this->setLongueur();
    }

    public function setLongueur()
    {
      $this->longueur = sqrt($this->superficie);
    }

    public function id()
    {
      return $this->id;
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
}
