{!! Form::open(['route' => 'action', "id" => "form"]) !!}
<div class="categories">
  <h5 class="categories-titres">Biologie des strongles</h5>
  <div class="categories-biologie">
    <div class="categories-biologie-cycle">
      <img src="{{config('fichiers.svg')}}cycle.svg" alt=""> //<!-- affiche le cycle des strongles-->
    </div>
    @foreach ($parametres as $key => $value) <!-- on passe en revue les parametres-->
      @if ($value->type == "biologie") <!-- si ce sont des parametres biologiques, on boucle-->
          @if ($key == "PATHOGEN") <!-- sur la pathogénicité il faut un champs "option" particulier -->
            <div id="{{$key}}" class="champs">
              <label for="{{$key}}">{{ucfirst($value->nom)}}</label>
              <div class="">
                <select id="{{$key}}" class="zone_saisie" name="{{$key}}">
                  @foreach ($value->option as $clef => $pathogenicite)
                    <option value="{{ucfirst($pathogenicite->degre)}}">{{$pathogenicite->intitule}}</option>
                  @endforeach
                </select>
              </div>
            </div>
          @else <!-- Pour les autres parametres un champ input suffit-->
          <div id="{{$key}}" class="champs" title="cliquer pour en savoir plus">
            <label for="{{$key}}">{{ucfirst($value->nom)}}</label>
            <div class="">
              <input id="{{$key}}" class="zone_saisie" type="number" name="{{$key}}" value="{{$value->valeur}}" size=3>
              <span>jours</span>
            </div>
          </div>
        @endif
      @endif
    @endforeach

    <div id="casque" class="helmet">
      <img src="{{config('fichiers.svg')}}helmet.svg" alt="ok ">
      <p style="color:white; text-align:center">OK</p>
    </div>
    <div id="param_model" class="model">
      <div id="titre-param-modele"><h5>Parametres du modele</h5></div>
      @foreach ($parametres as $key => $value)
        @if ($value->type == "modele")
          <div class="model-contenu">
            <label for="{{$key}}">{{ucfirst($value->nom)}}</label>
            <input class="zone_saisie" type="number" name="{{$key}}" value="{{$value->valeur}}">
          </div>
        @endif
    @endforeach
    </div>
    <div id="boutons" class="boutons-param">
      <input type="checkbox" name="action" value="demo" style="display:none">
      <input type="submit" name="submit" value="Juste une démo" class="btn btn-warning rounded-0 btn-lg" style="display:none">
      <div id="demo" class="btn btn-lg btn-warning rounded-0 demo">
        <img id="demo-img" src="public/svg/demo.svg" alt="démo" title="cliquez ici pour une démonstration">
        <p>Juste une démo</p>
      </div>
      <div id="sommaire" class="btn btn-lg btn-success rounded-0 sommaire espace">Sommaire</div>
    </div>
  </div>
</div>
{!! Form::close() !!}
</div>
