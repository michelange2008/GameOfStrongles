<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Troupeau extends Model
{
    protected $espece;
    protected $taille;
    protected $infestation;

    public function __construct($espece, $taille)
    {
      $this->espece = $espece;
      $this->taille = $taille;
      $infestation = [];
    }
    public function espece()
    {
      return $this->espece;
    }
    public function taille()
    {
      return $this->taille;
    }
    public function infestation()
    {
      return $this->infestation;
    }

}
