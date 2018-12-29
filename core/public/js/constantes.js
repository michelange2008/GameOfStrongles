// modélisation sensibilité hôte
// Constantes reprises depuis le fichier param.json mis en cookie àl'ouverture de la page
var url = document.documentURI+"core/resources/json/";
$.getJSON(url+"troupeau.json", function(resultat){
  $.cookie('troupeau', JSON.stringify(resultat));
});
$.getJSON(url+"dates.json", function(resultat){
  $.cookie('dates', JSON.stringify(resultat));
});
$.getJSON(url+"foncier.json", function(resultat){
  $.cookie('foncier', JSON.stringify(resultat));
});

$.getJSON(url+"parametres.json", function(resultat){
  $.cookie('parametres', JSON.stringify(resultat));
});

var troupeauJSON = JSON.parse($.cookie("troupeau"));
console.log(troupeauJSON);
var datesJSON = JSON.parse($.cookie("dates"));
var foncier = JSON.parse($.cookie("foncier"));

var param = JSON.parse($.cookie("parametres"));

$.each(JSON.parse($.cookie("parametres")), function(key, val){
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
