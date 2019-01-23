class Dates
{
  constructor() {
    var annee = new Date().getFullYear();
    this.mise_a_l_herbe = new Date(annee+"-03-18");
    this.entre_bergerie = new Date(annee+"-10-18");
    this.duree_paturage = Math.round((new Date(annee+"-10-18")-new Date(annee+"-03-18"))/(60*60*25*1000));
    this.date_courante = new Date(annee+"-03-18");
  }
}

Dates.prototype.avance = function (pas_de_temps) {
  this.date_courante.setDate(this.date_courante.getDate() + parseInt(pas_de_temps));
};


Date.prototype.getWeek = function() { //1 - 53
	var year = this.getFullYear();
	var week;

	//dernier lundi de l'année
	var lastMonday = new Date(year, 11, 31).getMonday();

	//la date est dans la dernière semaine de l'année
	//mais cette semaine fait partie de l'année suivante
	if(this >= lastMonday && lastMonday.getDate() > 28) {
		week = 1;
	}
	else {
		//premier lundi de l'année
		var firstMonday = new Date(year, 0, 1).getMonday();

		//correction si nécessaire (le lundi se situe l'année précédente)
		if(firstMonday.getFullYear() < year) firstMonday = new Date(year, 0, 8).getMonday();

		//nombre de jours écoulés depuis le premier lundi
		var days = this.getYearDay() - firstMonday.getYearDay();

		//si le nombre de jours est négatif on va chercher
		//la dernière semaine de l'année précédente (52 ou 53)
		if(days < 0) {
			week = new Date(year, this.getMonth(), this.getDate()+days).getWeek();
		}
		else {
			//numéro de la semaine
			week = 1 + parseInt(days / 7);

			//on ajoute une semaine si la première semaine
			//de l'année ne fait pas partie de l'année précédente
			week += (new Date(year-1, 11, 31).getMonday().getDate() > 28);
		}
	}

	return parseInt(week);
}

Date.prototype.getMonday = function() {
	var offset = (this.getDay() + 6) % 7;
	return new Date(this.getFullYear(), this.getMonth(), this.getDate()-offset);
}

Date.prototype.getYearDay = function() { //1 - 366
	var year  = this.getFullYear();
	var month = this.getMonth();
	var day   = this.getDate();

	var offset = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

	//l'année bissextile n'est utile qu'à partir de mars
	var bissextile = (month < 2) ? 0 : (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0));

    return parseInt(day + offset[month] + bissextile);
}
