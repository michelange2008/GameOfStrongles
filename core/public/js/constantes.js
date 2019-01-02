// modélisation sensibilité hôte
// Constantes reprises depuis le fichier param.json mis en cookie àl'ouverture de la page
var url = document.documentURI+"core/resources/json/";

$.getJSON(url+"parametres.json", function(resultat){
  Cookies.set('parametres', JSON.stringify(resultat));
});
var param = Cookies.getJSON("parametres");


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
