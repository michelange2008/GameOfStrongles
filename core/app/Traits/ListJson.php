<?php
namespace App\Traits;

/**
 *
 */
trait LitJson
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
}
