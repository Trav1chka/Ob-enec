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
let slova = [
  "server", "router", "firewall", "protokol", "virtualizace", "kompilátor", "algoritmus", "kódování", "paměť", "procesor",
  "grafika", "mikroprocesor", "zdroj", "chladič", "konektor", "mikrofon", "webkamera", "reproduktor", "port", "disk",
  "kočka", "pes", "vlk", "ještěrka", "sova", "mravenec", "žába", "liška", "zajíc", "včela", "anglickoněmecký",
  "košile", "kalhoty", "bunda", "plášť", "mikina", "tričko", "rukavice", "klobouk", "pásek", "ponožky",
  "auto", "motocykl", "elektrokolo", "skútr", "tramvaj", "helikoptéra", "dodávka", "kabriolet", "taxi", "karavan",
  "jablko", "hruška", "granátové", "mandarinka", "kiwi", "datle", "borůvka", "malina", "pomeranč", "broskev",
  "mrkev", "kapusta", "celer", "batát", "křen", "ředkvička", "cuketa", "fazole", "hrášek", "dýně", "šášaboty",
  "rododendron", "elektrostatika", "nejneobhospodařovávatelnější", "scvrnkls", "mateřídoušky", "vošouch",
  "bagančata", "nevim", "dvanáctiválec", "bububu", "mikroprocesorový", "multitasking", "kryptografie", "rachotina",
  "virtualizovaný", "synchronizace", "asynchronní", "binární", "dekódování", "enkapsulace", "hashování", "infrastruktura",
  "konfigurace", "modulární", "optimalizace", "paralelní", "rekurzivní", "segmentace", "tokenizace", "virtualizace",
  "webový", "zabezpečení", "algoritmický", "automatizace", "datový", "elektronický", "filtrace", "generování", "hardwarový",
  "implementace", "jednotkový", "kompatibilita", "logický", "monitorování", "navigace", "operační", "programový", "bídák",
  "qubitový", "redukce", "sériový", "transakce", "uživatelský", "verifikace", "webová", "zálohování", "ahoj", "rákosníček"
  ]; // seznam slov
let slovo;
let pocetPismen;
let pocetOdhadnuti = 0;
let pocetChybnychOdhadnuti = 0;
let odhadovanePismena = [];
var timer;
let time = 0;
let highScore;

function play() {
  localStorage.setItem("game", true) // pro zacatek hry bez tlacitka
  try {
    localStorage.setItem("pocetOtevreni", Number(localStorage.getItem("pocetOtevreni")) + 1);
  } catch(error) {
    localStorage.setItem("pocetOtevreni", 1);
  }
  window.location.href = "game.html"; // prepnuti na game.html
}

function initGame() {
  slovo = slova[Math.floor(Math.random() * slova.length)]; // vyber nahodneho slova
  pocetPismen = slovo.length;
  const divSlovo = document.getElementById("slovo");
  divSlovo.innerHTML = "";
  for (let i = 0; i < pocetPismen; i++) {
    const div = document.createElement("div"); // vytvareni divu pro pismeno a line
    div.className = "letters";
    div.id = "letterDiv" + String(i + 1);
    const pismeno = document.createElement("p"); // vytvareni odstavce pro pismeno
    pismeno.id = "pismeno" + String(i + 1);
    pismeno.innerHTML = slovo[i];
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
    score = 1000;
    time = 0;
    pocetChybnychOdhadnuti = 0;
    clearInterval(timer);
    highScore = localStorage.getItem("bestScore");
    document.getElementById("High_Score").innerHTML = "Nejvyšší skóre: " + Math.floor(highScore);
    timer = setInterval(calcScore, 30); // volání funkce každých 30 milisekund 
  }
}

function calcScore() { // funkce pro počítání času a skóre 
  score = score - 1;
  time += 0.031;
  document.getElementById("time").innerHTML = "Čas: " + Math.floor(time) + "s"; // obnovení časovačů 
  document.getElementById("score").innerHTML = "Skóre: " + Math.floor(score); // obnovení skóre 
  if (score == 0) { // po 30 sekundách skóre bude 0
    pocetChybnychOdhadnuti = 0;
    pocetOdhadnuti = 0;
    odhadovanePismena = [];
    time = 0;
    window.alert("Ｐｒｏｈｒａｌ   ｓｉ！\n\nSlovo co jsi hádal: " + slovo);
    try { // zkoušení pro první uložení 
      localStorage.getItem("bestScore");
    } catch {
      localStorage.setItem("bestScore", 0);
    }
    clearInterval(timer);
    initGame(); // reset hry
  }
}

function letter(letter) { // funkce pro odhad pismena
  letter = letter.toLowerCase(); // prevedeni na mala pismena
  if (slovo.includes(letter)) { // pokud pismeno je v slove
    if (odhadovanePismena.includes(letter)) {
      return;
    }
    for (let i = 0; i < slovo.length; i++) { // prochazeni slova
      if (slovo[i] == letter) {
        const pismeno = document.getElementById("pismeno" + String(i + 1));
        if (!dark_mode) { // zmena barvy pisma podle rezimu abych ho nebylo videt
          pismeno.style.color = "rgb(40, 40, 40)";
        } else {
          pismeno.style.color = "rgb(230, 230, 230)";
        }
        pocetOdhadnuti++; // zvyseni pocet odhadnuti
        odhadovanePismena.push(letter); // přidání písmena do seznamu odhadnutých písmen 
        if (pocetOdhadnuti == pocetPismen) {
          setTimeout(() => {
            pocetChybnychOdhadnuti = 0;
            pocetOdhadnuti = 0;
            odhadovanePismena = [];
            time = 0;
            window.alert("Ｖｙｈｒａｌ   ｓｉ！");
            try { // zkoušení pro první uložení 
              if (Number(localStorage.getItem("bestScore")) < score) {
                localStorage.setItem("bestScore", score);
              }
            } catch(error) {
              localStorage.setItem("bestScore", score);
            }
            clearInterval(timer);
            initGame(); // reset hry
          }, 100); // timeout 100 milisekund abych barva textu stihla se zmenit
        }
      }
    }
  } else {
    pocetChybnychOdhadnuti++; // zvyseni pocet chybnych odhadnuti
    const image = document.getElementById("obesenec");
    image.src = "./graphics/obesenec/stage" + String(pocetChybnychOdhadnuti) + ".png"; // zmena obrazku
    if (pocetChybnychOdhadnuti == 8) {
      setTimeout(() => {
        pocetChybnychOdhadnuti = 0;
        pocetOdhadnuti = 0;
        odhadovanePismena = [];
        time = 0;
        window.alert("Ｐｒｏｈｒａｌ   ｓｉ！\n\nSlovo co jsi hádal: " + slovo);
        try {
          localStorage.getItem("bestScore");
        } catch {
          localStorage.setItem("bestScore", 0);
        }
        clearInterval(timer);
        initGame(); // reset hry
      }, 100);
    }
  }
}
letters = ["a", "á", "b", "c", "č", "d", "ď", "e", "é", "ě", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "ň", "o", "ó", "p", "q", "r", "ř", "s", "š", "t", "ť", "u", "ú", "ů", "v", "w", "x", "y", "ý", "z", "ž"];
document.addEventListener('keydown', function(event) { // nacteni klaves z klavesnice
  if (letters.includes(event.key.toLowerCase())) {
    letter(event.key.toLowerCase()); // odhad pismena
  }
});

function tutorial(show) { // funkce pro zobrazení tutoriálů 
  const tutorial = document.getElementById("tutorial");
  if (show) {
    tutorial.style.display = "block";
  } else {
    tutorial.style.display = "none";
    initGame(); // když zavíráme tutoriál, začínáme nebo restartujeme hru
  }
}

if (localStorage.getItem("game") == "true") {
  if (Number(localStorage.getItem("pocetOtevreni")) > 1) { // když uživatel poprve otevři stránku, zobrazí mu tutoriál 
    initGame();
  } else {
    tutorial(true);
  }
}
