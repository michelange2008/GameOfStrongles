function troupeau_infestant(nb_strongles_adultes){ // change l'aspect du troupeau quand il a des adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+'caprins.svg), url('+url_svg+'crottes.svg)');
  $('#troupeau').attr('contaminant', nb_strongles_adultes);
}
function troupeau_non_infestant(){// change l'aspect du troupeau quand il n'a plus d'adultes qui pondent
  $('#troupeau').css('background-image', 'url('+url_svg+'caprins.svg)');
  troupeau.contaminant = false;
  $('#troupeau').attr('contaminant', 0);
}
function troupeau_evolution_excretion(){ // change l'aspect du troupeau en fonction de sa situation et le compteur
  var nb_strongles_adultes = 0;
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat == ponte)
    {
      nb_strongles_adultes++;
    }
  });
  if(nb_strongles_adultes > 0){
    troupeau_infestant(nb_strongles_adultes);
  }
  else {
    troupeau_non_infestant();
  }
  $('#troupeau_contaminant').html(nb_strongles_adultes);
}
function pature_infeste_troupeau(parcelle, troupeau_infeste)
{
  var nb_parasite = 0;
  $("#"+parcelle).children().each(function(index, valeur)
  {
    if(valeur.id == "parasite"){ // cible l'élément enfant contenant l'id parasite (pour ne pas prendre le texte et autre p ou div)
      nb_parasite++;
    }
  });
  troupeau_infeste.sinfeste(nb_parasite);
}

function elimination_morts()
{
  var nouvelle_situation = [];
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat !== mort)
    {
      nouvelle_situation.push(strongle);
    }
  });
  troupeau.infestation = nouvelle_situation;
  $('#infestation').html(troupeau.infestation.length);
  $('#troupeau').attr('infestation',troupeau.infestation.length);
}
