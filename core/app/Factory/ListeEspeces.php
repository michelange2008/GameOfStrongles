<?php
namespace App\Factory;

use App\Models\Espece;

class ListeEspeces
{
  protected $especes;

  public function __construct()
  {
    $this->especes = collect();
    $this->especes->push(new Espece('chèvres', 'caprins', 2, 'caprins_seuls.svg'));
    $this->especes->push(new Espece('brebis', 'ovins', 1, 'ovins_seuls.svg'));
    $this->especes->push(new Espece('brebis + agneaux', 'ovins_agneaux', 3, 'ovins_agneaux_seuls.svg'));
  }

  public function especes()
  {
    return $this->especes;
  }
}
