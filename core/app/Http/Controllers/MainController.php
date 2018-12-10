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

    public function action(Request $request)
    {
      // dd($request->all());
      switch($request->all()['action'])
      {
        case 'action':
          $exploitation = new ExploitationFactory($request->all());
          break;

        case 'demo':
          $demo = new Demo();
          $exploitation = $demo->exploitation();
          break;

        case 'param':
        return redirect()->route('param');

        default:
        dd('defaut');
      }

      $liste_mois = $this->listeMois($exploitation->dates()['mise_a_l_herbe'], $exploitation->dates()['duree_paturage']);

      $param_biologiques = Constantes::param_bio();

      return view('gos_main', [
        'param_biologiques' => $param_biologiques,
        'pas_de_temps' => Constantes::PAS_DE_TEMPS,
        'liste_mois' => $liste_mois,
        'troupeau' => $exploitation->troupeau(),
        'liste_parcelles' => $exploitation->dessinparcellaire(),
        'dates' => $exploitation->dates(),
      ]);
    }

    public function param()
    {
      return view('param');
    }
}
