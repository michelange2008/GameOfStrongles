<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Parcelle;

class Dessinparcelle extends Model
{
  protected $id;
  protected $parcelle;
  protected $X;
  protected $longueurAbsolue;
  protected $longueurRelative;

  public function __construct($id, Parcelle $parcelle)
  {
    $this->id = $id;
    $this->parcelle = $parcelle;
    $this->X = 0;
    $this->longueurAbsolue = sqrt($parcelle->superficie());
  }


  public function setLongueurRelative($longueurRelative)
  {
    $this->longueurRelative = $longueurRelative;
  }

  public function setX($X)
  {
    $this->X = $X;
  }

  public function id()
  {
      return $this->id;
  }

  public function parcelle()
  {
      return $this->parcelle;
  }

  public function X()
  {
      return $this->X;
  }

  public function longueurAbsolue()
  {
      return $this->longueurAbsolue;
  }

  public function longueurRelative()
  {
    return $this->longueurRelative;
  }

}
