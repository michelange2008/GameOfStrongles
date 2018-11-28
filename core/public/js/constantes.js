// modélisation sensibilité hôte

// modélisation parasites
const l3_infestante = 21;
const l3_morte = 60;
const preriode_prepatente = 10;
const infestation_maximum = 100;
const adulte_mort = 100;
// constantes pour les états des strongles
const non_infestant = 'non_infestant';
const infestant = 'infestant';
const mort = 'mort';
const prepatent = 'prepatent';
const ponte = 'ponte';
// considérations de style
const parcelle_sans_troupeau = 'lightgreen';
const parcelle_avec_troupeau = "green";
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
