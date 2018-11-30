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
    if(strongle.etat == PONTE)
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


function elimination_morts(troupeau)
{
  var nouvelle_situation = [];
  troupeau.infestation.forEach(function(strongle){
    if(strongle.etat !== MORT)
    {
      nouvelle_situation.push(strongle);
    }
  });
  troupeau.infestation = nouvelle_situation;
  $('#infestation').html(troupeau.infestation.length);
  $('#troupeau').attr('infestation',troupeau.infestation.length);
}

function troupeau_dehors()
{
  $.alert({
    escapeKey: 'Ok',
      buttons: {
          Ok: function(){
          }
      },
    theme: 'dark',
    title: 'Attention !',
    content: 'Le troupeau est sorti du pré !</br> Mais que fait le chien ?',
    type: 'red',
});
}

function troupeau_evolution_aspect(troupeau) {
  var couleur_troupeau_infestation = troupeau.infestation.length* (-5);
  couleur_troupeau_infestation = (troupeau.infestation.length < 25) ? troupeau.infestation.length* (-5) : -90;
  $("#troupeau").css('filter', 'hue-rotate('+couleur_troupeau_infestation+'deg)')

}
