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
  @include('param', [
    'parametres' => $parametres,
  ])
</div>
@endsection
@section('gos')
  <div id="page-gos" class="">
    @include('titre-gos')
    @include('newgos')
  </div>
@endsection
@section('planning')
  <div id="page-planning" class="">
    @include('titre-planning')
    @include('planning')
  </div>
@endsection
