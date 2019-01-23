@extends('layouts.main')

@section('content')
<div id="page-index">
  @include('index', [
    'liste_espece' => $liste_espece,
    'parcelles_type' => $parcelles_type])
</div>
@endsection
@section('param')
<div id="page-param" class="">
  @include('titreParam')
  @include('param', [
    'parametres' => $parametres,
  ])
</div>
@endsection
@section('gos')
  <div id="page-gos" class="">
    @include('titre')
    @include('newgos')
  </div>
@endsection
@section('planning')
  <div id="page-planning" class="">
    @include('titre')
    @include('planning')
  </div>
@endsection
