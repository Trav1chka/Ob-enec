datum = new Date(); // vytvoří proměnnou obsahující aktuální datum
mesic = datum.getMonth() + 1; //leden je 0
denVMesici = datum.getDate();
document.getElementById("datum").innerHTML = "Dnes je " + denVMesici + ". " + mesic + ".";
function play() {
  slova = ["net", "idi", "nahui"];
  slovo = slova[Math.floor(Math.random() * length(slova) - 1) + 1];
  pocetPismen = length(slovo);
  for (let i = 0; i < pocetPismen; i++) {
    const pismeno = document.createElement("p");
    pismeno.id = "pismeno" + String(i + 1);
    pismeno.innerHTML = slovo[i];
    pismeno.style.fontStyle = "white";
    const line = document.createElement("img");
    line.id = "line" + String(i + 1);
    line.src = "./graphics/temp/temp-guess_200x200.png";
    line.alt = "line" + String(i + 1);
  }
}
