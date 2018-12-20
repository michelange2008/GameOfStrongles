// modélisation sensibilité hôte
// Constantes reprises depuis le fichier param.json mis en cookie àl'ouverture de la page
$.each(JSON.parse($.cookie("param")), function(key, groupe){
  $.each(groupe, function(key, val){ // en fonction du type de donnée, on convertit les valeurs numériques
    if(isNaN(val.valeur)){
      window[key] = val.valeur;
    }
    else if (Number.isInteger(val.valeur)) {
      window[key] = parseInt(val.valeur);
    }
    else {
      window[key] = parseFloat(val.valeur);
    }
  });
});

// variables d'affichage
parcelle_sans_troupeau = 'lightgreen';
var parcelle_avec_troupeau = "green";
//date avec affichage type 15 mars
var options_date = { month: 'long', day: 'numeric' };
// construit l'adresse des images
var url_svg = "";
var tab_url_bg = $('#troupeau').css('background-image').split("/");

tab_url_bg.pop();
tab_url_bg.shift();
tab_url_bg.forEach(function(e){
    url_svg += e+"/";
});
url_svg = "http:/"+url_svg;
