@extends('layouts.main')

@section('menu')

@include('titre')

@endsection

@section('content')
<h2 style="color:white; margin-left: 1rem">modification des paramètres</h2>

<div class="categories">
  <h5 class="categories-titres">Biologie des strongles</h5>
  <div class="categories-biologie">
    <div class="categories-biologie-cycle">
      <img src="{{config('fichiers.svg')}}cycle.svg" alt="">
    </div>
    <div id="L3_infestante" class="champs">
      <label for="L3_infestante">{{ucfirst($param_bio->L3_infestante->nom)}}</label>
      <div class="">
        <input type="number" name="L3_infestante" value="{{$param_bio->L3_infestante->valeur}}" size=3>
        <span>jours</span>
      </div>
    </div>
    <div id="L3_morte" class="champs">
      <label for="L3_morte">{{ucfirst($param_bio->L3_morte->nom)}}</label>
      <div class="">
        <input type="number" name="L3_morte" value="{{$param_bio->L3_morte->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="periode_prepatente" class="champs">
      <label for="periode_prepatente">{{ucfirst($param_bio->periode_prepatente->nom)}}</label>
      <div class="">
        <input type="number" name="periode_prepatente" value="{{$param_bio->periode_prepatente->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="adulte_mort" class="champs">
      <label for="adulte_mort">{{ucfirst($param_bio->adulte_mort->nom)}}</label>
      <div class="">
        <input type="number" name="adulte_mort" value="{{$param_bio->adulte_mort->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="pathogen" class="champs">
      <label for="pathogen">{{ucfirst($param_bio->pathogen->nom)}}</label>
      <div class="">
        <input type="number" name="pathogen" value="{{$param_bio->pathogen->valeur}}">
      </div>
    </div>
  </div>
</div>
</div>
@endsection
