<?php
namespace App\Constantes;

/**
 *
 */
class Constantes
{
  const DUREE_PATURAGE = 200;
  const PAS_DE_TEMPS = 1;
  const NB_PARCELLES_PAR_LIGNE = 3;

  // modélisation parasites
  const PATHOGEN = 1;
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
  // constantes pour les troupeaux
  const RISQUE_MORTALITE_MOYEN = 1000;
  const RISQUE_MORTALITE_ELEVE = 2000;
  const TROUPEAU_MORT = 3000;
  // Facteur pour le calcul de la décroissance de l'Infestation
  const DECROISSANCE = 1000;
  const TAUX_TROUPEAU_CONTAMINANT = 1;
  const TAUX_PARCELLE_CONTAMINANTE = 0.5; // taux qui rentre dans un calcul (Nb L3 / (superficie x TAUX_INFESTATION)) pour fixer la contamination d'une parcelle
  protected $param_biologiques;

  public static function param_bio()
  {
    $param_biologiques = [
      "DUREE_PATURAGE" => self::DUREE_PATURAGE,
      "TAUX_PARCELLE_CONTAMINANTE" => self::TAUX_PARCELLE_CONTAMINANTE,
      "PATHOGEN" => self::PATHOGEN,
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
      "TAUX_TROUPEAU_CONTAMINANT" => self::TAUX_TROUPEAU_CONTAMINANT,
      "RISQUE_MORTALITE_MOYEN" => self::RISQUE_MORTALITE_MOYEN,
      "RISQUE_MORTALITE_ELEVE" => self::RISQUE_MORTALITE_ELEVE,
      "TROUPEAU_MORT" => self::TROUPEAU_MORT,
      "DECROISSANCE" => self::DECROISSANCE,
    ];
    return $param_biologiques;
  }
}
