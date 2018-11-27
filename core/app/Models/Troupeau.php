<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Constantes\Constantes;

class Troupeau extends Model
{
    protected $espece;
    protected $taille;
    protected $infestation;
    protected $sensibilite;
    private $contaminant;

    public function __construct($espece, $taille)
    {
      $this->espece = $espece;
      $this->taille = $taille;
      $this->infestation = collect();
      $sensibilite = 1;
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
    public function contaminant()
    {
      $nb_adultes = 0;
      foreach ($this->infestation as $strongle) {
        if($strongle->etat() ==  Constantes::PONTE)
        {
          $nb_adultes++;
        }
      }
      return $nb_adultes;
    }
    public function contaminantForHuman()
    {
      return ($this->contaminant() > 0) ? "OUI" : "NON" ;
    }
    public function sensibilite()
    {
      return $this->sensibilite;
    }
    public function setSensibilite($sensibilite)
    {
      $this->sensibilite = $sensibilite;
    }
    public function setInfestation($nb_strongles)
    {
      if($nb_strongles > 0)
      {
        for ($i=0; $i < $nb_strongles ; $i++) {
          $strongle = new StrongleIn();
          $this->infestation->push($strongle);
        }
      }
    }
    public function setContaminant()
    {
      $this->contaminant = false;
      foreach ($this->infestation as $strongle) {

        if($strongle->etat() == Constantes::PONTE)
        {
          $this->contaminant = true;
        }
      }
    }
}
