@extends('layouts.main')

@section('menu')

@include('titre')

@endsection

@section('content')
<h2 style="color:white; margin-left: 1rem">modification des paramètres</h2>
{!! Form::open(['route' => 'ecritParamBio']) !!}
<div class="categories">
  <h5 class="categories-titres">Biologie des strongles</h5>
  <div class="categories-biologie">
    <div class="categories-biologie-cycle">
      <img src="{{config('fichiers.svg')}}cycle.svg" alt="">
    </div>
    <div id="L3_infestante" class="champs">
      <label for="L3_infestante">{{ucfirst($param_bio->L3_INFESTANTE->nom)}}</label>
      <div class="">
        <input id="L3_infestante" class="zone_saisie" type="number" name="L3_infestante" value="{{$param_bio->L3_INFESTANTE->valeur}}" size=3>
        <span>jours</span>
      </div>
    </div>
    <div id="L3_morte" class="champs">
      <label for="L3_morte">{{ucfirst($param_bio->L3_MORTE->nom)}}</label>
      <div class="">
        <input id="L3_morte" class="zone_saisie" type="number" name="L3_morte" value="{{$param_bio->L3_MORTE->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="periode_prepatente" class="champs">
      <label for="periode_prepatente">{{ucfirst($param_bio->PERIODE_PREPATENTE->nom)}}</label>
      <div class="">
        <input id="periode_prepatente" class="zone_saisie" type="number" name="periode_prepatente" value="{{$param_bio->PERIODE_PREPATENTE->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="adulte_mort" class="champs">
      <label for="adulte_mort">{{ucfirst($param_bio->ADULTE_MORT->nom)}}</label>
      <div class="">
        <input id="adulte_mort" class="zone_saisie" type="number" name="adulte_mort" value="{{$param_bio->ADULTE_MORT->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="pathogen" class="champs">
      <label for="pathogen">{{ucfirst($param_bio->PATHOGEN->nom)}}</label>
      <div class="">
        <select id="pathogen" class="zone_saisie" name="pathogen">
          <option value="{{ucfirst($param_bio->PATHOGEN->option->haemonchus_2->degre)}}">{{$param_bio->PATHOGEN->option->haemonchus_2->intitule}}</option>
          <option value="{{ucfirst($param_bio->PATHOGEN->option->haemonchus_1->degre)}}" selected>{{$param_bio->PATHOGEN->option->haemonchus_1->intitule}}</option>
          <option value="{{ucfirst($param_bio->PATHOGEN->option->haemonchus_0->degre)}}">{{$param_bio->PATHOGEN->option->haemonchus_0->intitule}}</option>
        </select>
      </div>
    </div>
    <div id="casque" class="helmet">
      <img src="{{config('fichiers.svg')}}helmet.svg" alt="ok ">
      <p style="color:white; text-align:center">OK</p>
    </div>
    <div id="param_model" class="model">
      <h5>Parametres du modele</h5>
      @foreach ($param_modele as $key => $value)
      <div class="model-contenu">
          <label for="{{$key}}">{{ucfirst($value["nom"])}}</label>
          <input class="input-modele" type="number" name="{{$key}}" value="{{$value["valeur"]}}">
      </div>
    @endforeach
    </div>
  </div>
</div>
{!! Form::close() !!}
</div>
@endsection
