function pature_infeste_troupeau(parcelle, troupeau_infeste)
{
  var nb_parasite = 0;
  $("#"+parcelle).children().each(function(index, valeur)
  {
    if(valeur.id == "parasite"){
      nb_parasite++;
    }
  });
  troupeau_infeste.sinfeste(nb_parasite);
}
