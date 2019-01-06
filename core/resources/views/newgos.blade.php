<!-- Panneau principal -->
<div id="main" class="row">
  <!-- Panneau de gauche qui fait moniteur -->
  <div id="moniteur" class="infos col-sm-2">
    <div id="resultats" class="bandeau alert rounded-0">
      <h5 class="titre">Situation</h5>
    </div>
    <div class="cadran">
      <div class="titre">
        <h6 class="">date</h6>
      </div>
      <p id="date" style="text-align:center"></p>
      <p class="moyen">(pas de temps : <span id="pas_de_temps" title="modifier le pas de temps (jours)"></span> jours)</p>
    </div>
    <div class="cadran">
      <div class="titre">
          <h6>Troupeau</h6>
      </div>
      <div class="chiffres">
        <p class="soustitre" >Infestation: </p><p id="troupeau_infestation" class="valeur">0</p>
        <p class="soustitre">Excretion: </p><p id="troupeau_contaminant" class="valeur">0</p>
      </div>
    </div>
    <div class="cadran">
      <div class="titre">
        <h6>Parcelles</h6>
      </div>
      <div id="parcelles-chiffres" class="chiffres">
          <p class="soustitre"></p>
          <p id="" class="valeur" ></p>
    </div>
    </div>
  </div>
  <!-- Grand panneau de droite avec time-line, troupeau et paturages -->
  <div id="plateau" class="col-sm-10">
    <div id="temps" class="time-line">
      <div id="temps-mois" class="saison"></div>
      <div id="curseur" class="cursor">
      </div>
    </div>

    <div id="exploitation">
      <div id="chevrerie" class="etable">
        <div id="troupeau" class="flock">
          <img id ="troupeau-image" src="" alt="troupeau">
        </div>
      </div>
      <div id="foncier" class="parcellaire">
      </div>
    </div>
  </div>
</div>
</div>
