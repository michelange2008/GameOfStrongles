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
    $json= json_decode($param_json);
    return $json;
  }

  public function litJsonTab($nom_fichier)
  {
    $param_json = file_get_contents(asset('core/resources/json/'.$nom_fichier));
    $json= json_decode($param_json, true);
    return $json;
  }

  public function ecritJson($fichier, $json)
  {
    $json_nouveau = json_encode($json, JSON_UNESCAPED_UNICODE);

    // Ouverture du fichier
    $file = fopen('core/resources/json/'.$fichier, 'w');
    // Ecriture dans le fichier

    fwrite($file, $json_nouveau);
    // Fermeture du fichier
    fclose($file);
  }
}
