<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Troupeau;
use App\Models\Parcelle;
use App\Traits\NbLignes;

class MainController extends Controller
{
  use NbLignes;

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
        ['nom' => 'petit champ', 'superficie' => 4],
        ['nom' => 'grand pré', 'superficie' => 8],
        ['nom' => 'chez Marcel', 'superficie' => 0.5],
        ['nom' => 'en-bas', 'superficie' => 3],
        ['nom' => 'en-haut', 'superficie' => 10],
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


      $parcelles = collect();
      $i = 0;
      foreach ($listes_parcelles as $parcelle) {
        $parcelles->push(new Parcelle($i, $parcelle['nom'], $parcelle['superficie'] ));
        $i++;
      }
      $nb_lignes = $this->nblignes($parcelles->count());
      dd($nb_lignes);
      return view('gos_main', [
        'parcelles' => $parcelles,
        'total_parasite' => $total_parasite,
      ]);
    }


}
