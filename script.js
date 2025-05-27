//! index.html //

//* Script pro datum
datum = new Date(); // vytvoří proměnnou obsahující aktuální datum
mesic = datum.getMonth() + 1; //leden je 0
denVMesici = datum.getDate();
document.getElementById("datum").innerHTML = "Dnes je " + denVMesici + ". " + mesic + ".";

//* Script pro měnění režimů
let dark_mode = localStorage.getItem('dark_mode') === 'true';
function mode() {
  const body = document.body;
  const modeImg = document.querySelector('#mode img');
  body.classList.toggle('dark-mode'); // přepnutí režimu
  dark_mode = !dark_mode;
  if (modeImg) {
    if (dark_mode) {
      modeImg.src = './graphics/icons/darkmode-switch.png'; // zmena ikony tlacitka pro prepnuti rezimu
      modeImg.alt = 'Přepnutí na světlý režim';
    } else {
      modeImg.src = './graphics/icons/lightmode-switch.png'; // zmena ikony tlacitka pro prepnuti rezimu
      modeImg.alt = 'Přepnutí na tmavý režim';
    }
  }
  localStorage.setItem('dark_mode', dark_mode); // ulozeni stavu rezimu
  lettersColor(); // zmena barvy pismen slova, ktere hadame
}

function lettersColor() { // funkce pro zmena barvy pismen
  for (let i = 0; i < slovo.length; i++) { // prochazeni slova
    const pismeno = document.getElementById("pismeno" + String(i + 1));
    if (pismeno.style.color == "rgb(230, 230, 230)") { // zmena barvy na opacnou pro prepnuti rezimu
      pismeno.style.color = "rgb(40, 40, 40)";
    } else {
      pismeno.style.color = "rgb(230, 230, 230)";
    }
  }
}

//* Script pro zobrazení aktuálního režimu
const body = document.body;
const modeImg = document.querySelector('#mode img');
if (dark_mode) {
  body.classList.add('dark-mode');
}
if (modeImg) {
  if (dark_mode) {
    modeImg.src = './graphics/icons/darkmode-switch.png'; // zmena ikony tlacitka pro prepnuti rezimu
    modeImg.alt = 'Přepnutí na světlý režim';
  } else {
    modeImg.src = './graphics/icons/lightmode-switch.png'; // zmena ikony tlacitka pro prepnuti rezimu
    modeImg.alt = 'Přepnutí na tmavý režim';
  }
}


//! game.html //

//* Script pro Generaci slov
let slova = ["net", "idi", "nahui", "ja", "sosu", "bibu", "da", "mne", "pojui"]; // seznam slov, ktere bude uzivatel odhadovat
let slovo;
let pocetPismen;
let pocetOdhadnuti = 0;
let pocetHybnychOdhadnuti = 0;
let odhadovanePismena = [];

function play() {
  localStorage.setItem("game", true) // pro zacatek hry bez tlacitka
  window.location.href = "game.html"; // prepnuti na game.html
}

function initGame() {
  slovo = slova[Math.floor(Math.random() * slova.length)]; // vyber nahodneho slova
  pocetPismen = slovo.length;
  const divSlovo = document.getElementById("slovo");
  divSlovo.innerHTML = null; // clear previous content if any
  for (let i = 0; i < pocetPismen; i++) {
    const div = document.createElement("div"); // vytvareni divu pro pismeno a line
    div.className = "letters";
    div.id = "letterDiv" + String(i + 1);
    const pismeno = document.createElement("p"); // vytvareni odstavce pro pismeno
    pismeno.id = "pismeno" + String(i + 1);
    pismeno.innerHTML = slovo[i];
    pismeno.style.fontSize = "100px";
    if (!dark_mode) {
      pismeno.style.color = "rgb(230, 230, 230)"; // zmena barvy pisma abych ho nebylo videt
    } else {
      pismeno.style.color = "rgb(40, 40, 40)";
    }
    const line = document.createElement("img"); // vytvareni obrazku
    line.id = "line" + String(i + 1);
    line.src = "./graphics/pismena/_guess_200x40.png";
    line.alt = "line" + String(i + 1);
    const obesenec = document.getElementById("obesenec");
    obesenec.src = "./graphics/obesenec/stage0.png";
    div.appendChild(pismeno);
    div.appendChild(line);
    divSlovo.appendChild(div); // pridani pismena a line do divu se vsema pismeny
  }
}

function letter(letter) { // funkce pro odhad pismena
  letter = letter.toLowerCase(); // prevedeni na mala pismena
  if (slovo.includes(letter)) { // pokud pismeno je v slove
    if (odhadovanePismena.includes(letter)) {
      return
    }
    for (let i = 0; i < slovo.length; i++) { // prochazeni slova
      if (slovo[i] == letter) {
        const pismeno = document.getElementById("pismeno" + String(i + 1));
        if (!dark_mode) { // zmena barvy pisma podle rezimu abych ho nebylo videt
          pismeno.style.color = "rgb(40, 40, 40)"
        } else {
          pismeno.style.color = "rgb(230, 230, 230)"
        }
        pocetOdhadnuti++; // zvyseni pocet odhadnuti
        odhadovanePismena.push(letter);
        if (pocetOdhadnuti == pocetPismen) {
          setTimeout(() => {
            pocetHybnychOdhadnuti = 0;
            pocetOdhadnuti = 0;
            window.alert("Ｖｙｈｒａｌ   ｓｉ！");
            initGame(); // reset hry
          }, 100); // timeout 100 milisekund abych barva textu stihla se zmenit
        }
      }
    }
  } else {
    pocetHybnychOdhadnuti++; // zvyseni pocet hybnych odhadnuti
    const image = document.getElementById("obesenec");
    image.src = "./graphics/obesenec/stage" + String(pocetHybnychOdhadnuti) + ".png"; // zmena obrazku
    if (pocetHybnychOdhadnuti == 8) {
      setTimeout(() => {
        pocetHybnychOdhadnuti = 0;
        pocetOdhadnuti = 0;
        window.alert("Ｐｒｏｈｒａｌ   ｓｉ！");
        initGame(); // reset hry
      }, 100);
    }
  }
}

letters = ["a", "á", "b", "c", "č", "d", "ď", "e", "é", "ě", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "ň", "o", "ó", "p", "q", "r", "ř", "s", "š", "t", "ť", "u", "ú", "ů", "v", "w", "x", "y", "ý", "z", "ž"];
document.addEventListener('keydown', function(event) { // nacteni klaves z klavesnice
  if (letters.includes(event.key.toLowerCase())) {
    letter(event.key.toLowerCase()); // odhad pismena
  }
});

if (localStorage.getItem("game") == "true") {
  initGame(); // zacatek hry
}
