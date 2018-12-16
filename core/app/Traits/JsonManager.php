<?php
namespace App\Traits;

/**
 *
 */
trait JsonManager
{
  function litJson($nom_fichier)
  {
    $param_json = file_get_contents(asset('core/resources/json/'.$nom_fichier));
    $param_bio= json_decode($param_json);
    return $param_bio;
  }

  public function litJsonTab($nom_fichier)
  {
    $param_json = file_get_contents(asset('core/resources/json/'.$nom_fichier));
    $param_bio= json_decode($param_json, true);
    return $param_bio;
  }

  public function ecritJson($fichier, $json)
  {
    $param_json_nouveau = json_encode($json, JSON_UNESCAPED_UNICODE);

    // Ouverture du fichier
    $fichier = fopen('core/resources/json/'.$fichier, 'w+');
    // Ecriture dans le fichier
    fwrite($fichier, $param_json_nouveau);
    // Fermeture du fichier
    fclose($fichier);
  }
}
