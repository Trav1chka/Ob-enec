datum = new Date(); // vytvoří proměnnou obsahující aktuální datum
mesic = datum.getMonth() + 1; //leden je 0
denVMesici = datum.getDate();
document.getElementById("datum").innerHTML = "Dnes je " + denVMesici + ". " + mesic + ".";
function play() {
  slova = ["net", "idi", "nahui"]; // seznam slov, ktere bude uzivatel odhadovat
  slovo = slova[Math.floor(Math.random() * length(slova) - 1) + 1]; // vyber nahodneho slova
  pocetPismen = length(slovo);
  for (let i = 0; i < pocetPismen; i++) {
    const pismeno = document.createElement("p"); // vytvareni odstavce pro pismeno
    pismeno.id = "pismeno" + String(i + 1);
    pismeno.innerHTML = slovo[i];
    pismeno.style.fontStyle = "white"; // zmena barvy pisma abych ho nebylo videt
    const line = document.createElement("img"); // vytvareni obrazku
    line.id = "line" + String(i + 1);
    line.src = "./graphics/temp/temp-guess_200x200.png";
    line.alt = "line" + String(i + 1);
  }
}
