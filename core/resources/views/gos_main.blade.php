@extends('layouts.main')

@section('content')

<div class="container-fluid">
{{-- Panneau de titre --}}
  <div id="" class="bandeau alert alert-success rounded-0">
    <h1 class='titre'>GAME <span class="petit">OF</span> STRONGLES</h1>
    <img id="epee" src="{{config('fichiers.svg')}}gos.svg" alt="reset" title="recommencer">
  </div>
  {{-- Panneau principal --}}
  <div id="main" class="row">
    {{-- Panneau de gauche qui fait moniteur --}}
    <div id="moniteur" class="infos col-sm-2">
      <div id="resultats" class="bandeau alert rounded-0">
        <h5 class="titre">Situation</h5>
      </div>
      <div class="cadran">
        <div class="titre">
          <h6 class="">date</h6>
        </div>
        <p id="date" data="{{$mise_a_l_herbe->toAtomString()}}" style="text-align:center">{{$mise_a_l_herbe->day}} {{$mise_a_l_herbe->localeMonth}}</p>
      </div>
      <div class="cadran">
        <div class="titre">
            <h6>Troupeau</h6>
        </div>
        <div class="chiffres">
          <p class="soustitre" >Infestation: </p><p id="troupeau_infestation" class="valeur">{{$troupeau->infestation()->count()}}</p>
          <p class="soustitre">Excretion: </p><p id="troupeau_contaminant" class="valeur">{{$troupeau->contaminantForHuman()}}</p>
        </div>
      </div>
      <div class="cadran">
        <div class="titre">
          <h6>Parcelles</h6>
        </div>
        <div class="chiffres">
          @foreach ($liste_parcelles->listeDessinparcelles() as $dessinparcelle)
            <p class="soustitre">{{$dessinparcelle->parcelle()->nom()}}</p>
            <p class="valeur" >{{$dessinparcelle->parcelle()->contaminant()}} / {{$dessinparcelle->parcelle()->infestation()->count()}}</p>
          @endforeach
      </div>
      </div>
    </div>
    {{-- Grand panneau de droite avec time-line, troupeau et paturages --}}
    <div id="plateau" class="col-sm-10">
      <div id="temps" class="time-line" paturage="{{$duree_paturage}}">
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
            <div id="pature_{{$parcelle->id()}}"
              nom = "{{$parcelle->parcelle()->nom()}}"
              class="pature"
              style="width:{{$parcelle->longueurRelative()}}%; height:{{$parcelle->longueurRelative()}}vh"
              infestation = {{$parcelle->parcelle()->infestation()->count()}}
              contaminant = {{$parcelle->parcelle()-> contaminant()}}>
              @foreach ($parcelle->parcelle()->infestation() as $strongles)
                <div id="parasite_{{$loop->index}}_{{$parcelle->id()}}" class="lot strongleOut strongleOut_{{$parcelle->id()}}"
                  age = "{{$strongles->age()}}" pathogen = "{{$strongles->pathogen()}}"
                  etat = "{{$strongles->etat()}}">
                  @foreach ($strongles->lot() as $strongle)
                    <div class="{{$strongles->etat()}}" style="left:{{$strongle['x']}}%;top:{{$strongle['y']}}%">

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
