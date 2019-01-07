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
          @endforeach
        </div>
        <div class="categories-effectif">
          <input placeholder="effectif" name="effectif" type="number" value="">
        </div>
        <div class="categories-infestation">
          <p>Niveau d'infestation</p>
          <div id="vert" class="feu vert" title="troupeau non infesté"></div>
          <div id="orange" class="feu orange" title="troupeau avec une infestation modérée"></div>
          <div id="rouge" class="feu rouge" title="troupeau infesté"></div>
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
    <h5 class=" categories-titres" >Patures</h5>
    <div class="categories-contenu-patures">
      <div id="liste_patures" class="sous-categories gauche">
        <div class="categories-contenu-ligne">
          <input class="pature-nom" type="text" name="pature_nom_0" value="" placeholder="nom de la pature">
          <input class="pature-superficie" type="number" name="pature_superficie_0" value="" placeholder="superficie" disabled=true>
          <select id="pature_histoire_0" class="pature-histoire" name="pature_histoire_0" disabled=true>
          </select>
          <img id="efface_0" class="efface-ligne" src="public/svg/efface.svg">
        </div>
      </div>
      <div class="sous-categories droite">
        <div id="efface" class="btn btn-lg btn-danger rounded-0 demo">
          <img id="demo-img" src="public/svg/efface.svg" alt="démo" title="cliquez ici pour une démonstration">
          <p>Tout effacer</p>
        </div>
        <div id="demo" class="btn btn-lg btn-warning rounded-0 demo">
          <img id="demo-img" src="public/svg/demo.svg" alt="démo" title="cliquez ici pour une démonstration">
          <p>Ou plutôt une démo</p>
        </div>
      </div>
    </div>
    <div id = "ajout" class="plus">
      +
    </div>
  </div>
  <div id="boutons" class="categories">
    <div id="start" class="btn btn-lg btn-success rounded-0 demo">
      <img id="start-img" src="public/svg/start.svg" alt="paramètres" title="cliquez ici pour modifier les paramètres biologiques">
      <p>C'est parti !</p>
    </div>

    <div id="param" class="btn btn-lg btn-secondary rounded-0 demo">
      <img id="param-img" src="public/svg/param.svg" alt="paramètres" title="cliquez ici pour modifier les paramètres biologiques">
      <p>Modifier les paramètres</p>
    </div>
  </div>
</div>
{{ Form::close()}}
