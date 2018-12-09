<?php
namespace App\Factory;

use App\Factory\ExploitationFactory;

class Demo
{
  protected $exploition;

  public function __construct()
  {
    $valeurs = [
      "troupeau" => "caprins",
      "effectif" => "50",
      "infestation_troupeau" => "orange",
      "mise_a_l_herbe" => "2018-03-18",
      "entre_bergerie" => "2018-10-18",
      "parcelle_nom_0" => "petit champ",
      "parcelle_superficie_0" => "4",
      "parcelle_histoire_0" => "paturage",
      "parcelle_nom_1" => "grand pré",
      "parcelle_superficie_1" => "8",
      "parcelle_histoire_1" => "pré de fauche",
      "parcelle_nom_2" => "chez Marcel",
      "parcelle_superficie_2" => "1",
      "parcelle_histoire_2" => "paturage",
      "parcelle_nom_3" => "en-bas",
      "parcelle_superficie_3" => "3",
      "parcelle_histoire_3" => "nouvelle prairie",
      "parcelle_nom_4" => "en-haut",
      "parcelle_superficie_4" => "10",
      "parcelle_histoire_4" => "parcours sous bois",
    ];

    $this->exploitation = new ExploitationFactory($valeurs);
  }

  public function exploitation()
  {
    return $this->exploitation;
  }
}
