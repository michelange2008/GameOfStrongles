<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Constantes\Constantes;
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

    public function action()
    {
      $liste_espece = [
        ["nom" => "chèvres", "id" => "caprins", "url" => "caprins_seuls.svg"],
        ["nom" => "brebis", "id" => "ovins", "url" => "ovins_seuls.svg"],
        ["nom" => "brebis + agneaux", "id" => "ovins_agneaux", "url" => "ovins_agneaux_seuls.svg"],
      ];

      $historique_parcelle = [
        ["nom" => "paturage","infestation_initiale" => 2, "taux_parcelle_contaminante" => 1],
        ["nom" => "pré de fauche","infestation_initiale" => 1, "taux_parcelle_contaminante" => 1],
        ["nom" => "nouvelle prairie","infestation_initiale" => 0,"taux_parcelle_contaminante" => 1],
        ["nom" => "parcours sous bois", "infestation_initiale" => 0, "taux_parcelle_contaminante" => 0],
      ];

      return view('action', [
        'liste_espece' => $liste_espece,
        'historique_parcelle' => $historique_parcelle,
      ]);
    }

    public function data(Request $request)
    {
      dd($request->all());
    }

    public function index()
    {
      //################### Données temporairesp pour créer les objets #########
      $troupeau_exemple = ['caprins', 50];
      $listes_parcelles = collect([
        ['nom' => 'petit champ', 'superficie' => 4, 'oeuf'=> 0, "L3" => 1],
        ['nom' => 'grand pré', 'superficie' => 8, 'oeuf'=> 0, "L3" => 0],
        ['nom' => 'chez Marcel', 'superficie' => 0.5, 'oeuf'=> 0, "L3" => 0],
        ['nom' => 'en-bas', 'superficie' => 3, 'oeuf'=> 0, "L3" => 0],
        ['nom' => 'en-haut', 'superficie' => 10,  'oeuf'=> 0, "L3" => 1],
      ]);
      $nb_strongles_initial = 1;
      $mois = 3;
      $jour = 18;
      $duree_paturage = Constantes::DUREE_PATURAGE; // nombre de jours
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
        $parcelle->setInfestation(Constantes::AGE_L3_FIN_HIVER, $listes_parcelles[$i]['oeuf'], $listes_parcelles[$i]['L3']);

        $dessinparcelle = new Dessinparcelle($i, $parcelle); // On crée un objet dessinparcelle avec chaque parcelle
        $dessinparcellaire->addDessinparcelle($dessinparcelle); // On ajoute cet objet à la liste de l'objet dessinParcellaire
      }
      $dessinparcellaire->SetLongueur_et_X_DessinParcelle(); // On fixe les valeurs de X (position dans la page) et de longueur des objets dessinparcelle
      $param_biologiques = Constantes::param_bio();

      return view('gos_main', [
        'param_biologiques' => $param_biologiques,
        'mise_a_l_herbe' => $mise_a_l_herbe,
        'pas_de_temps' => Constantes::PAS_DE_TEMPS,
        'liste_mois' => $liste_mois,
        'troupeau' => $troupeau,
        'liste_parcelles' => $dessinparcellaire,
      ]);
    }
}
