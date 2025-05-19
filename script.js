//! index.html //

//* Script pro datum
datum = new Date(); // vytvoří proměnnou obsahující aktuální datum
mesic = datum.getMonth() + 1; //leden je 0
denVMesici = datum.getDate();
document.getElementById("datum").innerHTML = "Dnes je " + denVMesici + ". " + mesic + ".";

//* Script pro měnění režimů
let dark_mode;
function mode() {
  const modeImg = document.querySelector('#mode img');
  if (dark_mode == true) {
      modeImg.src = './graphics/icons/darkmode-switch.png';
      modeImg.alt = 'Přepnutí na světlý režim';
      dark_mode = false
  } else {
      modeImg.src = './graphics/icons/lightmode-switch.png';
      modeImg.alt = 'Přepnutí na tmavý režim';
      dark_mode = true
  }
}



//! game.html //

//* Script pro Generaci slov
let slova;
let slovo;
let pocetPismen;
function play() {
  slova = ["net", "idi", "nahui"]; // seznam slov, ktere bude uzivatel odhadovat
  slovo = slova[Math.floor(Math.random() * length(slova) - 1) + 1]; // vyber nahodneho slova
  pocetPismen = length(slovo);
  for (let i = 0; i < pocetPismen; i++) {
    const divSlovo = document.getElementById("pismena");
    const div = document.createElement("div"); // vytvareni divu pro pismeno a line
    const pismeno = document.createElement("p"); // vytvareni odstavce pro pismeno
    pismeno.id = "pismeno" + String(i + 1);
    pismeno.innerHTML = slovo[i];
    pismeno.style.fontStyle = "white"; // zmena barvy pisma abych ho nebylo videt
    const line = document.createElement("img"); // vytvareni obrazku
    line.id = "line" + String(i + 1);
    line.src = "./graphics/temp/temp-guess_200x200.png";
    line.alt = "line" + String(i + 1);
    div.appendChild(pismeno); 
    div.appendChild(line);
    divSlovo.appendChild(div); // pridani pismena a line do divu se vsema pismeny
  }
}
