// modélisation sensibilité hôte
// modélisation parasites repris du HTML (définition dans php class Constantes)
$('.parametres').each(function(index, param) {
  // console.log($("#"+param.id).attr('data'));
  window[param.id] = $("#"+param.id).attr('data');
});
pas_de_temps = parseInt($("#pas_de_temps").html());
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
