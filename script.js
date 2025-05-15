datum = new Date(); // vytvoří proměnnou obsahující aktuální datum
mesic = datum.getMonth() + 1;//leden je 0
denVMesici = datum.getDate();
document.getElementById("datum").innerHTML = "Dnes je " + denVMesici + ". " + mesic + "."
