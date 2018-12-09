<?php
namespace App\Factory;

use App\Models\Parcelle;
use App\Models\Dessinparcelle;
use App\Models\Dessinparcellaire;
use App\Constantes\Constantes;
/**
* classe destinée à fabriquer le dessin parcellaire au sortir de l'hiver à partir
* d'une liste de parcelles constituée d'un tableau où chaque parcelle a un nom,
* une superficie, un nombre d'oeufs et un nombre de larves infestantes
* ça renvoie un objet Dessinparcellaire constitué d'un liste d'objets Dessinparcelle
*/
class ParcelleFactory
{
  protected $dessinparcellaire;

  public function __construct($listes_parcelles)
  {
    $this->dessinparcellaire = new Dessinparcellaire(); // Nouvel objet dessinParcellaire
    for($i = 0; $i < count($listes_parcelles); $i++) { // On boucle sur la liste des parcelles
      if($listes_parcelles[$i]['nom'] !== null)
      {
        $parcelle = new Parcelle($listes_parcelles[$i]['nom'], $listes_parcelles[$i]['superficie']);
        $parcelle->setInfestation(Constantes::AGE_L3_FIN_HIVER, $listes_parcelles[$i]['oeuf'], $listes_parcelles[$i]['L3']);

        $dessinparcelle = new Dessinparcelle($i, $parcelle); // On crée un objet dessinparcelle avec chaque parcelle
        $this->dessinparcellaire->addDessinparcelle($dessinparcelle); // On ajoute cet objet à la liste de l'objet dessinParcellaire
      }
    }
    $this->dessinparcellaire->SetLongueur_et_X_DessinParcelle(); // On fixe les valeurs de X (position dans la page) et de longueur des objets dessinparcelle
  }

  public function dessinParcellaire()
  {
    return $this->dessinparcellaire;
  }
}
