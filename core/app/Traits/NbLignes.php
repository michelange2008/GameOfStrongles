<?php
namespace App\Traits;

/**
 *
 */
trait NbLignes
{
  function nblignes($x)
  {
    switch ($x) {
      case 1:
        return 1;
        break;
      case 2:
        return 1;
        break;
      case 3:
        return 1;
        break;
      case 4:
        return 2;
      case 5:
        return 2;
      case 6:
        return 2;
      case 7:
        return 3;
      case 8:
        return 3;
      case 9:
        return 3;
      default:
        return 4;
        break;
    }
  }}
