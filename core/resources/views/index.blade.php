{{ Form::open(['route' => 'action', "id" => "form"])}}
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
            <img id={{$espece->nom_court()}} class='image_troupeau' src="public/svg/{{$espece->icone()}}" alt="{{$espece->nom()}}" title="{{$espece->nom_court()}}">
            {{ Form::radio('troupeau', $espece->nom_court(), '', ['class' => 'invisible'])}}
          @endforeach
        </div>
        <div class="categories-effectif">
          {{Form::number('effectif', '', ['placeholder' => "effectif"])}}
        </div>
        <div class="categories-infestation">
          <input type="checkbox" name="infestation_troupeau" value="orange" checked>
          <p>Niveau d'infestation</p>
          <div id="vert" class="feu vert"></div>
          <div id="orange" class="feu orange feu-choisi"></div>
          <div id="rouge" class="feu rouge"></div>
        </div>
    </div>
  </div>
  <div class="categories">
    <h5 class="categories-titres">Saison de paturage</h5>
    <div class="categories-saison">
      <div id="slider"></div>
      <div style="display:none">
        <input id="mise_a_l_herbe" class="date" type="date" name="mise_a_l_herbe" value="2018-03-18">
        <input id="entre_bergerie" class="date" type="date" name="entre_bergerie" value="2018-10-22">
      </div>
    </div>
  </div>
  <div class="categories">
    <h5 class=" categories-titres" >Parcelles</h5>
    <div class="categories-contenu-parcelles" parcelle = true>
      <div class="categories-contenu-ligne">
        <input type="text" name="parcelle_nom_0" value="" placeholder="nom de la parcelle">
        <input type="number" name="parcelle_superficie_0" value="" placeholder="superficie">
        <select name="parcelle_histoire_0">
          @foreach ($parcelles_type as $parcelle_type)
            <option value="{{$parcelle_type->nom()}}">{{$parcelle_type->nom()}}</option>
          @endforeach
        </select>
      </div>
    </div>
    <div id = "ajout" class="plus">
      +
    </div>
  </div>
  <div id="boutons" class="categories">
    <input type="checkbox" name="action" value="aucune" style="display:none">
    <input type="submit" name="submit" value="C'est parti !" class="btn btn-success rounded-0 btn-lg">
    <div id="demo" class="btn btn-lg btn-warning rounded-0 demo">
      <img id="demo-img" src="public/svg/demo.svg" alt="démo" title="cliquez ici pour une démonstration">
      <p>Ou plutôt une démo</p>
    </div>
    <div id="param" class="btn btn-lg btn-danger rounded-0 demo">
      <img id="param-img" src="public/svg/param.svg" alt="paramètres" title="cliquez ici pour modifier les paramètres biologiques">
      <p>Modifier les paramètres</p>
    </div>
  </div>
</div>
{{ Form::close()}}
