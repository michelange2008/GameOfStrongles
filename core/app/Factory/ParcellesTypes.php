<?php
namespace App\Factory;

use App\Models\Parcelle;

class ParcellesTypes
{
  protected $listeParcellesType;

  public function __construct()
  {
    $this->listeParcellesType = collect();

    $historique_parcelle = [
      ["nom" => "paturage","infestation_initiale" => 0, "taux_parcelle_contaminante" => 2],
      ["nom" => "pré de fauche","infestation_initiale" => 0, "taux_parcelle_contaminante" => 1],
      ["nom" => "nouvelle prairie","infestation_initiale" => 0,"taux_parcelle_contaminante" => 1],
      ["nom" => "parcours sous bois", "infestation_initiale" => 0, "taux_parcelle_contaminante" => 0],
    ];

    foreach ($historique_parcelle as $type) {
      $parcelle = new Parcelle($type['nom'], 0);
      $parcelle->setInfestation(1, $type['infestation_initiale'], $type['taux_parcelle_contaminante']);
      $this->listeParcellesType->push($parcelle);
    }
  }

  public function listeParcellesType()
  {
    return $this->listeParcellesType;
  }
}
