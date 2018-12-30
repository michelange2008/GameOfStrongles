@extends('layouts.main')

@section('menu')


@endsection

@section('content')

<div id="gos">
  @include('titre')
  @include('gos', [
    'parametres' => $parametres,
    'liste_mois' => $liste_mois,
    'troupeau' => $troupeau,
    'liste_parcelles' => $liste_parcelles,
    'dates' => $dates])
</div>

@endsection
