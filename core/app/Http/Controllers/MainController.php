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
      // définit la ligne de temps en fonction des dates de mise à l'herbe et d'entre en bergerie
      $liste_mois = $this->listeMois($exploitation->dates()['mise_a_l_herbe'], $exploitation->dates()['duree_paturage']);
      // récupère les paramètres biologiques
      $param_biologiques = Constantes::param_bio();

      return view('gos_main', [
        // TODO: qu'est ce qu'on fait du pas de temps?
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
      $param_json = file_get_contents(asset('core/resources/json/param.json'));
      $param_bio= json_decode($param_json);
      $param_bio->adulte_mort->valeur = 130;
      $param_json_nouveau = json_encode($param_bio, JSON_UNESCAPED_UNICODE);

      // Ouverture du fichier
      $fichier = fopen('core/resources/json/param.json', 'w+');
      // Ecriture dans le fichier
      fwrite($fichier, $param_json_nouveau);
      // Fermeture du fichier
      fclose($fichier);

      return view('param', [
        'param_bio' => $param_bio,
      ]);
    }

    public function ecritParamBio()
    {
      dd('enfin !');
    }
}
