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
    @foreach ($parametres as $key => $value)
      @if ($value->type == "biologie")
          @if ($key == "PATHOGEN")
            <div id="{{$key}}" class="champs">
              <label for="{{$key}}">{{ucfirst($value->nom)}}</label>
              <div class="">
                <select id="pathogen" class="zone_saisie" name="pathogen">
                  @foreach ($value->option as $clef => $pathogenicite)
                    <option value="{{ucfirst($pathogenicite->degre)}}">{{$pathogenicite->intitule}}</option>
                  @endforeach
                </select>
              </div>
            </div>
          @else
          <div id="{{$key}}" class="champs">
            <label for="{{$key}}">{{ucfirst($value->nom)}}</label>
            <div class="">
              <input id="{{$key}}" class="zone_saisie" type="number" name="{{$key}}" value="{{$value->valeur}}" size=3>
              <span>jours</span>
            </div>
          </div>
        @endif
      @endif
    @endforeach
    {{-- <div id="L3_infestante" class="champs">
      <label for="L3_infestante">{{ucfirst($parametres->L3_INFESTANTE->nom)}}</label>
      <div class="">
        <input id="L3_infestante" class="zone_saisie" type="number" name="L3_infestante" value="{{$parametres->L3_INFESTANTE->valeur}}" size=3>
        <span>jours</span>
      </div>
    </div>
    <div id="L3_morte" class="champs">
      <label for="L3_morte">{{ucfirst($parametres->L3_MORTE->nom)}}</label>
      <div class="">
        <input id="L3_morte" class="zone_saisie" type="number" name="L3_morte" value="{{$parametres->L3_MORTE->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="periode_prepatente" class="champs">
      <label for="periode_prepatente">{{ucfirst($parametres->PERIODE_PREPATENTE->nom)}}</label>
      <div class="">
        <input id="periode_prepatente" class="zone_saisie" type="number" name="periode_prepatente" value="{{$parametres->PERIODE_PREPATENTE->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="adulte_mort" class="champs">
      <label for="adulte_mort">{{ucfirst($parametres->ADULTE_MORT->nom)}}</label>
      <div class="">
        <input id="adulte_mort" class="zone_saisie" type="number" name="adulte_mort" value="{{$parametres->ADULTE_MORT->valeur}}">
        <span>jours</span>
      </div>
    </div>
    <div id="pathogen" class="champs">
      <label for="pathogen">{{ucfirst($parametres->PATHOGEN->nom)}}</label>
      <div class="">
        <select id="pathogen" class="zone_saisie" name="pathogen">
          <option value="{{ucfirst($parametres->PATHOGEN->option->haemonchus_2->degre)}}">{{$parametres->PATHOGEN->option->haemonchus_2->intitule}}</option>
          <option value="{{ucfirst($parametres->PATHOGEN->option->haemonchus_1->degre)}}" selected>{{$parametres->PATHOGEN->option->haemonchus_1->intitule}}</option>
          <option value="{{ucfirst($parametres->PATHOGEN->option->haemonchus_0->degre)}}">{{$parametres->PATHOGEN->option->haemonchus_0->intitule}}</option>
        </select>
      </div>
    </div> --}}
    <div id="casque" class="helmet">
      <img src="{{config('fichiers.svg')}}helmet.svg" alt="ok ">
      <p style="color:white; text-align:center">OK</p>
    </div>
    <div id="param_model" class="model">
      <h5>Parametres du modele</h5>
      @foreach ($parametres as $key => $value)
        @if ($value->type == "modele")
          <div class="model-contenu">
            <label for="{{$key}}">{{ucfirst($value->nom)}}</label>
            <input class="input-modele" type="number" name="{{$key}}" value="{{$value->valeur}}">
          </div>
        @endif
    @endforeach
    </div>
  </div>
</div>
{!! Form::close() !!}
</div>
@endsection
