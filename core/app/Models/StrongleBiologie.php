<?php

namespace App\Models;

use App\Constantes\Constantes;

use Illuminate\Database\Eloquent\Model;

class StrongleBiologie extends Model
{
  protected $L3_infestante; // nombre de jours entre ponte et L3 infestante;
  protected $L3_morte; // durée de vie d'une larve L3
  protected $periode_prepatente; // nombre de jours après absoption L3 et début ponte
  protected $infestation_maximum; // nombre de jours après absoption de L3 et ponte maximum
  protected $adulte_mort; // longévité moyenne d'un adulte
  protected $pathogen; // niveau de pathogénicité

  public function __construct()
  {
    $this->L3_infestante = Constantes::L3_INFESTANTE;
    $this->L3_morte = Constantes::L3_MORTE;
    $this->periode_prepatente = Constantes::PERIODE_PREPATENTE;
    $this->infestation_maximum = Constantes::INFESTATION_MAXIMUM;
    $this->adulte_mort = Constantes::ADULTE_MORT;
    $this->pathogen = Constantes::PATHOGEN;
  }

  public function L3_infestante()
  {
    return $this->L3_infestante;
  }
  public function L3_morte()
  {
    return $this->L3_morte;
  }
  public function periode_prepatente()
  {
    return $this->periode_prepatente;
  }
  public function infestation_maximum()
  {
    return $this->infestation_maximum;
  }
  public function adulte_mort()
  {
    return $this->adulte_mort;
  }
  public function pathogen()
  {
    return $this->pathogen;
  }
  public function setL3_infestante($L3_infestante)
  {
    $this->L3_infestante = $L3_infestante;
  }
  public function setL3_morte($L_morte)
  {
    $this->L3_morte = $L3_morte;
  }
  public function setPeriode_prepatente($periode_prepatente)
  {
    $this->periode_prepatente = $periode_prepatente;
  }
  public function setInfestation_maximum($infestation_maximum)
  {
    $this->infestation_maximum = $infestation_maximum;
  }
  public function setAdulte_mort($adulte_mort)
  {
    $this->adulte_mort = $adulte_mort;
  }
  public function pathogen($pathogen)
  {
    $this->pathogen = $pathogen;
  }
}
