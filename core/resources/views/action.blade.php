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
    <div class="categories-contenu-troupeau">
        <div class="categories-troupeau">
          @foreach ($liste_espece as $espece)
            <img id={{$espece["id"]}} class='image_troupeau' src="public/svg/{{$espece["url"]}}" alt="{{$espece["nom"]}}" title="{{$espece["nom"]}}">
            {{ Form::radio('troupeau', $espece["id"], '', ['class' => 'invisible'])}}
          @endforeach
        </div>
        <div class="categories-effectif">
          {{Form::number('effectif', '', ['placeholder' => "effectif"])}}
        </div>
    </div>
  </div>
  <div class="categories">
    <h5 class=" categories-titres" >Parcelles</h5>
    <div class="categories-contenu-parcelles">
      <div class="categories-contenu-ligne">
        <input type="text" name="parcelle-nom_0" value="" placeholder="nom de la parcelle">
        <input type="number" name="parcelle-taille_0" value="" placeholder="superficie">
        <select name="parcelle-histoire_0">
          @foreach ($historique_parcelle as $parcelle)
            <option value="{{$parcelle["infestation_initiale"]}}">{{$parcelle["nom"]}}</option>
          @endforeach
        </select>
      </div>
      <div class="categories-contenu-ligne">
        <input type="text" name="parcelle-nom_1" value="" placeholder="nom de la parcelle">
        <input type="number" name="parcelle-taille_1" value="" placeholder="superficie">
        <select name="parcelle-histoire_1">
          @foreach ($historique_parcelle as $parcelle)
            <option value="{{$parcelle["infestation_initiale"]}}">{{$parcelle["nom"]}}</option>
          @endforeach
        </select>
      </div>
    </div>
    <div id = "ajout" class="plus">
      +
    </div>
  </div>
</div>
{{Form::submit("c'est parti !")}}
{{ Form::close()}}
@endsection
