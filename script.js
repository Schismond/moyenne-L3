/***************************************************** VARIABLES ******************************************************/

let examSimulation = document.getElementById("examSimulation");
let tdSimulation = document.getElementById("tdSimulation");
let tpSimulation = document.getElementById("tpSimulation");

let examPython = document.getElementById("examPython");
let tdPython = document.getElementById("tdPython");

let examMesure = document.getElementById("examMesure");
let tdMesure = document.getElementById("tdMesure");

let examStatInf = document.getElementById("examStatInf");
let tdStatInf = document.getElementById("tdStatInf");

let examStatPrev = document.getElementById("examStatPrev");
let tdStatPrev = document.getElementById("tdStatPrev");

let noteStage = document.getElementById("noteStage");

let calculate = document.getElementById("sub");
let semesterTwoBtn = document.getElementById("semesterTwo");

let moyenneSemesterOne = document.getElementById("moyenneSemestreOne");
let creditSemesterOne = document.getElementById("creditSemestreOne");

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
  examSimulation,
  tdSimulation,
  tpSimulation,
  examPython,
  tdPython,
  examMesure,
  tdMesure,
  examStatInf,
  tdStatInf,
  examStatPrev,
  tdStatPrev,
  noteStage,
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

  let simulation = new Module(
    examSimulation.value,
    tdSimulation.value,
    tpSimulation.value,
    3,
    6
  );

  let python = new ModuleSecondaire(examPython.value, tdPython.value, 3, 6);
  let mesure = new ModuleSecondaire(examMesure.value, tdMesure.value, 3, 6);
  let statInf = new ModuleSecondaire(examStatInf.value, tdStatInf.value, 3, 5);
  let statPrev = new ModuleSecondaire(
    examStatPrev.value,
    tdStatPrev.value,
    2,
    4
  );
  let stage = new Stage(noteStage.value, 3, 3);

  /***************************************************** VARIABLES ******************************************************/

  let moyenneSimulation = document.getElementById("moyenneSimulation");
  let moyennePython = document.getElementById("moyennePython");
  let moyenneMesure = document.getElementById("moyenneMesure");
  let moyenneStatInf = document.getElementById("moyenneStatInf");
  let moyenneStatPrev = document.getElementById("moyenneStatPrev");
  let moyenneStage = document.getElementById("moyenneStage");

  let uniteFondamentaleOne = document.getElementById("ufOne");
  let uniteMethodologique = document.getElementById("umOne");
  let uniteDecouverte = document.getElementById("udOne");

  let modulesUF = [simulation, python, mesure];
  let modulesUM = [statInf, statPrev];

  /***************************************************** INPUTS ******************************************************/

  moyenneSimulation.placeholder = simulation.calculMoyenne();
  moyennePython.placeholder = python.calculMoyenne();
  moyenneMesure.placeholder = mesure.calculMoyenne();
  moyenneStatInf.placeholder = statInf.calculMoyenne();
  moyenneStatPrev.placeholder = statPrev.calculMoyenne();
  moyenneStage.placeholder = stage.calculMoyenne();

  /***************************************************** FUNCTIONS AND OUTPUTS ******************************************************/

  let modules = [simulation, python, mesure, statInf, statPrev, stage];
  function creditCalculator(modules) {
    let credits = 0;
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].modulePassed() === true) {
        credits = credits + modules[i].credits;
      }
    }
    return credits;
  }

  moyennes = [
    simulation.calculMoyenneFinale(),
    python.calculMoyenneFinale(),
    mesure.calculMoyenneFinale(),
    statInf.calculMoyenneFinale(),
    statPrev.calculMoyenneFinale(),
    stage.calculMoyenneFinale(),
  ];

  function calculerMoyenne(moyennes) {
    let m = 0;
    for (let i = 0; i < moyennes.length; i++) {
      m = m + moyennes[i];
    }
    return (m / 17).toFixed(2);
  }
  let moyenneGenerale = calculerMoyenne(moyennes);

  moyenneSemesterOne.innerText = `Moyenne Générale : ${moyenneGenerale}`;
  creditSemesterOne.innerText = `Total crédits : ${creditCalculator(modules)}`;
  uniteFondamentaleOne.innerText = `Unité Fondamentale :  ${creditCalculator(
    modulesUF
  )}`;
  uniteMethodologique.innerText = `Unité Méthodologique : ${creditCalculator(
    modulesUM
  )}`;
  uniteDecouverte.innerText = `Unité Découvertes : ${creditCalculator([
    stage,
  ])}`;
});
