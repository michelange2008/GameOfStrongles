<?php
namespace App\Constantes;

/**
 *
 */
class Constantes
{
  const DUREE_PATURAGE = 200;

  const NB_PARCELLES_PAR_LIGNE = 3;

  const NB_STRONGLE_PAR_LOT = 5;
  // modélisation parasites
  const AGE_L3_FIN_HIVER = 30;
  const L3_INFESTANTE = 21;
  const L3_MORTE = 60;
  const PERIODE_PREPATENTE = 15;
  const INFESTATION_MAXIMUM = 20;
  const ADULTE_MORT = 100;
  // constantes pour les états des strongles
  const NON_INFESTANT = 'non_infestant'; // stade oeuf L1 et L2
  const INFESTANT = 'infestant'; // stade L3
  const MORT = 'mort'; // L3 morte
  const PREPATENT = 'prepatent'; // L3 ingérée mais non encore adulte
  const PONTE = 'ponte'; // stronge adulte prête à pondre

  protected $param_biologiques;

  public static function param_bio()
  {
    $param_biologiques = [
      "DUREE_PATURAGE" => self::DUREE_PATURAGE,
      "NB_STRONGLE_PAR_LOT" => self::NB_STRONGLE_PAR_LOT,
      "AGE_L3_FIN_HIVER" => self::AGE_L3_FIN_HIVER,
      "L3_INFESTANTE" => self::L3_INFESTANTE,
      "L3_MORTE" => self::L3_MORTE,
      "PERIODE_PREPATENTE" => self::PERIODE_PREPATENTE,
      "INFESTATION_MAXIMUM" => self::INFESTATION_MAXIMUM,
      "ADULTE_MORT" => self::ADULTE_MORT,
      "NON_INFESTANT" => self::NON_INFESTANT,
      "INFESTANT" => self::INFESTANT,
      "MORT" => self::MORT,
      "PREPATENT" => self::PREPATENT,
      "PONTE" => self::PONTE,
    ];
    return $param_biologiques;
  }
}
