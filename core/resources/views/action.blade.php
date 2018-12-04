@extends('layouts.main')

@section('content')
{{ Form::open(['route' => 'data'])}}
<div class="container-fluid">
  <div class="main-titre titre">
    <div class="main-titre-texte">
      <h1 class="">Game</h1>
      <h3 id="of" class="">of</h3>
      <h1 class="">Strongles</h1>
    </div>
    <div class="main-titre-image">
      <img src="public/haemonchus-petit.png" alt="haemonchus contortus">
    </div>
  </div>
  <div class="categories">
    <h5 class="categories-titres" >Troupeau</h5>
    <div class="categories-contenu">
        <div class="categorie-troupeau">

        </div>
        <div class="categorie-effectif">
          {{Form::number('effectif', '', ['placeholder' => "nombre d'animaux"])}}
        </div>
    </div>
  </div>
  <div class="categories">
    <h5 class=" categories-titres" >Parcelles</h5>
    <div class="categories-contenu">

    </div>
  </div>
</div>
{{Form::submit("c'est parti !")}}
{{ Form::close()}}
@endsection
