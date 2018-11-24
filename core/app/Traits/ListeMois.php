<?php
namespace App\Traits;

use Carbon\Carbon;
/**
 *
 */
trait ListeMois
{
  function listeMois($mise_a_l_herbe, $duree_paturage)
  {
    $mois_sortie = $mise_a_l_herbe->month;
    $entre_etable = $mise_a_l_herbe->copy()->addDay($duree_paturage);
    $mois_entree = $entre_etable->month;

    $liste_mois = collect();
    for ($i=$mois_sortie; $i < ($mois_entree + 1) ; $i++) {
      $date = Carbon::createFromDate(Carbon::now()->year, $i, 1);

      if($i == $mois_sortie)
      {
        $duree_mois = $date->diffInDays($date->copy()->addMonth()) - $mise_a_l_herbe->day;
      }
      elseif ($i == $mois_entree) {
        $duree_mois = $entre_etable->day;
      }
      else {
        $duree_mois = $date->diffInDays($date->copy()->addMonth());
      }

      $liste_mois->push(['mois'=> $date, 'nb_jours' => $duree_mois]);
    }

    return $liste_mois;

  }
}
