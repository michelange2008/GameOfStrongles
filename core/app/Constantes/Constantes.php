<?php
namespace App\Constantes;

/**
 *
 */
class Constantes
{

  const NB_PARCELLES_PAR_LIGNE = 3;

  // modélisation parasites
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
}
