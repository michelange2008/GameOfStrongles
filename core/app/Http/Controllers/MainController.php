<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
<<<<<<< HEAD
=======
use Carbon\Carbon;

use App\Constantes\Constantes;

>>>>>>> d4b5ccd8198ab7b49ae08e336cd0f57344376398
use App\Models\Troupeau;
use App\Models\Parcelle;
use App\Traits\NbLignes;

class MainController extends Controller
{
  use NbLignes;

    public function index()
    {
<<<<<<< HEAD
      $troupeau = new Troupeau('caprins', 50);
=======
      //################### Données temporairesp pour créer les objets #########
      $troupeau_exemple = ['caprins', 50];
      $listes_parcelles = collect([
        ['nom' => 'petit champ', 'superficie' => 4, 'oeuf'=> 0, "L3" => 1],
        ['nom' => 'grand pré', 'superficie' => 8, 'oeuf'=> 0, "L3" => 0],
        ['nom' => 'chez Marcel', 'superficie' => 0.5, 'oeuf'=> 0, "L3" => 1],
        ['nom' => 'en-bas', 'superficie' => 3, 'oeuf'=> 0, "L3" => 0],
        ['nom' => 'en-haut', 'superficie' => 10,  'oeuf'=> 0, "L3" => 3],
      ]);
      $nb_strongles_initial = 1;
      $mois = 3;
      $jour = 18;
      $duree_paturage = Constantes::DUREE_PATURAGE; // nombre de jours
      $mise_a_l_herbe = Carbon::createFromDate(Carbon::now()->year, $mois, $jour);
      $liste_mois = $this->listeMois($mise_a_l_herbe, $duree_paturage);
      // dd($liste_mois);
      //########################################################################
>>>>>>> d4b5ccd8198ab7b49ae08e336cd0f57344376398

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

<<<<<<< HEAD
      $listes_parcelles = collect([
        ['nom' => 'petit champ', 'superficie' => 4],
        ['nom' => 'grand pré', 'superficie' => 8],
        ['nom' => 'chez Marcel', 'superficie' => 0.5],
        ['nom' => 'en-bas', 'superficie' => 3],
        ['nom' => 'en-haut', 'superficie' => 10],
      ]);
      $longueurs_cotes = $listes_parcelles->sum('longueur_cote');
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
=======
      //#################### CREATION D'UN NOUVEAU TROUPEAU ####################
      $troupeau = new Troupeau($troupeau_exemple[0], $troupeau_exemple[1]);
      $troupeau->setInfestation($nb_strongles_initial);

      //################## CREATION DE LA LISTE DES PARCELLES À DESSINER ######################
      $dessinparcellaire = new Dessinparcellaire(); // Nouvel objet dessinParcellaire
      for($i = 0; $i < $listes_parcelles->count(); $i++) { // On boucle sur la liste des parcelles
        $parcelle = new Parcelle($listes_parcelles[$i]['nom'], $listes_parcelles[$i]['superficie']);
        $parcelle->setInfestation($listes_parcelles[$i]['oeuf'], $listes_parcelles[$i]['L3']);

        $dessinparcelle = new Dessinparcelle($i, $parcelle); // On crée un objet dessinparcelle avec chaque parcelle
        $dessinparcellaire->addDessinparcelle($dessinparcelle); // On ajoute cet objet à la liste de l'objet dessinParcellaire
      }

      $dessinparcellaire->SetLongueur_et_X_DessinParcelle(); // On fixe les valeurs de X (position dans la page) et de longueur des objets dessinparcelle
// dd($dessinparcellaire);
      return view('gos_main', [
        'duree_paturage' => $duree_paturage,
        'mise_a_l_herbe' => $mise_a_l_herbe,
        'liste_mois' => $liste_mois,
        'troupeau' => $troupeau,
        'liste_parcelles' => $dessinparcellaire,
>>>>>>> d4b5ccd8198ab7b49ae08e336cd0f57344376398
      ]);
    }


}
