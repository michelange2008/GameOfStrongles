@extends('layouts.main')

@section('content')

<div class="container-fluid">
  <div class="alert alert-success">
    <h3>Game of Strongles</h3>
  </div>
  <div class="panneau">
    <div id="temps" class="time-line">
      <div id="curseur" class="cursor">
    </div>
    </div>
    <div class="main">
      <div class="troupeaux">
        <div class="troupeau">
          <img id="CP" src="{{asset('public/svg')}}/CP.svg" alt="">
        </div>
      </div>
      <div id="paturage">
        @foreach ($parcelles as $key => $parcelle)
        <div id="pature_{{$key}}" class="pature"
          style="width:{{$parcelle['longueur_cote']}}%; height:{{$parcelle['longueur_cote']}}vh">
          <p class="pature-nom">{{$parcelle['nom']}}</p>
          @foreach ($total_parasite as $lot)
            <div class="lot invisible">
              @foreach ($lot as $key => $value)
                <div class="parasite" style="left:{{$value['x']}}%; top:{{$value['y']}}%">
                </div>
              @endforeach
            </div>
          @endforeach
        </div>
      @endforeach
    </div>
  </div>
    <div class="infos">
      <p>Paturage: <span id="jour_paturage"></span> jours</p>
      <p>Contamination: <span id="jour_contamination"></span> jours</p>
      <p>hue: <span id="hue"></span></p>
    </div>
  </div>
</div>
@endsection
