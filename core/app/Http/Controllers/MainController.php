<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Troupeau;
use App\Models\Parcelle;


class MainController extends Controller
{

    public function index()
    {
      $troupeau = new Troupeau('caprins', 50);

      $nb_lots = 100;
      $nb_parasite = 5;
      for($i = 0; $i < $nb_lots ; $i++)
      {
        for($j = 0; $j < $nb_parasite; $j++)
        {
          $parasite = ['x' => rand(0, 98), 'y' => rand(0,95)];
          $lot[$j] = $parasite;
        }
        $total_parasite[$i] = $lot;
      }

      $listes_parcelles = collect([
        ['nom' => 'petit champ', 'longueur_cote' => sqrt(4)],
        ['nom' => 'grand pré', 'longueur_cote' => sqrt(8)],
        ['nom' => 'chez Marcel', 'longueur_cote' => sqrt(0.5)],
        ['nom' => 'en-bas', 'longueur_cote' => sqrt(3)],
        ['nom' => 'en-haut', 'longueur_cote' => sqrt(10)],
      ]);
      $nb_parcelles = $listes_parcelles->count();
      $longueurs_cotes = $listes_parcelles->sum('longueur_cote');
      if ($nb_parcelles <= 3) {
        $nb_lignes = 1;
      }
      elseif ($nb_parcelles <= 6 ) {
        $nb_lignes = 2;
      }
      elseif ($nb_parcelles <= 9) {
        $nb_lignes = 3;
      }
      else {
        $nb_lignes = 4;
      }

      $parcelles = [];
      $X = 0;
      foreach ($listes_parcelles as $parcelle) {
        $parcelles[] = [
          'nom' => $parcelle['nom'],
          'X' => $X,
          'longueur_cote' => $parcelle['longueur_cote']*100/$longueurs_cotes,
        ];
        $X= $X + $parcelle['longueur_cote'];
      }
      dd($troupeau->espece());
      return view('gos_main', [
        'parcelles' => $parcelles,
        'total_parasite' => $total_parasite,
      ]);
    }


}
