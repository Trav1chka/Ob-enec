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
  body.classList.toggle('dark-mode');
  dark_mode = !dark_mode;
  if (modeImg) {
    if (dark_mode) {
      modeImg.src = './graphics/icons/darkmode-switch.png';
      modeImg.alt = 'Přepnutí na světlý režim';
    } else {
      modeImg.src = './graphics/icons/lightmode-switch.png';
      modeImg.alt = 'Přepnutí na tmavý režim';
    }
  }
  localStorage.setItem('dark_mode', dark_mode);
  lettersColor();
}

function lettersColor() {
  for (let i = 0; i < slovo.length; i++) {
    const pismeno = document.getElementById("pismeno" + String(i + 1));
    if (pismeno.style.color == "rgb(230, 230, 230)") {
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
    modeImg.src = './graphics/icons/darkmode-switch.png';
    modeImg.alt = 'Přepnutí na světlý režim';
  } else {
    modeImg.src = './graphics/icons/lightmode-switch.png';
    modeImg.alt = 'Přepnutí na tmavý režim';
  }
}


//! game.html //

//* Script pro Generaci slov
let slova = ["net", "idi", "nahui"]; // seznam slov, ktere bude uzivatel odhadovat
let slovo;
let pocetPismen;
let pocetOdhadnuti = 0;

function play() {
  // Only redirect to game.html
  localStorage.setItem("game", true)
  window.location.href = "game.html";
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
    line.src = "./graphics/temp/temp-guess_200x200.png";
    line.alt = "line" + String(i + 1);
    div.appendChild(pismeno);
    div.appendChild(line);
    divSlovo.appendChild(div); // pridani pismena a line do divu se vsema pismeny
  }
}

function letter(letter) {
  if (letter in slovo) {
    for (let i = 0; i < slovo.length; i++) {
      if (slovo[i] == letter) {
        const pismeno = document.getElementById("pismeno" + String(i + 1));
        if (!dark_mode) {
          pismeno.style.color = "rgb(230, 230, 230)"
        } else {
          pismeno.style.color = "rgb(40, 40, 40)"
        }
        pocetOdhadnuti++;
      }
    }
    if (pocetOdhadnuti == slovo.length) {
      window.alert("Vyhral jsi!");
      initGame();
    }
  }
}

letters = ["a", "á", "b", "c", "č", "d", "ď", "e", "é", "ě", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "ň", "o", "p", "q", "r", "ř", "s", "š", "t", "ť", "u", "ú", "ů", "v", "w", "x", "y", "ý", "z", "ž"];
document.addEventListener('keydown', function(event) {
  if (event.key.toLowerCase() in letters) {
    letter(event.key.toLowerCase());
  }
});

if (localStorage.getItem("game") == "true") {
  initGame();
}
