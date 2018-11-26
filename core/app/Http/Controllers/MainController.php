<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\Troupeau;
use App\Models\Parcelle;
use App\Models\Dessinparcelle;
use App\Models\Dessinparcellaire;
use App\Models\StrongleIn;
use App\Models\StrongleOut;
use App\Traits\NbLignes;
use App\Traits\ListeMois;

class MainController extends Controller
{
  use NbLignes;
  use ListeMois;

    public function index()
    {
      //################### Données temporairesp pour créer les objets #########
      $troupeau_exemple = ['caprins', 50];
      $listes_parcelles = collect([
        ['nom' => 'petit champ', 'superficie' => 4],
        ['nom' => 'grand pré', 'superficie' => 8],
        ['nom' => 'chez Marcel', 'superficie' => 0.5],
        ['nom' => 'en-bas', 'superficie' => 3],
        ['nom' => 'en-haut', 'superficie' => 10],
      ]);
      $nb_strongles_initial = 1;
      $mois = 3;
      $jour = 18;
      $duree_paturage = 200; // nombre de jours
      $mise_a_l_herbe = Carbon::createFromDate(Carbon::now()->year, $mois, $jour);
      $liste_mois = $this->listeMois($mise_a_l_herbe, $duree_paturage);
      // dd($liste_mois);
      //########################################################################

      //################## Création des lots de strongles ######################
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
      //########################################################################

      //#################### CREATION D'UN NOUVEAU TROUPEAU ####################
      $troupeau = new Troupeau($troupeau_exemple[0], $troupeau_exemple[1]);
      $troupeau->setInfestation($nb_strongles_initial);

      //################## CREATION DE LA LISTE DES PARCELLES À DESSINER ######################
      $dessinparcellaire = new Dessinparcellaire(); // Nouvel objet dessinParcellaire
      for($i = 0; $i < $listes_parcelles->count(); $i++) { // On boucle sur la liste des parcelles
        $parcelle = new Parcelle($listes_parcelles[$i]['nom'], $listes_parcelles[$i]['superficie']);
        $parcelle->setInfestation($nb_strongles_initial);
        $dessinparcelle = new Dessinparcelle($i, $parcelle); // On crée un objet dessinparcelle avec chaque parcelle
        $dessinparcellaire->addDessinparcelle($dessinparcelle); // On ajoute cet objet à la liste de l'objet dessinParcellaire
      }
      $dessinparcellaire->SetLongueur_et_X_DessinParcelle(); // On fixe les valeurs de X (position dans la page) et de longueur des objets dessinparcelle
// dd($dessinparcellaire);
      return view('gos_main', [
        'mise_a_l_herbe' => $mise_a_l_herbe,
        'liste_mois' => $liste_mois,
        'troupeau' => $troupeau,
        'liste_parcelles' => $dessinparcellaire,
      ]);
    }


}
