@extends('layouts.main')

@section('menu')

@include('titre')

@endsection

@section('content')
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
        <p id="date" data="{{$dates['mise_a_l_herbe']->toAtomString()}}"
          style="text-align:center">{{$dates['mise_a_l_herbe']->day}} {{$dates['mise_a_l_herbe']->localeMonth}}</p>
        <p class="moyen">(pas de temps : <span id="pas_de_temps" title="modifier le pas de temps (jours)">{{$parametres['PAS_DE_TEMPS']['valeur']}}</span> jours)</p>
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
            <p id="valeur_{{$dessinparcelle->id()}}" class="valeur" >{{$dessinparcelle->parcelle()->contaminant()}} / {{$dessinparcelle->parcelle()->infestation()->count()}}</p>
          @endforeach
      </div>
      </div>
    </div>
    {{-- Grand panneau de droite avec time-line, troupeau et paturages --}}
    <div id="plateau" class="col-sm-10">
      <div id="temps" class="time-line" paturage="{{$dates['duree_paturage']}}">
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
                contaminant = "{{$troupeau->contaminant()*$troupeau->taille()/$parametres["TAUX_TROUPEAU_CONTAMINANT"]["valeur"]}}"
                lieu="chevrerie">
                <img src="{{config('fichiers.svg').$troupeau->espece().".svg"}}" alt="{{$troupeau->espece()}}">
            @foreach ($troupeau->infestation() as $strongle)
              <div class="strongleIn" etat="{{$strongle->etat()}}">

              </div>
            @endforeach
          </div>
        </div>
        <div id="foncier" class="parcellaire">
          @foreach ($liste_parcelles->listeDessinparcelles() as $parcelle)
          <div id="pature_{{$parcelle->id()}}"
            class="pature"
            style="width:{{$parcelle->longueurRelative()}}%; height:{{$parcelle->longueurRelative()}}vh"
            superficie = "{{$parcelle->parcelle()->superficie()}}"
            nom = "{{$parcelle->parcelle()->nom()}}"
            >
            <div id="parcelle_{{$parcelle->id()}}_0"
              class="parcelle"
              proportion = "100"
              infestation = "{{$parcelle->parcelle()->infestation()->count()}}"
              contaminant = "{{$parcelle->parcelle()-> contaminant()/($parcelle->parcelle()->superficie() * $parametres['TAUX_PARCELLE_CONTAMINANTE']['valeur'])}}"
            >
              @foreach ($parcelle->parcelle()->infestation() as $strongle)
              <div id="parasite_{{$loop->index}}_{{$parcelle->id()}}" class="{{$strongle->etat()}}"
                age = "{{$strongle->age()}}"
                pathogen = "{{$strongle->pathogen()}}"
                etat = "{{$strongle->etat()}}"
                style="left:{{$strongle->localisation()['x']}}%;top:{{$strongle->localisation()['y']}}%">
              </div>
              @endforeach
            </div>
            <div id="entete_{{$parcelle->parcelle()->nom()}}" class="entete">
              <p class="pature-nom">{{$parcelle->parcelle()->nom()}}</p>
              <p class="somme-des-jours"><span id="jours_{{$parcelle->id()}}" class="compte-jours">0</span><span class="jours"> j.</span></p>
              <div id="divise_{{$parcelle->id()}}" class="divise">
                <img src="{{config('fichiers.svg')}}divise.svg" alt="divise" title="diviser la parcelle">
              </div>
            </div>
          </div>
          @endforeach
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
