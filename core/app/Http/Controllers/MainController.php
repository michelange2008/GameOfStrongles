<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Constantes\Constantes;
use App\Factory\ParcelleFactory;
use App\Factory\ExploitationFactory;
use App\Factory\Demo;
use App\Factory\ListeEspeces;
use App\Factory\ParcellesTypes;

use App\Models\Troupeau;
use App\Models\StrongleIn;
use App\Models\StrongleOut;
use App\Traits\NbLignes;
use App\Traits\ListeMois;
class MainController extends Controller
{
  use NbLignes;
  use ListeMois;

  protected $exploitation;

    public function index()
    {
      $parcelles_type = new ParcellesTypes();
      $especes = new ListeEspeces();

      return view('index', [
        'liste_espece' => $especes->especes(),
        'parcelles_type' => $parcelles_type->listeParcellesType(),
      ]);
    }

    public function data(Request $request)
    {
      // dd($request->all());
      switch($request->all()['action'])
      {
        case 'action':
          $this->exploitation = new ExploitationFactory($request->all());
          dump($this->exploitation);
          break;

        case 'demo':
          $demo = new Demo();
          $this->exploitation = $demo->exploitation();
          return redirect()->route('action');

        case 'param':
        dd('param');

        default:
        dd('defaut');
      }
    }

    public function action()
    {
      //################### Données temporaires pour créer les objets #########
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

      //#################### CREATION D'UN NOUVEAU TROUPEAU ####################
      $troupeau = new Troupeau($troupeau_exemple[0], $troupeau_exemple[1]);
      $troupeau->setInfestation($nb_strongles_initial);
      //################## CREATION DE LA LISTE DES PARCELLES À DESSINER ######################
      $parcelleFactory = new ParcelleFactory($listes_parcelles);

      $param_biologiques = Constantes::param_bio();

      return view('gos_main', [
        'param_biologiques' => $param_biologiques,
        'mise_a_l_herbe' => $mise_a_l_herbe,
        'pas_de_temps' => Constantes::PAS_DE_TEMPS,
        'liste_mois' => $liste_mois,
        'troupeau' => $troupeau,
        'liste_parcelles' => $parcelleFactory->dessinParcellaire(),
      ]);
    }
}
