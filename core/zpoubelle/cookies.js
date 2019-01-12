//############################ CREER LES COOKIES ###############################
  $.getJSON(url+"troupeau.json", function(resultat){
    Cookies.set('troupeau', JSON.stringify(resultat));
  });
  $.getJSON(url+"dates.json", function(resultat){
    Cookies.set('dates', JSON.stringify(resultat));
  });
  $.getJSON(url+"foncier.json", function(resultat){
    Cookies.set('foncier', JSON.stringify(resultat));
  });
console.log(Cookies.get("troupeau"));
  var troupeauJSON = JSON.parse(Cookies.get("troupeau"));
  var datesJSON = JSON.parse(Cookies.get("dates"));
  var foncier = JSON.parse(Cookies.get("foncier"));
