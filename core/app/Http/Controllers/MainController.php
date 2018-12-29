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
use App\Traits\ExploitationTransform;

use App\Traits\NbLignes;
use App\Traits\ListeMois;
use App\Traits\JsonManager;

class MainController extends Controller
{
  use NbLignes;
  use ListeMois;
  use JsonManager;
  use ExploitationTransform;

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
    // affiche soit le plateau de jeu, soit la démonstration soit la modif des param bio
    public function action(Request $request)
    {
      switch($request->all()['action']) // en fonction du bouton cliqué
      {
        case 'action': // mise en oeuvre du jeu en fonction des parametres
          $exploitation = new ExploitationFactory($request->all());
          break;

        case 'demo': // mis en jeu de la démonstration
          $demo = new Demo();
          $exploitation = $demo->exploitation();
          break;

        case 'param': // modification des parametres biologiques
        return redirect()->route('param');

        default:
        dd('defaut');
      }
      $json_expl = $this->transform($exploitation);

      foreach ($json_expl as $key => $value) {
        $this->ecritJson($key.".json", $value);
      }
      // définit la ligne de temps en fonction des dates de mise à l'herbe et d'entre en bergerie
      $liste_mois = $this->listeMois($exploitation->dates()['mise_a_l_herbe'], $exploitation->dates()['duree_paturage']);

      // récupère les paramètres biologiques
      $parametres = $this->litJsonTab("parametres.json");

      return view('gos_main', [
        'parametres' => $parametres,
        'liste_mois' => $liste_mois,
        'troupeau' => $exploitation->troupeau(),
        'liste_parcelles' => $exploitation->dessinparcellaire(),
        'dates' => $exploitation->dates(),
      ]);
    }

    public function param()
    {
      $parametres = $this->litJson('parametres.json'); // ouvre et décode le fichier json grâce au trait LitJson
      return view('param', [
        'parametres' => $parametres,
      ]);
    }

    public function ecritParamBio(Request $request)
    {

      $nom = $request->nom;
      $valeur = $request->valeur;
      $parametres= $this->litJson("parametres.json"); // ouvre et décode le fichier json grâce au trait LitJson
      $parametres->$nom->valeur = $valeur;

      $this->ecritJson("parametres.json", $parametres); // on écrit les nouvelles valeurs grâce au trait EcritJson
      return '{"ok": "ça va"}';
    }

}
