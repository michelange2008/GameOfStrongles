<?php
namespace App\Traits;

use App\Constantes\Constantes;

/**
 *
 */
trait Decroissance
{
  function decroissance($nb_oeufs)
  {
    return 1 / exp(sqrt($nb_oeufs/CONSTANTES::DECROISSANCE));
  }
}
