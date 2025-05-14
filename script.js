promenna = new Date(); // vytvoří proměnnou obsahující aktuální datum
mesic = promenna.getMonth() + 1;//leden je 0
denVMesici = promenna.getDate();
document.getElementById("datum").innerHTML = "Dnes je " + denVMesici + ". " + mesic + "."
