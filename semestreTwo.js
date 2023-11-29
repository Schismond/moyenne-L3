/***************************************************** VARIABLES ******************************************************/

let examSondages = document.getElementById("examSondages");
let tdSondages = document.getElementById("tdSondages");
let tpSondages = document.getElementById("tpSondages");

let examPython = document.getElementById("examPython");
let tdPython = document.getElementById("tdPython");

let examDataM = document.getElementById("examDataM");
let tdDataM = document.getElementById("tdDataM");

let examEconomie = document.getElementById("examEconomie");
let tdEconomie = document.getElementById("tdEconomie");

let noteMemoire = document.getElementById("noteMemoire");

let calculate = document.getElementById("sub");
let semesterTwoBtn = document.getElementById("semesterTwo");

let moyenneSemesterTwo = document.getElementById("moyenneSemestreTwo");
let creditSemesterTwo = document.getElementById("creditSemestreTwo");

/***************************************************** CLASSES ******************************************************/

class Module {
  constructor(noteExamen, noteTd, noteTp, coefficient, credits) {
    this.noteExamen = parseFloat(noteExamen);
    this.noteTd = parseFloat(noteTd);
    this.noteTp = parseFloat(noteTp);
    this.coefficient = parseFloat(coefficient);
    this.credits = parseFloat(credits);
  }

  calculMoyenne() {
    let moyenne = (this.noteTd + this.noteTp) / 4 + this.noteExamen / 2;

    moyenne = moyenne.toFixed(2);
    return moyenne;
  }

  calculMoyenneFinale() {
    let a = this.calculMoyenne();
    return a * this.coefficient;
  }

  modulePassed() {
    let b = this.calculMoyenne();
    let moduleAchieved = false;
    if (b >= 10) {
      moduleAchieved = true;
    } else {
      moduleAchieved = false;
    }
    return moduleAchieved;
  }
}

class ModuleSecondaire extends Module {
  constructor(noteExamen, noteTd, coefficient, credits) {
    super(noteExamen, noteTd, null, coefficient, credits);
  }

  calculMoyenne() {
    return ((2 * this.noteExamen) / 3 + this.noteTd / 3).toFixed(2);
  }
}

class Stage extends Module {
  constructor(noteExamen, coefficient, credits) {
    super(noteExamen, null, null, coefficient, credits);
  }

  calculMoyenne() {
    return parseFloat(this.noteExamen);
  }
}

/***************************************************** VARIABLES ******************************************************/

let notes = [
  examSondages,
  tdSondages,
  tpSondages,
  examPython,
  tdPython,
  examDataM,
  tdDataM,
  examEconomie,
  tdEconomie,
  noteMemoire,
];

calculate.addEventListener("click", function () {
  function verifierChamps() {
    let champsVide = false;
    let fausseNote = false;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].value == "") {
        champsVide = true;
        break;
      }
      if (notes[i].value > 20 || notes[i].value < 0) {
        fausseNote = true;
        break;
      }
    }

    if (champsVide == true) {
      alert("Veuillez remplir tout les champs");
    }
    if (fausseNote == true) {
      alert("Veuillez donner des notes correctes");
    }
  }
  verifierChamps();

  /***************************************************** Modules ******************************************************/

  let Sondages = new Module(
    examSondages.value,
    tdSondages.value,
    tpSondages.value,
    3,
    7
  );

  let python = new ModuleSecondaire(examPython.value, tdPython.value, 3, 7);
  let DataM = new ModuleSecondaire(examDataM.value, tdDataM.value, 2, 4);
  let Economie = new ModuleSecondaire(
    examEconomie.value,
    tdEconomie.value,
    2,
    3
  );

  let Memoire = new Stage(noteMemoire.value, 5, 9);

  /***************************************************** VARIABLES ******************************************************/

  let moyenneSondages = document.getElementById("moyenneSondages");
  let moyennePython = document.getElementById("moyennePython");
  let moyenneDataM = document.getElementById("moyenneDataM");
  let moyenneEconomie = document.getElementById("moyenneEconomie");
  let moyenneMemoire = document.getElementById("moyenneMemoire");

  let uniteFondamentaleTwo = document.getElementById("ufTwo");
  let uniteMethodologique = document.getElementById("umTwo");
  let uniteDecouverte = document.getElementById("udTwo");

  let modulesUF = [Sondages, python, DataM];
  let modulesUM = [Economie];

  /***************************************************** INPUTS ******************************************************/

  moyenneSondages.placeholder = Sondages.calculMoyenne();
  moyennePython.placeholder = python.calculMoyenne();
  moyenneDataM.placeholder = DataM.calculMoyenne();
  moyenneEconomie.placeholder = Economie.calculMoyenne();
  moyenneMemoire.placeholder = Memoire.calculMoyenne();

  /***************************************************** FUNCTIONS AND OUTPUTS ******************************************************/

  let modules = [Sondages, python, DataM, Economie, Memoire];
  function creditCalculator(modules) {
    let credits = 0;
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].modulePassed() === true) {
        credits = credits + modules[i].credits;
      }
    }
    return credits;
  }

  function calculerMoyenne(modules) {
    let m = 0;
    let coef = 0;
    for (let i = 0; i < modules.length; i++) {
      m = m + modules[i].calculMoyenneFinale();
      coef = coef + modules[i].coefficient;
    }
    return (m / coef).toFixed(2);
  }

  const displayUnitResult = (element, modules, moduleName, isValidated) => {
    const moyenne = calculerMoyenne(modules);
    const status = isValidated || moyenne >= 10 ? "(validée)" : "(non validée)";
    element.innerText = `Unité ${moduleName} : ${creditCalculator(
      modules
    )} ${status}`;
  };

  const moyenneGenerale = calculerMoyenne(modules);

  displayUnitResult(
    uniteFondamentaleTwo,
    modulesUF,
    "Fondamentale",
    moyenneGenerale >= 10
  );
  displayUnitResult(
    uniteMethodologique,
    modulesUM,
    "Méthodologique",
    moyenneGenerale >= 10
  );
  displayUnitResult(
    uniteDecouverte,
    [Memoire],
    "Découvertes",
    moyenneGenerale >= 10
  );

  moyenneSemesterTwo.innerText = `Moyenne Générale : ${moyenneGenerale}`;
  if (moyenneGenerale >= 10) {
    creditSemesterTwo.innerText = "Total crédits : 30";
  } else {
    creditSemesterTwo.innerText = `Total crédits : ${creditCalculator(
      modules
    )}`;
  }
});
