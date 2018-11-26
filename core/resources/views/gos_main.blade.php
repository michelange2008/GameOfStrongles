@extends('layouts.main')

@section('content')

<div class="container-fluid">

  <div id="" class="bandeau alert alert-success rounded-0">
    <h1 class='titre'>GAME <span class="petit">OF</span> STRONGLES</h1>
    <img id="epee" src="{{config('fichiers.svg')}}gos.svg" alt="reset" title="recommencer">
  </div>
  <div id="main" class="row">
    <div id="moniteur" class="infos col-sm-2">
      <div id="resultats" class="bandeau alert rounded-0">
        <h5 class="titre">Situation</h5>
      </div>
      <div class="cadran">
        <div class="titre">
          <h6 class="">date</h6>
        </div>
        <p id="date" data="{{$mise_a_l_herbe->toDateTimeString()}}" style="text-align:center">{{$mise_a_l_herbe->day}} {{$mise_a_l_herbe->localeMonth}}</p>
      </div>
    </div>
    <div id="plateau" class="col-sm-10">
      <div id="temps" class="time-line">
        <div class="saison">
          @foreach ($liste_mois as $mois)
            <div id="month" class="mois" style="width:{{$mois['nb_jours']}}%">
              {{$mois['mois']->localeMonth}}
            </div>
          @endforeach
        </div>
        <div id="curseur" class="cursor">
        </div>
      </div>

      <div id="exploitation">
        <div id="chevrerie" class="etable">
          <div id="troupeau" class="flock"
                espece="{{$troupeau->espece()}}"
                taille="{{$troupeau->taille()}}"
                infestation="{{$troupeau->infestation()->count()}}"
                contaminant = "{{$troupeau->contaminant()}}"
                lieu="chevrerie">
                {{-- <img src="{{config('fichiers.svg').$troupeau->espece().".svg"}}" alt="{{$troupeau->espece()}}"> --}}
            @foreach ($troupeau->infestation() as $strongle)
              <div class="strongleIn" etat="{{$strongle->etat()}}">

              </div>
            @endforeach
          </div>
        </div>
        <div id="ensemble-parcelles" class="parcellaire">
          @foreach ($liste_parcelles->listeDessinparcelles() as $parcelle)
            <div id="pature_{{$parcelle->id()}}" class="pature" style="width:{{$parcelle->longueurRelative()}}%; height:{{$parcelle->longueurRelative()}}vh">
              @foreach ($parcelle->parcelle()->infestation() as $strongle)
                <div id="parasite" class="lot strongleOut" name="parasite">
                  @foreach ($strongle->lot() as $element)
                    <div class="parasite" style="left:{{$element['x']}}%;top:{{$element['y']}}%">

                    </div>
                  @endforeach
                </div>
              @endforeach
              <p class="pature-nom">{{$parcelle->parcelle()->nom()}}</p>
            </div>
          @endforeach
        </div>
      </div>
    </div>
  </div>
</div>

@endsection
